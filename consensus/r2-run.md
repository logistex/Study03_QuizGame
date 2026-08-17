<!-- 생성: 2026-08-17 17:12 KST -->

# 2라운드 실행 — 세 프롬프트를 돌린 결과

- 실행: 260811-7 구현팀 (주 작업 폴더 `…/vibe coding (taehojo)/5장 퀴즈게임 by ClaudeDesktop`)
- 근거: `consensus/00-rules.md` 3절 2라운드, 4절(정정 반영)
- **생성된 파일과 실행 출력을 요약하지 않고 원문 그대로 싣는다**

## 실행 조건

- 세 프롬프트를 각각 돌려 `.claude/commands/quiz-validate.md`를 만들었다. 같은 경로라 판마다 덮어썼고, 각 판은 따로 떠 두었다
- 만들어진 명령어는 **셋 다 인수 `지리`로 한 번씩** 실행했다. 40문항 전체로 돌리면 출력이 길어 원문 그대로 싣기 어렵다
- 판정 기준 1번은 정정된 문장으로 읽었다 — 명령어를 글자 그대로 따라 했을 때 위반 건수가 숫자로 나오는가
- 세 판 모두 `위반 0건`이 나왔다. 기준 1번은 셋 다 통과다

---


## A판 — `consensus/r1-impl5.md` (260811-5 구현팀)

### 생성된 `.claude/commands/quiz-validate.md` 원문

````markdown
---
description: 문제 데이터를 규격에 대고 검증한다
argument-hint: "[카테고리] (생략하면 전체)"
---

<!-- 생성: 2026-08-17 17:26 KST -->

`questions.js`의 문제를 검증한다. 대상 범위는 `$ARGUMENTS`이며, 비어 있으면 전체를 본다.
카테고리는 `korean_history`, `science`, `geography`, `art_culture` 또는 한국사, 과학, 지리, 예술과 문화로 받는다.

**검증 기준은 규격에 이미 있다. 새로 만들지 않는다.**

## 1. 자동으로 잡히는 것 — `validateData()`를 그대로 돌린다

검사 로직을 다시 짜지 않는다. 아래 명령줄이 실제로 돌아가는 것을 확인했다.

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

`script.js`는 브라우저용이라 그냥 읽으면 마지막 줄의 `document.addEventListener`에서 죽는다.
`vm.createContext`로 `document` 스텁을 주면 통과하고, `export`가 없어도 같은 컨텍스트에서 함수를 부를 수 있다.

이 함수가 덮는 항목은 `spec/PRD.md` 4.2절 2번 표에 있다 — 카테고리 존재, 문제 수 10 이상,
`options` 길이 4, 선택지 빈 문자열, `answer` 정수 범위, `difficulty` 값, `question`과 `explanation` 빈 값,
선택지 중복, `id` 빈 값과 중복, `question` 텍스트 중복.

위반이 나오면 `id`와 항목을 그대로 옮긴다.

## 2. 검사 함수가 덮지 못하는 규격 항목

규격에 있는데 `validateData()`에 없다. 그래서 사람이 본다.

| 볼 것 | 근거 |
|---|---|
| `question`이 60자를 넘지 않는가 | `spec/PRD.md` 3.6절 필드 표, `spec/IMPL-PLAN.md` 1.6~1.7절 |
| 각 선택지가 20자를 넘지 않는가 | 같은 자리 |
| 난이도 배분이 초급 4, 중급 4, 고급 2인가 (합이 10이면 다른 조합도 됨) | `spec/PRD.md` 3.6절 |
| `answer` 값 0~3이 카테고리마다 각각 2~3회씩 나오는가 | 같은 자리 |

길이 두 항목은 세어서 판정한다. 눈으로 세지 않는다.

## 3. 사람이 판정하는 것

| 볼 것 | 근거 |
|---|---|
| `options[answer]`가 정말 그 문제의 정답인가 | `spec/IMPL-PLAN.md` 1.8절 1번 |
| `explanation`이 그 정답의 근거를 설명하는가. 문제를 되풀이하는 문장이 아닌가 | `spec/IMPL-PLAN.md` 1.8절 2번, `spec/PRD.md` 3.6절 필드 표 |
| 문제 텍스트와 해설에 선택지 위치를 지칭하는 표현이 없는가 | `spec/IMPL-PLAN.md` 1.8절 3번, `spec/PRD.md` 2.1절 |
| 오답 셋이 명백한 오답인가. 정답이 둘로 읽히지 않는가 | `spec/IMPL-PLAN.md` 1.8절 4번, `spec/PRD.md` 3.6절 |
| 최상급 표현에 재는 기준이 문제 텍스트에 있는가 | `spec/PRD.md` 3.6절 |
| 시점과 범위가 한정되어 있는가 | `spec/PRD.md` 3.6절 |

