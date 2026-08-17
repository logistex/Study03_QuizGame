---
description: 문제 데이터를 규격에 대고 검증한다
argument-hint: "[카테고리] (생략하면 전체)"
---

<!-- 생성: 2026-08-17 18:38 KST -->

`questions.js`의 문제를 검증한다. 대상 범위는 `$ARGUMENTS`이며, 비어 있으면 전체를 본다.
카테고리는 `korean_history`, `science`, `geography`, `art_culture` 또는 한국사, 과학, 지리, 예술과 문화로 받는다.

**검증 기준을 새로 만들지 않는다.** 기준은 `spec/PRD.md`, `spec/IMPL-PLAN.md`,
`history/12-question-guidelines.md`에 있다. 무엇이 무엇을 확인하는지는
`spec/PRD.md` 3.6절 "규칙마다 무엇이 확인하는가" 표가 정한다.

## 1. 자동으로 잡히는 것

`spec/PRD.md` 4.2절 2번의 검사 항목은 `script.js`의 `validateData()`가 구현하고 있다.
저장소 밖에서 부르는 방법은 `spec/IMPL-PLAN.md`의 "저장소 밖에서 검사 함수를 부를 때"에 있다.
그 줄을 그대로 쓴다.

```bash
node -e "
const fs = require('fs'), vm = require('vm');
const ctx = vm.createContext({ console, document: { addEventListener() {} } });
vm.runInContext(fs.readFileSync('questions.js','utf8'), ctx);
vm.runInContext(fs.readFileSync('script.js','utf8'), ctx);
const errors = vm.runInContext('validateData()', ctx);
console.log(errors.length ? errors.join('\n') : '위반 0건');
"
```

위반이 나오면 `id`와 항목을 그대로 옮긴다.

## 2. 사람이 봐야 하는 것

`spec/PRD.md` 3.6절 확인 수단 표에서 "육안 검토"로 표시된 것들이다.
절차는 `spec/IMPL-PLAN.md` 1.8절에 있다.

| 볼 것 | 근거 |
|---|---|
| `options[answer]`가 정말 그 문제의 정답인가 | `spec/IMPL-PLAN.md` 1.8절 1번 |
| `explanation`이 그 정답의 근거를 설명하는가. 문제를 되풀이하는 문장이 아닌가 | `spec/IMPL-PLAN.md` 1.8절 2번, `spec/PRD.md` 3.6절 필드 표 |
| 문제 텍스트와 해설이 선택지 위치를 지칭하지 않는가 | `spec/PRD.md` 2.1절, `spec/IMPL-PLAN.md` 1.8절 3번 |
| 오답 셋이 명백한 오답인가. 정답이 둘로 읽히지 않는가 | `spec/PRD.md` 3.6절, `spec/IMPL-PLAN.md` 1.8절 4번 |
| 최상급 표현에 재는 기준과 범위가 있는가 | `spec/PRD.md` 3.6절, `spec/IMPL-PLAN.md` 1.8절 5번 |
| 시점에 따라 달라지는 수치에 기준 시점이 있는가 | `spec/PRD.md` 3.6절, `spec/IMPL-PLAN.md` 1.8절 6번 |
| 해설의 연도, 수치, 인명을 출처 둘 이상으로 대조했는가 | `spec/IMPL-PLAN.md` 1.8절 7번 |
| **문항끼리 같은 사실을 묻고 있지 않은가** | `spec/IMPL-PLAN.md` 1.8절 8번 |

난이도 배분과 정답 인덱스 분포는 확인 수단 표가 "사람이 센다"로 두었다. 세어서 적는다.

교차 검증의 관점은 `history/12-question-guidelines.md` 2절을 따른다.

## 3. 규격 밖에서 더하는 것

각 항목이 규격에 있는지 규격을 열어 판정했다.

| 더하는 것 | 판정 |
|---|---|
| 외부 출처 두 곳 이상 대조, 기억으로 판정 금지, 확인 못 하면 "미확인" | **규격 안** — `spec/IMPL-PLAN.md` 1.8절 7번 |
| 이미 대조가 끝난 문항은 다시 대조하지 않는다 | **규격 밖** |
| 외부 출처 대조 문항이 20개를 넘으면 나눠서 병렬로, 묶음마다 파일 먼저 | **규격 밖** |

- 출처가 갈리면 갈린 대로 적는다. 한쪽으로 정리하지 않는다
- 기존 기록을 쓸 때는 **어느 문서 어느 절**에서 확인했는지와 그 기록이 **어느 시점 판본**을 본
  것인지 적는다. 기록이 확인한 범위 밖은 "미확인"으로 남긴다
- 나눌 때 묶음 결과는 `.claude/tmp/quiz-validate/<카테고리>-<시작id>-<끝id>.md`에 먼저 쓴다.
  `.gitignore`가 `.claude/*`를 무시하므로 저장소에 남지 않는다. 20개 이하면 나누지 않는다

## 4. 보고

- **문제 파일을 고치지 않는다.** 고칠지는 사람이 정한다
- 걸린 것이 없으면 "고칠 것 없음"이라고 적는다. 이것도 점검 결과다
- 걸린 것은 `id`, 무엇이 어긋나는지, 권고 문구 순으로 적는다
- **자동 검사 결과와 사람 판단을 따로 적는다**

## 5. 규격에 반영할 것

규격과 코드가 어긋난 것은 `id`가 없다. 고칠 대상이 `questions.js`가 아니라 `script.js`이거나
규격 문서다. 문항 지적과 섞으면 몇 건 걸렸는지 셀 수 없으므로 여기에 따로 모은다.
