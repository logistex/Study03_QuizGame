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
  categoryId: null
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
 */
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(function (section) {
    section.hidden = section.id !== screenId;
  });
  document.querySelector('#' + screenId + ' .title').focus();
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

/**
 * 2단계에서는 스텁이다. 이름 검증을 통과하면 상태를 채우고 화면만 넘긴다.
 * 3단계에서 문제 뽑기와 renderQuestion(), 이탈 경고를 잇는다.
 */
function startGame(mode, categoryId) {
  const name = readPlayerName();
  if (name === null) {
    return;
  }

  state.playerName = name;
  state.mode = mode;
  state.categoryId = categoryId;

  showScreen('screen-quiz');
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
}

document.addEventListener('DOMContentLoaded', init);