교차 검증의 관점은 `history/12-question-guidelines.md` 2절을 따른다.

## 4. 사실 확인 (규격 밖)

- 해설의 연도, 수치, 인명은 **외부 출처 두 곳 이상으로 대조한다**
- **기억으로 판정하지 않는다**
- 확인하지 못한 것은 "미확인"으로 남긴다

## 5. 나눠서 병렬로 (규격 밖)

- 문항을 **네 개씩** 묶어 나누고 묶음을 병렬로 확인한다
- **각 묶음은 결과를 파일로 먼저 쓴다.** 화면에 먼저 내지 않는다

```
.claude/tmp/quiz-validate/<카테고리>-<시작id>-<끝id>.md
```

폴더가 없으면 만든다. `.gitignore`가 `.claude/*`를 무시하므로 저장소에는 남지 않는다.
묶음이 다 끝난 뒤 그 파일들을 읽어 하나로 모아 보고한다.

## 6. 보고 (규격 밖)

- **문제 파일을 고치지 않는다.** 고칠지는 사람이 정한다
- 걸린 것이 없으면 "고칠 것 없음"이라고 적는다
- 걸린 것은 `id`, 무엇이 어긋나는지, 권고 문구 순으로 적는다
````

### 실행 — `/quiz-validate 지리`

1절 자동 검사

```
== 1절 자동 검사
위반 0건
```

2절 검사 함수가 덮지 못하는 규격 항목 (지리)

```
question 60자 초과: 0건
선택지 20자 초과: 0건
난이도 easy/medium/hard: 4 / 4 / 2
정답 인덱스 0/1/2/3: 3 / 3 / 2 / 2
```

5절 묶음 파일 — 네 개씩 나눠 세 묶음을 만들고 결과를 먼저 썼다

```
.claude/tmp/quiz-validate/geography-ge_01-ge_04.md
.claude/tmp/quiz-validate/geography-ge_05-ge_08.md
.claude/tmp/quiz-validate/geography-ge_09-ge_10.md
```

묶음 파일 원문

```
# 묶음 1 — geography ge_01~ge_04

- 3절 사람 판정
  - ge_01 걸림 — "우리나라에서 가장 큰 섬"에 재는 기준이 문제 텍스트에 없다. 해설에만 면적이 있다 (PRD 3.6절)
  - ge_02 통과 — "해발 기준으로"가 문제에 있고 해설에 2020년 재측량 시점이 있다
  - ge_03 통과
  - ge_04 통과 — "남한에서"로 범위가 좁혀져 있다
  - 넷 다 options[answer]가 정답이고, 해설이 근거를 대며, 선택지 위치를 지칭하지 않는다
- 4절 사실 확인 — 미확인. 이 실행에서 외부 출처를 열지 않았다

# 묶음 2 — geography ge_05~ge_08

- 3절 사람 판정 — 넷 다 통과
  - ge_05 캔버라, ge_06 태평양("가장 넓은"이 넓이 기준을 스스로 밝힘), ge_07 사하라("가장 넓은 더운 사막"으로 분류 범위 한정), ge_08 그리니치
- 4절 사실 확인 — 미확인

# 묶음 3 — geography ge_09~ge_10

- 3절 사람 판정 — 둘 다 통과
  - ge_09 "국토 면적이 세계에서 가장 넓은" — 재는 기준이 문제 텍스트에 있다. PRD 3.6절이 본보기로 든 문항
  - ge_10 불의 고리
- 4절 사실 확인 — 미확인
```

6절 보고

```
걸린 것 1건

| id | 어긋나는 것 | 권고 문구 |
|---|---|---|
| ge_01 | 최상급 표현에 재는 기준이 문제 텍스트에 없다 (PRD 3.6절) | 우리나라에서 면적이 가장 큰 섬은 어디인가? |

문제 파일은 고치지 않았다.
```

---


## B판 — `consensus/r1-review6.md` (260811-6 검토팀)

### 생성된 `.claude/commands/quiz-validate.md` 원문

````markdown
---
description: 문제 데이터를 규격에 대고 검증한다
argument-hint: "[카테고리] (생략하면 전체)"
---

<!-- 생성: 2026-08-17 17:09 KST -->

