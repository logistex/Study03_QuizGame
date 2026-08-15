// 생성: 2026-08-13 23:09 KST
'use strict';

const QUIZ_LENGTH = 10;
const ALL_COUNTS = [3, 3, 2, 2];
const DIFFICULTY_LABELS = { easy: '초급', medium: '중급', hard: '고급' };
const CATEGORY_LIMIT = 5;
const ALL_LIMIT = 10;
const STORAGE_KEY = 'quizGameRankings';
const ALL_KEY = 'all';

/**
 * 게임 상태. 3단계에서 quiz, index, score가 더해진다.
 * "이미 답했는가" 플래그는 두지 않는다. 재선택은 선택지 버튼의 disabled가 막는다.
 */
const state = {
  playerName: '',
  mode: null,
  categoryId: null,
  quiz: [],
  index: 0,
  score: 0
};

/**
 * 문제 데이터를 검사해 위반 내용을 문자열 배열로 돌려준다.
 * 위반이 없으면 빈 배열이다. 화면에는 일반 문구만 띄우고,
 * 어느 문제가 어떻게 틀렸는지는 이 배열을 콘솔에 출력해 알린다.
 */
function validateData() {
  const errors = [];

  if (typeof CATEGORIES === 'undefined' || !Array.isArray(CATEGORIES)) {
    errors.push('CATEGORIES가 배열로 정의되지 않았습니다');
  }
  if (typeof QUESTIONS === 'undefined' || QUESTIONS === null || typeof QUESTIONS !== 'object') {
    errors.push('QUESTIONS가 객체로 정의되지 않았습니다');
  }
  if (errors.length > 0) {
    return errors;
  }

  const seenIds = new Set();
  const seenQuestions = new Set();

  CATEGORIES.forEach(function (category) {
    const list = QUESTIONS[category.id];

    if (!Array.isArray(list)) {
      errors.push(category.id + ': QUESTIONS에 문제 배열이 없습니다');
      return;
    }
    if (list.length < QUIZ_LENGTH) {
      errors.push(category.id + ': 문제 수가 ' + list.length + ', ' + QUIZ_LENGTH + ' 이상이어야 합니다');
    }

    list.forEach(function (q, i) {
      const label = typeof q.id === 'string' && q.id !== '' ? q.id : category.id + '[' + i + ']';

      if (typeof q.id !== 'string' || q.id.trim() === '') {
        errors.push(label + ': id가 비어 있음');
      } else if (seenIds.has(q.id)) {
        errors.push(label + ': id 중복');
      } else {
        seenIds.add(q.id);
      }

      if (typeof q.question !== 'string' || q.question.trim() === '') {
        errors.push(label + ': question이 비어 있음');
      } else if (seenQuestions.has(q.question)) {
        errors.push(label + ': question 텍스트 중복');
      } else {
        seenQuestions.add(q.question);
      }

      if (typeof q.explanation !== 'string' || q.explanation.trim() === '') {
        errors.push(label + ': explanation이 비어 있음');
      }

      if (!Array.isArray(q.options)) {
        errors.push(label + ': options가 배열이 아님');
      } else if (q.options.length !== 4) {
        errors.push(label + ': options 길이가 ' + q.options.length);
      } else {
        q.options.forEach(function (option, index) {
          if (typeof option !== 'string' || option.trim() === '') {
            errors.push(label + ': options[' + index + ']가 비어 있음');
          }
        });
        // 값이 아니라 인덱스로 판정한다. find는 중복 값이 undefined일 때
        // undefined를 돌려주어 "못 찾음"과 구별되지 않는다.
        const duplicatedIndex = q.options.findIndex(function (option, index) {
          return q.options.indexOf(option) !== index;
        });
        if (duplicatedIndex !== -1) {
          errors.push(label + ": options에 중복된 선택지 '" + q.options[duplicatedIndex] + "'");
        }
      }

      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) {
        errors.push(label + ': answer가 0 이상 3 이하의 정수가 아님 (' + JSON.stringify(q.answer) + ')');
      }

      if (!Object.prototype.hasOwnProperty.call(DIFFICULTY_LABELS, q.difficulty)) {
        errors.push(label + ": difficulty가 '" + q.difficulty + "'");
      }
    });
  });

  return errors;
}

