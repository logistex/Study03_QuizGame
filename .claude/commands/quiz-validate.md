---
description: 문제 데이터를 규격에 대고 검증한다
argument-hint: "[카테고리] (생략하면 전체)"
---

<!-- 생성: 2026-08-17 22:37 KST -->

`questions.js`의 문제를 규격에 대고 검증한다. 대상 범위는 `$ARGUMENTS`이며, 비어 있으면 전체를 본다.
카테고리는 `korean_history`, `science`, `geography`, `art_culture` 또는 한국사, 과학, 지리, 예술과 문화로 받는다.

**검증 기준은 규격에 있다.** 새로 만들지 않는다. 근거는 `spec/PRD.md`, `spec/IMPL-PLAN.md`,
`history/12-question-guidelines.md`에 있고, 무엇을 무엇이 확인하는지는
`spec/PRD.md` 3.6절 "규칙마다 무엇이 확인하는가" 표가 정한다. 아래 1절과 2절의 분류도 그 표에서 나왔다.

## 1. 자동으로 포착되는 것

확인 수단 표가 "4.2절 검사 함수"로 표시한 일곱 규칙이다. `script.js`의 `validateData()`가
V0부터 V11까지 구현하고 있다(`spec/IMPL-PLAN.md` "검사 항목과 콘솔 출력 형식").

부르는 줄은 `spec/IMPL-PLAN.md` "저장소 밖에서 검사 함수를 부를 때"에 있다. 그 줄을 그대로 쓴다.
저장소 뿌리에서 실행한다.

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

- 출력을 그대로 옮긴다. 위반이 있으면 `id`와 항목을 원문대로 적는다
- 검사 함수는 전체를 돈다. 대상 범위가 지정되었으면 출력에서 그 카테고리의 `id`만 골라 보고한다
- **행 번호로 파일을 잘라 쓰지 않는다.** 함수가 옮겨지면 같이 틀린다

## 2. 클로드가 판정하는 것

확인 수단 표가 "클로드가 판정"으로 표시한 여덟 규칙이다. **판정은 클로드가 하고 채택 여부는 사람이 정한다.** 검사 함수가 통과해도
`answer`가 틀린 선택지를 가리키거나 해설이 정답과 무관한 경우는 화면이 정상이고 채점만 틀린다.

| 확인할 것 | 근거 |
|---|---|
| `options[answer]`가 정말 그 문제의 정답인가 | `spec/IMPL-PLAN.md` 1.8절 1번 |
| `explanation`이 그 정답의 근거를 설명하는가. 문제를 되풀이하는 문장이 아닌가 | `spec/IMPL-PLAN.md` 1.8절 2번, `spec/PRD.md` 3.6절 필드 표 |
| 문제 텍스트와 해설이 선택지 위치를 지칭하지 않는가 | `spec/PRD.md` 2.1절, `spec/IMPL-PLAN.md` 1.8절 3번 |
| 정답이 하나로만 읽히는가. 오답 셋이 모두 명백한 오답인가 | `spec/PRD.md` 3.6절, `spec/IMPL-PLAN.md` 1.8절 4번 |
| 최상급 표현이 놓인 자리에 재는 기준과 범위가 함께 있는가 | `spec/PRD.md` 3.6절, `spec/IMPL-PLAN.md` 1.8절 5번 |
| 시점에 따라 달라지는 수치에 기준 시점이 있는가 | `spec/PRD.md` 3.6절, `spec/IMPL-PLAN.md` 1.8절 6번 |
| 해설의 연도, 수치, 인명을 출처 둘 이상으로 대조했는가 | `spec/IMPL-PLAN.md` 1.8절 7번 |
| 문항끼리 같은 사실을 묻고 있지 않은가 | `spec/IMPL-PLAN.md` 1.8절 8번 |

판정은 클로드가 하되, 계획서 1.8절이 **볼 곳을 좁히는 목록**을 함께 정해 두었다. 다섯째, 여섯째, 여덟째 줄이 그것이다.
콘솔 스니펫을 명령줄용으로 옮기면 이렇다. 대상 범위가 지정되었으면 `Object.values(QUESTIONS).flat()`을
`QUESTIONS.<카테고리 id>`로 바꾼다.

