---
description: 문제 분포를 규격 기준에 대고 센다
argument-hint: "[카테고리] (생략하면 전체)"
---

<!-- 생성: 2026-08-21 10:34 KST -->

`questions.js`의 문제 분포를 규격 기준에 대고 센다. 대상 범위는 `$ARGUMENTS`이며, 비어 있으면 전체를 본다.
카테고리는 `korean_history`, `science`, `geography`, `art_culture` 또는 한국사, 과학, 지리, 예술과 문화로 받는다.

**세는 기준은 규격에 있다.** 새로 만들지 않는다.

## 1. 무엇을 세는가

`spec/PRD.md` 3.6절 "규칙마다 무엇이 확인하는가" 표에서 판정이 아니라 세기인 것을 모았다.

| 셀 것 | 기준 | 근거 |
|---|---|---|
| 카테고리별 문항 수 | `QUIZ_LENGTH` 이상 | `spec/PRD.md` 3.6절 작성 규칙, `spec/IMPL-PLAN.md` 검사 항목 V2 |
| 난이도 배분 | 초급 4, 중급 4, 고급 2가 기준. **합이 문항 수와 같으면 다른 조합도 된다** | `spec/PRD.md` 3.6절 |
| 정답 인덱스 분포 | 0부터 3까지가 각각 2\~3회 | `spec/PRD.md` 3.6절 |

기준의 4, 4, 2와 2\~3회는 **문항이 10개일 때의 값**이다. `spec/PRD.md` 8절이
"추가 시 카테고리별 난이도 배분과 정답 인덱스 분포를 확대된 문제 수 기준으로 다시 맞춘다"고
정해 두었으므로, 이 숫자를 그대로 쓰지 않고 **그 카테고리의 실제 문항 수에서 계산한다.**

| 무엇 | 문항 수 `n`에서 |
|---|---|
| 난이도 기준 | 초급과 중급은 각각 `n`의 40%, 고급은 나머지 |
| 정답 인덱스 기준 | 각 값이 `n / 4`의 내림 이상 올림 이하 |

## 2. 세는 줄

`spec/IMPL-PLAN.md` "저장소 밖에서 검사 함수를 부를 때"가 정한 방식을 따른다.
`script.js`는 브라우저용이라 `document` 스텁을 준다. 저장소 뿌리에서 실행한다.

`QUIZ_LENGTH`와 `DIFFICULTY_LABELS`가 `script.js`에 있으므로 두 파일을 함께 읽는다.
난이도 목록을 여기에 다시 적지 않고 `DIFFICULTY_LABELS`의 키를 쓴다.

```bash
node -e "
const fs = require('fs'), vm = require('vm');
const ctx = vm.createContext({ console, document: { addEventListener() {} } });
vm.runInContext(fs.readFileSync('questions.js','utf8'), ctx);
vm.runInContext(fs.readFileSync('script.js','utf8'), ctx);
const Q = vm.runInContext('QUESTIONS', ctx);
const CATS = vm.runInContext('CATEGORIES', ctx);
const LEN = vm.runInContext('QUIZ_LENGTH', ctx);
const LABELS = vm.runInContext('DIFFICULTY_LABELS', ctx);
const KEYS = Object.keys(LABELS);
const sum = { n: 0, diff: KEYS.map(() => 0), ans: [0, 0, 0, 0] };
console.log('카테고리  문항 수 (기준)  난이도 ' + KEYS.map(k => LABELS[k]).join('/') + ' (기준)  정답 0/1/2/3 (기준)');
for (const c of CATS) {
  const list = Q[c.id] || [];
  const n = list.length;
  const diff = KEYS.map(k => list.filter(q => q.difficulty === k).length);
  const ans = [0, 1, 2, 3].map(i => list.filter(q => q.answer === i).length);
  const base40 = Math.round(n * 0.4);
  const diffBase = [base40, base40, n - base40 * 2];
  const lo = Math.floor(n / 4), hi = Math.ceil(n / 4);
  const flag = [];
  if (n < LEN) flag.push('문항 수 부족');
  if (diff.reduce((a, b) => a + b, 0) !== n) flag.push('난이도 합 불일치');
  if (diff.join() !== diffBase.join()) flag.push('난이도 조합이 기준과 다름');
  if (ans.some(v => v < lo || v > hi)) flag.push('정답 인덱스 치우침');
  console.log([
    c.name,
    '문항 ' + n + '개 (' + LEN + ' 이상)',
    diff.join('/') + ' (' + diffBase.join('/') + ')',
    ans.join('/') + ' (' + lo + '-' + hi + ')',
    flag.length ? '<- ' + flag.join(', ') : ''
  ].join('  '));
  sum.n += n;
  diff.forEach((v, i) => sum.diff[i] += v);
  ans.forEach((v, i) => sum.ans[i] += v);
}
console.log(['합계', '문항 ' + sum.n + '개', sum.diff.join('/'), sum.ans.join('/')].join('  '));
"
```

- 대상 범위가 지정되었으면 그 카테고리 줄만 보고한다. 세는 것은 전체를 돈다
- **행 번호로 파일을 잘라 쓰지 않는다.** 상수가 옮겨지면 같이 틀린다

## 3. 보고

- 카테고리마다 한 줄씩 표로 적고 마지막에 합계 줄을 둔다
- 기준에서 벗어난 칸을 눈에 띄게 표시한다
- **난이도 조합이 기준과 다른 것은 위반이 아니다.** 규격이 다른 조합을 허용한다.
  합이 문항 수와 다를 때만 어긋난 것이다
- 어긋난 것이 없으면 "고칠 것 없음"이라고 적는다. 이것도 점검 결과다

## 4. 하지 않는 것

- **판정하지 않는다.** 최상급 기준, 출처 대조, 정답이 맞는지는 `/quiz-validate`가 본다.
  둘이 겹치면 어느 쪽이 낸 결과인지 알 수 없다
- **문제 파일을 고치지 않는다.** 고칠지는 사람이 정한다

## 5. 규격에 반영할 것

세는 항목이 `spec/PRD.md` 3.6절 확인 수단 표에 무엇으로 적혀 있는지 확인하고,
어긋나면 여기에 모아 적는다. 고칠 대상이 `questions.js`가 아니라 규격 문서이므로
보고에서 문항 결과와 섞지 않는다.

2026-08-21 기준으로는 어긋나지 않는다. 표가 난이도 배분과 정답 인덱스 분포를
`/quiz-stats` 명령어가 센다로, 문항 수를 데이터 검사(4.2절)로 두고 있다.