/** 데이터를 쓸 수 없음을 화면에 알린다. 이 뒤로 게임 시작 경로를 잇지 않는다. */
function showDataError() {
  document.getElementById('data-error').hidden = false;
}

/**
 * 네 화면 전체를 감추고 대상만 드러낸 뒤 그 화면의 제목으로 초점을 옮긴다.
 * visibility나 투명도를 쓰지 않는다. hidden이라야 감춘 화면이
 * 스크린리더와 탭 순서에서 빠진다(PRD 3.0절).
 *
 * moveFocus에 false를 넘기면 초점을 옮기지 않는다. 퀴즈 화면은 진입 직후
 * renderQuestion이 문제 텍스트로 초점을 잡으므로, 제목을 거치면 초점이
 * 두 번 움직여 스크린리더가 제목을 읽다 끊긴다(PRD 4.3절).
 */
function showScreen(screenId, moveFocus) {
  document.querySelectorAll('.screen').forEach(function (section) {
    section.hidden = section.id !== screenId;
  });
  if (moveFocus !== false) {
    document.querySelector('#' + screenId + ' .title').focus();
  }
}

/** CATEGORIES를 돌며 카드 버튼을 그린다. 문제 수는 QUIZ_LENGTH에서 조립한다. */
function renderCategoryCards() {
  const container = document.getElementById('category-cards');
  container.textContent = '';

  CATEGORIES.forEach(function (category) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card';

    const name = document.createElement('span');
    name.className = 'card-name';
    name.textContent = category.name;

    const count = document.createElement('span');
    count.className = 'card-count';
    count.textContent = QUIZ_LENGTH + '문제';

    card.appendChild(name);
    card.appendChild(count);
    card.addEventListener('click', function () {
      startGame('category', category.id);
    });
    container.appendChild(card);
  });
}

/**
 * 입력란의 이름을 앞뒤 공백을 잘라 돌려준다.
 * 비었거나 12자를 넘으면 안내를 띄우고 null을 돌려준다.
 * 조용히 잘라 내지 않는다. 절단하면 순위표에 본인이 입력한 적 없는 이름이 남는다.
 */
function readPlayerName() {
  const name = document.getElementById('player-name').value.trim();
  const error = document.getElementById('name-error');

  if (name === '') {
    error.textContent = '이름을 입력해 주세요.';
    return null;
  }
  if (name.length > 12) {
    error.textContent = '이름은 12자까지 입력할 수 있습니다.';
    return null;
  }

  error.textContent = '';
  return name;
}

/** 이름 안내 문구를 지운다. 입력란의 input 이벤트에 건다. */
function clearNameError() {
  document.getElementById('name-error').textContent = '';
}

/** Fisher-Yates로 섞은 새 배열을 돌려준다. 원본은 건드리지 않는다. */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 선택지를 섞고 정답 텍스트의 새 자리로 answer를 갱신한 새 객체를 만든다.
 * 갱신을 빠뜨려도 화면은 정상으로 보이고 채점만 조용히 틀린다.
 * 원본을 제자리에서 섞으면 다음 판의 데이터까지 오염되므로 새 배열을 만든다.
 */
function prepareQuestion(q, category) {
  const answerText = q.options[q.answer];
  const options = shuffle(q.options);

  return {
    id: q.id,
    question: q.question,
    options: options,
    answer: options.indexOf(answerText),
    difficulty: q.difficulty,
    explanation: q.explanation,
    categoryName: category.name
  };
}