```bash
node -e "
const fs = require('fs'), vm = require('vm');
const ctx = vm.createContext({ console, document: { addEventListener() {} } });
vm.runInContext(fs.readFileSync('questions.js','utf8'), ctx);
const qs = vm.runInContext('Object.values(QUESTIONS).flat()', ctx);
console.log('== 최상급 표현 (1.8절 5번) ==');
qs.filter(q => /가장|최초|최대|최고|유일/.test(q.question + q.explanation))
  .forEach(q => console.log(q.id + '  ' + q.question + '  /  ' + q.explanation));
console.log('== 시점 의존 수치 (1.8절 6번) ==');
qs.filter(q => /\d{4}년|\d[\d,.]*\s*(만|억)?\s*(미터|제곱|%|배)/.test(q.explanation))
  .forEach(q => console.log(q.id + '  ' + q.explanation));
console.log('== 문항 목록 (1.8절 8번) ==');
qs.forEach(q => console.log(q.id + '  ' + q.question));
"
```

목록은 **어디를 볼지 알려 줄 뿐 판정하지 않는다.** 나온 줄을 하나씩 읽고 규칙에 대어 판정한다.

### 세는 항목

확인 수단 표가 "사람이 센다"로 둔 것이 따로 있다. 판정이 아니라 세기다.

| 셀 것 | 기준 |
|---|---|
| 난이도 배분 | 카테고리마다 초급 4, 중급 4, 고급 2. 합이 10이면 다른 조합도 됨 (`spec/PRD.md` 3.6절) |
| 정답 인덱스 분포 | 카테고리마다 0\~3이 각각 2\~3회 (`spec/PRD.md` 3.6절) |

## 3. 추가로 수행할 것

각 항목이 규격에 있는지 규격을 열어 판정했다.

| 항목 | 판정 |
|---|---|
| 해설의 연도, 수치, 인명을 외부 출처 둘 이상으로 대조. 기억으로 판정하지 않음 | **규격 안** — `spec/IMPL-PLAN.md` 1.8절 7번, `spec/PRD.md` 3.6절 확인 수단 표 |
| 확인하지 못한 것은 "미확인"으로 남김 | **규격 밖** |
| 이미 대조가 끝난 문항은 다시 대조하지 않음 | **규격 밖** |
| 외부 출처 대조 문항이 20개를 넘으면 분할하여 병렬로, 묶음마다 결과를 파일에 먼저 기록 | **규격 밖** |

- 출처가 갈리면 **갈린 대로 적는다.** 한쪽으로 정리하지 않는다.
  다만 `questions.js`에 담을 값을 고를 때는 규격이 주류 학설을 따르라고 정해 두었다(1.8절 7번)
- 기존 기록을 쓸 때는 **어느 문서 어느 절**에서 확인했는지와 그 기록이 **어느 시점 판본**을 본 것인지 적는다.
  기록이 확인한 범위 밖은 "미확인"으로 남긴다. 대조가 끝난 문항의 출처는
  `history/32-question-source-verification-report.md`와 `history/33-question-source-verification.md`에 있다
- 나눌 때 묶음 결과는 `.claude/tmp/quiz-validate/<카테고리>-<시작id>-<끝id>.md`에 먼저 쓴다.
  `.gitignore`가 `.claude/*`를 무시하므로 저장소에 남지 않는다. 20개 이하면 분할하지 않는다

## 4. 보고

- **문제 파일을 수정하지 않는다.** 수정 여부는 사람이 정한다
- **자동 검사 결과와 클로드의 판정을 구분하여 적는다.** 둘을 섞으면 무엇이 재현되는 판정인지 알 수 없다
- **자동 검사 결과를 적을 때 "걸린 것이 없다"를 범위 없이 쓰지 않는다.** 무엇이 걸리지 않았는지를 함께 적는다.
  범위를 안 적으면 자동 검사만 통과한 것이 검증 전체를 통과한 것으로 읽힌다
- **권고 문구에 새 사실을 넣을 때는 그 사실도 출처 둘 이상으로 대조한 뒤 적는다.**
  판정할 때 대조한 것은 고치기 전 문장이다. 고쳐서 새로 들어가는 연도, 수치, 인명에는 그 대조가 걸리지 않는다
- 검증에서 문제가 확인된 것은 `id`, 무엇이 어긋나는지, 권고 문구 순으로 적는다
- 검증에서 문제가 확인된 것이 없으면 "고칠 것 없음"이라고 적는다. 이것도 점검 결과다

## 5. 규격에 반영할 것

규격과 코드가 어긋난 것은 `id`가 없다. 고칠 대상이 `questions.js`가 아니라 `script.js`이거나
규격 문서다. 문항 지적과 섞으면 몇 건 걸렸는지 셀 수 없으므로 여기에 별도로 모은다.