`questions.js`의 문제를 검증한다. 대상 범위는 `$ARGUMENTS`이며, 비어 있으면 40문항 전체를 본다.
카테고리는 `korean_history`, `science`, `geography`, `art_culture` 또는 한국사, 과학, 지리, 예술과 문화로 받는다.

**이 명령어는 새 검증 기준을 만들지 않는다.** 기준은 `spec/PRD.md` 2.1절, 3.6절, 4.2절과
`spec/IMPL-PLAN.md` 1.8절에 있고, 교차 검증의 관점은 `history/12-question-guidelines.md`에 있다.

## 1. 자동으로 잡히는 것

`spec/PRD.md` 4.2절 2번의 검사 항목은 `script.js`의 `validateData()`가 이미 구현하고 있다.
**검사 로직을 다시 짜지 않는다.**

아래 줄을 저장소 뿌리에서 그대로 실행한다. 이 방법이 도는 것을 확인했다.

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
주면 통과하고, 같은 컨텍스트에서 `validateData()`를 부를 수 있다.

위반이 나오면 `id`와 항목을 그대로 옮긴다.

## 2. 자동으로 안 잡히는 것

`spec/PRD.md` 3.6절 끝은 **"위 세 규칙은 자동 검사로 판정할 수 없다"**고 적고 있다.
그 셋은 바로 앞의 세 항목이다.

| 볼 것 | 근거 |
|---|---|
| 정답이 하나로만 읽히는가. 오답 셋이 모두 명백한 오답인가 | `spec/PRD.md` 3.6절 |
| 최상급 표현에 재는 기준이 문제 텍스트에 있는가 | `spec/PRD.md` 3.6절 |
| 시점과 범위가 한정되어 있는가 | `spec/PRD.md` 3.6절 |

아래 둘은 3.6절이 말한 "세 규칙"에 들지 않는다. **자동 검사도 잡지 못해 여기에 둔다.**

| 볼 것 | 근거 | 왜 넣는가 |
|---|---|---|
| 문제 텍스트와 해설이 선택지 위치를 지칭하지 않는가 | `spec/PRD.md` 2.1절, `spec/IMPL-PLAN.md` 1.8절 3번 | 선택지를 섞으면 사실과 어긋나는데 검사 함수가 못 잡는다 |
| `explanation`이 그 정답의 근거를 설명하는가 | `spec/PRD.md` 3.6절 필드 표, `spec/IMPL-PLAN.md` 1.8절 2번 | 채워져 있으면 검사 함수는 통과시킨다. 내용은 사람만 본다 |

## 3. 사실 확인

- 해설의 연도, 수치, 인명은 **외부 출처 두 곳 이상으로 대조한다**
- **기억만으로 판정하지 않는다**
- 출처가 갈리면 갈린 대로 적는다. 한쪽으로 정리하지 않는다
- 확인하지 못한 것은 "미확인"으로 남긴다. 확인한 척하지 않는다
- **먼저 저장소에 남아 있는 기존 검증 기록을 찾아본다.** 이미 대조가 끝난 문항을 다시 대조하면
  그 품이 통째로 버려진다

## 4. 보고

- **문제 파일을 직접 고치지 않는다.** 고칠지는 사람이 정한다
- 걸린 것이 없으면 "고칠 것 없음"이라고 적는다. 이것도 점검 결과다
- 걸린 것은 `id`, 무엇이 어긋나는지, 권고하는 수정 문구 순으로 적는다
- **자동 검사 결과와 사람 판단을 따로 적는다.** 섞이면 무엇이 기계로 걸린 것인지 알 수 없다
````

### 실행 — `/quiz-validate 지리`

1절 자동으로 잡히는 것

```
== 1절 자동 검사
위반 0건
```

3절 기존 검증 기록 조회 — 명령어가 시킨 대로 저장소를 먼저 뒤졌다

```
history/32-question-source-verification-report.md
history/33-question-source-verification.md
```

`history/33-question-source-verification.md` 5절 표에 지리 문항별 출처가 두 곳씩 있다. 예를 들어

```
| ge_01 | 면적 1,833.2㎢, 국내 최대 섬 | 한국민족문화대백과 「제주도」 | 위키백과 「제주도」 |
| ge_02 | 2020년 재측량 8,848.86m | CNN 2020-12-08 보도 | Kathmandu Post 2020-12-08 보도 |
| ge_03 | 1914년 개통, 두 대양 연결 | 브리태니커 「Panama Canal」 | HISTORY 「Panama Canal open to traffic」 |
```

4절 보고 — 자동 검사 결과와 사람 판단을 따로 적었다

