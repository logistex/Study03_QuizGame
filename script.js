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

      if (seenIds.has(q.id)) {
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
        const duplicated = q.options.find(function (option, index) {
          return q.options.indexOf(option) !== index;
        });
        if (duplicated !== undefined) {
          errors.push(label + ": options에 중복된 선택지 '" + duplicated + "'");
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

  // 2단계에서 화면 렌더링과 이벤트 바인딩을 여기에 잇는다.
}

document.addEventListener('DOMContentLoaded', init);
