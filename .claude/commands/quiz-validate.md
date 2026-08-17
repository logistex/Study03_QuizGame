---
description: 문제 데이터를 규격에 대고 검증한다
argument-hint: "[카테고리] (생략하면 40문항 전체)"
---

<!-- 생성: 2026-08-17 17:26 KST -->

`questions.js`의 문제를 검증한다. 대상 범위는 `$ARGUMENTS`이며, 비어 있으면 40문항 전체를 본다.
카테고리는 `korean_history`, `science`, `geography`, `art_culture` 또는 한국사, 과학, 지리, 예술과 문화로 받는다.

**검증 기준을 새로 만들지 않는다.** 기준은 `spec/PRD.md`, `spec/IMPL-PLAN.md`,
`history/12-question-guidelines.md`에 이미 있다.

## 1. 자동으로 잡히는 것

`spec/PRD.md` 4.2절 2번의 검사 항목은 `script.js`의 `validateData()`가 구현하고 있다.
**검사 로직을 다시 짜지 않는다.**

아래 줄을 저장소 뿌리에서 그대로 실행한다. 돌려서 확인한 방법이다.

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

`script.js`에는 `export`가 없고 마지막 줄이 `document.addEventListener('DOMContentLoaded', init)`라
그냥 읽으면 `ReferenceError: document is not defined`가 난다. `vm.createContext`에 `document` 스텁을
주면 통과하고 같은 컨텍스트에서 함수를 부를 수 있다. **행 번호나 줄 범위에 기대지 않으므로
`script.js`가 바뀌어도 이 줄은 그대로 쓴다.**

위반이 나오면 `id`와 항목을 그대로 옮긴다.

## 2. 규격에 있는데 검사 함수가 잡지 못하는 것

문항마다 묻고, 걸리는 것만 보고한다.

| 볼 것 | 근거 |
|---|---|
| 정답이 하나로만 읽히는가. 오답 셋이 모두 명백한 오답인가 | `spec/PRD.md` 3.6절, `spec/IMPL-PLAN.md` 1.8절 4번 |
| 최상급 표현에 재는 기준이 문제 텍스트에 있는가 | `spec/PRD.md` 3.6절 |
| 시점과 범위가 한정되어 있는가 | `spec/PRD.md` 3.6절, `spec/IMPL-PLAN.md` 1.8절 6번 |
| `options[answer]`가 정말 그 문제의 정답인가 | `spec/IMPL-PLAN.md` 1.8절 1번 |
| `explanation`이 그 정답의 근거를 설명하는가. 문제를 되풀이하는 문장이 아닌가 | `spec/IMPL-PLAN.md` 1.8절 2번, `spec/PRD.md` 3.6절 필드 표 |
| 문제 텍스트와 해설이 선택지 위치를 지칭하지 않는가 | `spec/PRD.md` 2.1절, `spec/IMPL-PLAN.md` 1.8절 3번 |
| 난이도 배분이 초급 4, 중급 4, 고급 2인가 (합이 10이면 다른 조합도 됨) | `spec/PRD.md` 3.6절 |
| `answer` 0~3이 카테고리마다 각각 2~3회씩 나오는가 | `spec/PRD.md` 3.6절 |

교차 검증의 관점은 `history/12-question-guidelines.md` 2절을 따른다.

### 검사 함수가 덮지 못하는 규격 항목

규격에 있는데 `validateData()`에도 육안 검토 절차에도 없다. 확인해서 5절에 모은다.

| 항목 | 근거 | 상태 |
|---|---|---|
| `question`이 60자를 넘지 않는가 | `spec/PRD.md` 3.6절 필드 표, `spec/IMPL-PLAN.md` 1.6~1.7절 | 검사 함수에 없음 |
| 각 선택지가 20자를 넘지 않는가 | 같은 자리 | 검사 함수에 없음 |

## 3. 사실 확인

- 해설의 연도, 수치, 인명은 **외부 출처 두 곳 이상으로 대조한다** — `spec/IMPL-PLAN.md` 1.8절 7번
  ("해설의 연도, 수치, 인명을 출처 둘 이상으로 대조했는가"). **규격 안이다**
- **기억으로 판정하지 않는다.** 출처가 갈리면 갈린 대로 적고, 확인하지 못한 것은 "미확인"으로 남긴다
- **이미 대조가 끝난 문항은 다시 대조하지 않는다** — **규격 밖.** 어느 문서 어느 절에서 확인했는지와
  그 기록이 **어느 시점 판본**을 본 것인지 적는다. 기록이 확인한 범위 밖은 "미확인"으로 남긴다
- **외부 출처 대조를 실제로 수행하는 문항이 20개를 넘으면** 나눠서 병렬로 확인하고, 각 묶음은
  결과를 파일로 먼저 쓴다 — **규격 밖.** 20개 이하면 나누지 않는다

```
.claude/tmp/quiz-validate/<카테고리>-<시작id>-<끝id>.md
```

`.gitignore`가 `.claude/*`를 무시하므로 저장소에는 남지 않는다.

## 4. 보고

- **문제 파일을 고치지 않는다.** 고칠지는 사람이 정한다
- 걸린 것이 없으면 "고칠 것 없음"이라고 적는다. 이것도 점검 결과다
- 걸린 것은 `id`, 무엇이 어긋나는지, 권고 문구 순으로 적는다
- **자동 검사 결과와 사람 판단을 따로 적는다**

## 5. 규격에 반영할 것

규격과 코드가 어긋난 것은 `id`가 없다. 고칠 대상이 `questions.js`가 아니라 `script.js`이거나
규격 문서다. 문항 지적과 섞으면 몇 건 걸렸는지 셀 수 없으므로 여기에 따로 모은다.