```
[자동 검사]
위반 0건

[사람 판단]
걸린 것 1건

| id | 어긋나는 것 | 권고 문구 |
|---|---|---|
| ge_01 | 최상급 표현에 재는 기준이 문제 텍스트에 없다 (PRD 3.6절) | 우리나라에서 면적이 가장 큰 섬은 어디인가? |

해설이 근거를 대는가 — 지리 10문항 모두 통과. 연도나 수치, 원리를 댄다
선택지 위치 지칭 — 0건

[사실 확인]
지리 10문항은 33번 문서 5절에서 출처 두 곳씩 대조가 끝나 있다. 이 실행에서 다시 대조하지 않았다
33번이 지리에서 낸 조치는 ge_04 한 건(수치가 자료마다 갈림, 등급 선택)이다

문제 파일은 고치지 않았다.
```

---


## C판 — `consensus/r1-impl7.md` (260811-7 구현팀)

### 생성된 `.claude/commands/quiz-validate.md` 원문

````markdown
---
description: 문제 데이터를 규격에 대고 검증한다
argument-hint: "[카테고리] (생략하면 전체)"
---

<!-- 생성: 2026-08-17 17:10 KST -->

`questions.js`의 문제를 검증한다. 대상 범위는 `$ARGUMENTS`이며, 비어 있으면 전체를 본다.
카테고리는 `korean_history`, `science`, `geography`, `art_culture` 또는 한국사, 과학, 지리, 예술과 문화로 받는다.

**검증 기준을 새로 만들지 않는다.** 기준은 `spec/PRD.md`와 `history/12-question-guidelines.md`에 있다.

## 1. 자동으로 잡히는 것

`spec/PRD.md` 4.2절 2번의 검사 항목은 `script.js`의 `validateData()`가 이미 구현하고 있다.
**검사 로직을 다시 짜지 않는다.**

`script.js`는 브라우저용이라 통째로 읽으면 마지막 줄의 `document.addEventListener`에서
`ReferenceError`가 난다. 그래서 **상수와 검사 함수가 있는 앞부분(1~112행)만 떼어 돌린다.**
다음에 돌리는 사람이 같은 데서 막히지 않게 방법을 여기 적어 둔다.

```bash
node -e "
const fs = require('fs');
const q = fs.readFileSync('questions.js','utf8');
const s = fs.readFileSync('script.js','utf8').split('\n').slice(0,112).join('\n');
const m = { exports: {} };
new Function('module', q + '\n' + s + '\nmodule.exports = { validateData }')(m);
const errors = m.exports.validateData();
console.log(errors.length ? errors.join('\n') : '위반 0건');
"
```

행 번호는 `validateData`의 끝(`return errors;` 다음 줄의 `}`)까지다. 함수가 옮겨지면 이 숫자도 함께 고친다.

위반이 나오면 `id`와 항목을 그대로 옮긴다.

## 2. 사람이 봐야 하는 것

`spec/PRD.md` 3.6절 끝은 "위 세 규칙은 자동 검사로 판정할 수 없다"고 적었다.
그 셋이 이 표의 앞 세 줄이다.

| 볼 것 | 판정 기준 | 근거 |
|---|---|---|
| 정답이 하나로만 읽히는가 | 오답 셋이 모두 명백한 오답인가. 다른 해석이 가능하면 문제 텍스트에 조건이 밝혀져 있는가 | `spec/PRD.md` 3.6절 |
| 최상급 표현에 재는 기준이 있는가 | "가장 큰", "가장 높은"에 면적인지 인구인지, 해발인지 기저부터인지가 붙어 있는가. `ge_09`가 본보기 | `spec/PRD.md` 3.6절 |
| 시점과 범위가 한정되어 있는가 | 시점에 따라 달라지는 수치라면 해설에 기준 시점이 있는가. 지리적, 분류적 범위가 좁혀져 있는가. `ge_04`가 본보기 | `spec/PRD.md` 3.6절 |
| 선택지 위치를 지칭하지 않는가 | "위의", "첫 번째" 같은 표현이 문제나 해설에 없는가 | `spec/PRD.md` 2.1절 |

넷째 줄은 3.6절이 말한 "세 규칙"에 들지 않는다. 자동 검사도 잡지 못해 따로 넣었다.

교차 검증의 관점은 `history/12-question-guidelines.md`를 따른다.

## 3. 사실 확인 (규격에 없다)

- 해설의 연도, 수치, 인명은 **외부 출처 두 곳 이상으로 대조한다**
- **기억으로 판정하지 않는다**
- 출처가 갈리면 갈린 대로 적는다
- 확인하지 못한 것은 "미확인"으로 남긴다