/** 고른 카테고리에서 QUIZ_LENGTH문제를 뽑는다. */
function pickCategoryQuiz(categoryId) {
  const category = CATEGORIES.find(function (c) {
    return c.id === categoryId;
  });

  return shuffle(QUESTIONS[categoryId])
    .slice(0, QUIZ_LENGTH)
    .map(function (q) {
      return prepareQuestion(q, category);
    });
}

/**
 * 카테고리 순서를 섞어 3, 3, 2, 2문제를 뽑고 합친 결과를 다시 섞는다.
 * 마지막 셔플을 빠뜨리면 카테고리 순서대로 출제된다. 뽑기와 최종 순서 섞기는 별개다.
 */
function pickAllQuiz() {
  const picked = [];

  shuffle(CATEGORIES).forEach(function (category, i) {
    shuffle(QUESTIONS[category.id])
      .slice(0, ALL_COUNTS[i])
      .forEach(function (q) {
        picked.push(prepareQuestion(q, category));
      });
  });

  return shuffle(picked);
}

/** 이름 검증을 통과하면 판을 시작한다. */
function startGame(mode, categoryId) {
  const name = readPlayerName();
  if (name === null) {
    return;
  }

  state.playerName = name;
  state.mode = mode;
  state.categoryId = categoryId;
  state.quiz = mode === 'all' ? pickAllQuiz() : pickCategoryQuiz(categoryId);
  state.index = 0;
  state.score = 0;

  // 초점은 renderQuestion이 문제 텍스트로 잡는다. 제목을 거치지 않는다(PRD 4.3절).
  showScreen('screen-quiz', false);
  renderQuestion();
  enableUnloadGuard();
}

/** 현재 문제를 그린다. 피드백과 "다음 문제"는 감추고 문제 텍스트로 초점을 옮긴다. */
function renderQuestion() {
  const question = state.quiz[state.index];

  document.getElementById('quiz-progress').textContent =
    (state.index + 1) + ' / ' + QUIZ_LENGTH + ' 문제';
  document.getElementById('quiz-score').textContent =
    '점수 ' + state.score + ' / ' + QUIZ_LENGTH;
  document.getElementById('quiz-category').textContent = question.categoryName;

  const badge = document.getElementById('quiz-difficulty');
  badge.textContent = DIFFICULTY_LABELS[question.difficulty];
  badge.className = 'badge diff-' + question.difficulty;

  document.getElementById('question-text').textContent = question.question;

  const container = document.getElementById('options');
  container.textContent = '';
  question.options.forEach(function (option, index) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option';
    button.textContent = option;
    button.addEventListener('click', function () {
      handleAnswer(index);
    });
    container.appendChild(button);
  });

  const feedback = document.getElementById('feedback');
  feedback.textContent = '';
  feedback.hidden = true;
  document.getElementById('btn-next').hidden = true;

  document.getElementById('question-text').focus();
}

/**
 * 채점하고 강조와 해설을 표시한다.
 * 맨 앞에 "이미 답했는가" 가드를 두지 않는다. 재선택은 disabled가 막는다.
 */
function handleAnswer(choiceIndex) {
  const question = state.quiz[state.index];
  const buttons = Array.from(document.querySelectorAll('#options .option'));
  const isCorrect = choiceIndex === question.answer;

  if (isCorrect) {
    state.score += 1;
    document.getElementById('quiz-score').textContent =
      '점수 ' + state.score + ' / ' + QUIZ_LENGTH;
  }

  buttons.forEach(function (button) {
    button.disabled = true;
  });

  // 색만으로 구분하지 않는다. 기호를 함께 붙인다.
  buttons[question.answer].classList.add('option-correct');
  buttons[question.answer].textContent = question.options[question.answer] + ' ✓';

  if (!isCorrect) {
    buttons[choiceIndex].classList.add('option-wrong');
    buttons[choiceIndex].textContent = question.options[choiceIndex] + ' ✗';
  }

  const feedback = document.getElementById('feedback');
  feedback.textContent = '';

  const verdict = document.createElement('p');
  verdict.className = 'feedback-verdict';
  verdict.textContent = isCorrect
    ? '정답입니다.'
    : '오답입니다. 정답은 ' + question.options[question.answer] + '입니다.';

  const explanation = document.createElement('p');
  explanation.className = 'feedback-explanation';
  explanation.textContent = question.explanation;

  feedback.appendChild(verdict);
  feedback.appendChild(explanation);
  feedback.hidden = false;
  feedback.focus();

  const next = document.getElementById('btn-next');
  next.textContent = state.index === QUIZ_LENGTH - 1 ? '결과 보기' : '다음 문제';
  next.hidden = false;
  // 해설이 펼쳐지면 모바일에서 버튼이 화면 밖으로 밀린다. 눌러야 넘어가는 구조라
  // 그대로 두면 게임이 멈춘 것처럼 보인다.
  next.scrollIntoView({ block: 'end' });
}