## 4. 나눠서 병렬로 (규격에 없다)

문항이 많으면 몇 개씩 묶어 나누고 묶음을 병렬로 확인한다.
**각 묶음은 결과를 파일로 먼저 쓴다.**

```
.claude/tmp/quiz-validate/<카테고리>-<시작id>-<끝id>.md
```

`.gitignore`가 `.claude/*`를 무시하므로 저장소에는 남지 않는다.
묶음이 다 끝난 뒤 그 파일들을 읽어 하나로 모아 보고한다.

## 5. 보고 (규격에 없다)

- **문제 파일을 고치지 않는다.** 고칠지는 사람이 정한다
- 걸린 것이 없으면 "고칠 것 없음"이라고 적는다
- 걸린 것은 `id`, 무엇이 어긋나는지, 권고 문구 순으로 적는다
````

### 실행 — `/quiz-validate 지리`

1절 자동으로 잡히는 것

```
== 1절 자동 검사
위반 0건
```

2절 사람이 봐야 하는 것 — 표 네 줄로 지리 10문항 확인

```
걸린 것 1건

| id | 어긋나는 것 | 권고 문구 |
|---|---|---|
| ge_01 | 최상급 표현에 재는 기준이 문제 텍스트에 없다 (PRD 3.6절) | 우리나라에서 면적이 가장 큰 섬은 어디인가? |

정답 유일성 — 10문항 통과
시점과 범위 — 10문항 통과. ge_02는 해설에 2020년 재측량 시점, ge_04는 "남한에서"로 범위 한정
선택지 위치 지칭 — 0건
```

3절 사실 확인

```
미확인. 이 실행에서 외부 출처를 열지 않았다
```

4절 나눠서 병렬로

```
지리 10문항은 "문항이 많으면"에 해당하지 않는다고 보고 나누지 않았다. 묶음 파일 없음
```

5절 보고

```
문제 파일은 고치지 않았다.
```

---


## 세 판에서 갈린 자리 (사실만)

판단은 적지 않는다. 실행에서 드러난 것만 적는다.

| | A (`r1-impl5`) | B (`r1-review6`) | C (`r1-impl7`) |
|---|---|---|---|
| 자동 검사 실행 결과 | 위반 0건 | 위반 0건 | 위반 0건 |
| 쓴 실행 방법 | `vm.createContext` + `document` 스텁 | `vm.createContext` + `document` 스텁 | `script.js` 1~112행만 떼기 |
| 사람이 보는 표의 행 수 | 6 (별도로 규격 미구현 4행) | 3 + 2 (3.6절 셋과 그 밖 둘을 표로 나눔) | 4 (3.6절 셋 + 2.1절 하나) |
| `해설이 근거를 대는가` | 있음 | 있음 | **없음** |
| 길이 규칙(60자, 20자) | **있음.** 검사 함수가 안 덮는다고 표시 | 없음 | 없음 |
| 난이도, 정답 분포 | **있음** | 없음 | 없음 |
| 기존 검증 기록 조회 | 없음 | **있음.** 32번, 33번을 찾아 지리 출처 대조가 끝난 것을 확인 | 없음 |
| 사실 확인 결과 | 미확인 | 기존 기록으로 확인됨 | 미확인 |
| 병렬 묶음 | 네 개씩, 묶음 파일 3개 생성 | 없음 | 조건부("문항이 많으면"), 지리 10문항에서는 나누지 않음 |
| 자동 검사와 사람 판단 분리 | 절로 나뉨 | **보고 안에서 명시적으로 나눔** | 절로 나뉨 |
| 규격 밖 항목 표시 | `(규격 밖)` | 표시 없음 | `(규격에 없다)` |

세 판이 지리에서 낸 지적은 **셋 다 `ge_01` 한 건으로 같다.**

## 실행하며 확인된 것

- `.claude/tmp/quiz-validate/`는 `.gitignore`의 `.claude/*`에 걸려 저장소에 남지 않는다. A판이 만든 묶음 파일 셋은 커밋되지 않는다
- B판이 시킨 기존 기록 조회가 실제로 걸렸다. `history/32-…`와 `history/33-…`이 저장소에 있고, 33번 5절에 지리 문항별 출처가 두 곳씩 있다
- C판의 `1~112행` 방식은 행 번호에 의존한다. 함수가 옮겨지면 숫자를 함께 고쳐야 한다고 명령어 본문에 적혀 있다