/** 다음 문제로 넘어간다. 마지막이면 결과 화면으로 간다. */
function goNext() {
  // 즉시 감춰 연타로 문제를 건너뛰는 것을 막는다.
  document.getElementById('btn-next').hidden = true;

  state.index += 1;
  if (state.index >= QUIZ_LENGTH) {
    finishGame();
    return;
  }

  renderQuestion();
  // 앞 문제에서 내려간 위치를 그대로 두면 다음 문제가 중간부터 보인다.
  document.getElementById('screen-quiz').scrollIntoView({ block: 'start' });
}

/** 확인창을 띄우고 확인하면 기록을 남기지 않은 채 시작 화면으로 돌아간다. */
function quitGame() {
  if (!confirm('진행 중인 게임을 그만두시겠습니까? 기록은 남지 않습니다.')) {
    return;
  }

  disableUnloadGuard();
  showScreen('screen-start');
}

/**
 * 이탈 경고. 등록은 판을 시작할 때, 해제는 결과 화면 진입과 그만두기 확인 두 곳뿐이다.
 * 확인창 문구는 지정할 수 없다. 모든 최신 브라우저가 커스텀 메시지를 무시한다.
 * Safari는 beforeunload를 지원하지 않아 동작하지 않는다(PRD 4.1절).
 */
function handleBeforeUnload(event) {
  event.preventDefault();
  event.returnValue = '';
}

function enableUnloadGuard() {
  window.addEventListener('beforeunload', handleBeforeUnload);
}

function disableUnloadGuard() {
  window.removeEventListener('beforeunload', handleBeforeUnload);
}

/** 3단계에서는 스텁이다. 4단계에서 점수, 정답률, 순위 저장을 잇는다. */
function finishGame() {
  disableUnloadGuard();
  showScreen('screen-result');
}

/** 페이지 로드 시 한 번 실행한다. 검사를 통과해야 그 뒤 초기화가 이어진다. */
function init() {
  const errors = validateData();

  if (errors.length > 0) {
    errors.forEach(function (message) {
      console.error(message);
    });
    console.error('데이터 검사 실패: ' + errors.length + '건. 게임을 시작하지 않는다.');
    showDataError();
    return;
  }

  renderCategoryCards();

  const allButton = document.getElementById('btn-all');
  allButton.textContent = '전 범위 도전 (' + QUIZ_LENGTH + '문제)';
  allButton.addEventListener('click', function () {
    startGame('all', null);
  });

  document.getElementById('player-name').addEventListener('input', clearNameError);

  // 순위표 화면의 내용은 4단계에서 그린다. 여기서는 열고 닫기만 한다.
  document.getElementById('btn-open-ranking').addEventListener('click', function () {
    showScreen('screen-ranking');
  });
  document.getElementById('btn-close-ranking').addEventListener('click', function () {
    showScreen('screen-start');
  });

  document.getElementById('btn-quit').addEventListener('click', quitGame);
  document.getElementById('btn-next').addEventListener('click', goNext);
}

document.addEventListener('DOMContentLoaded', init);
