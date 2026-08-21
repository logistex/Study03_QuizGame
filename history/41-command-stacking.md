<!-- 생성: 2026-08-21 13:19 KST -->

# 41번 — 슬래시 명령어를 한 줄에 잇는 것

36번이 "`&&` 체이닝 안 됨"으로 닫아 둔 것을 다시 열었다. 결론이 두 번 뒤집혔고,
마지막에 갈린 것은 **데스크톱 앱이냐 터미널 CLI냐**였다.

## 1. 공식 문서가 정한 것

[명령어 레퍼런스](https://code.claude.com/docs/en/commands)의 원문이다.

> A command is only recognized at the start of your message. Text that follows the command name
> becomes its arguments. As of v2.1.199, skills are the exception: a skill invocation followed by
> more skills, such as `/skill-a /skill-b do XYZ`, loads every skill named at the start and passes
> the trailing text to each as arguments. Up to six skills can be chained.

정리하면 이렇다.

- 잇는 기호는 **공백**이다. `&&`는 문서 어디에도 없다
- 슬래시 이름을 **앞에 몰아서** 적고 인수는 맨 뒤에 한 번 적는다
- 그 인수가 **모두에게 같이** 간다
- 최대 여섯 개다
- `v2.1.199`부터다

교재는 `&&`로 잇는 방식을 가르친다. 클로드 코드에 그런 기능이 없다.

## 2. 돌려서 확인한 것

데스크톱 앱에서 다섯 가지 모양을 쳤다. **다섯 다 안 풀렸다.**

| 친 것 | 결과 |
|---|---|
| `/quiz-stats 지리 && /quiz-validate 지리` | 뒤가 통째로 인수 |
| `/sibling-check && /quiz-stats` | 같음 |
| `/quiz-stats 지리 /quiz-validate 한국사` | 같음. `지리`에서 멈춘 것으로 설명됨 |
| `/quiz-stats /quiz-validate 지리` | **문서대로인데 안 풀림** |
| `/sibling-check /skill-check` | **스킬 둘인데 안 풀림** |

터미널 CLI에서는 갈렸다.

| 어디 | 한 줄에 둘 | 결과 |
|---|---|---|
| CLI 대화식 | `/sibling-check /skill-check 가 나` | **풀림.** 둘 다 실행되고 둘 다 `가 나`를 받음 |
| CLI 대화식 | `/quiz-stats /quiz-validate 지리` | **풀림.** `.claude/commands/`의 명령어 둘도 같음 |
| CLI 대화식 | `/sibling-check && /skill-check 가 나` | **안 풀림.** `&&` 뒤가 통째로 인수 |
| CLI `-p` | 공백으로 이은 줄 | 안 풀림. 뒤가 인수 |
| 데스크톱 앱 | 공백으로 이은 줄 | 안 풀림 |

문서는 스택을 "skills are the exception"으로 적는데, `.claude/commands/`에 둔 명령어도
그 예외에 든다. 통합되었다는 서술과 맞는다.

**`&&`는 어디서도 안 된다.** 셸의 부호이지 슬래시 명령의 부호가 아니다. 교재가 가르치는
방식이 이것인데, 클로드 코드에는 그런 기능이 없다.

CLI 대화식에서 `skill-check`이 찍은 표다. 인수가 **둘 다에게** 갔다.

| 표기 | 들어온 값 |
|---|---|
| `$ARGUMENTS` | `가 나` |
| `$0` | `가` |
| `$1` | `나` |
| `$2` | `$2` (치환 안 됨) |

`sibling-check`에는 `$ARGUMENTS`가 없다. 그래서 본문 끝에 `ARGUMENTS: 가 나` 한 줄이 덧붙었다.
이것도 문서에 있다 — "If you invoke a skill with arguments but the skill doesn't include
`$ARGUMENTS`, Claude Code appends `ARGUMENTS: <your input>` to the end of the skill content."
**인수를 받을 자리를 안 적어 두면 사라지는 것이 아니라 끝에 붙는다.**

`-p`는 슬래시를 아예 안 읽는 것이 아니다. `claude -p "/skill-check 가 나"`는 펼쳐졌고
인수도 치환되었다. **하나는 펼치고 둘은 안 펼친다.**

## 3. 판본

| 무엇 | 판본 |
|---|---|
| 터미널 `claude` | `2.1.233` |
| 데스크톱 앱 `Claude.app` | `1.34493.0` |

체계가 달라 직접 견줄 수 없다. 데스크톱 앱이 제 빌드를 안고 있고, 그 빌드가
`v2.1.199`의 스택을 아직 담지 않은 것으로 보인다. **추정이고 확인하지 않았다.**

## 4. 아직 확인하지 않은 것

- 여섯을 넘기면 어떻게 되는지
- 데스크톱 앱이 어느 판본을 안고 있는지

## 5. 이 프로젝트에 무슨 뜻인가

**노트 작업은 데스크톱 앱에서 한다.** 그러므로 5.2.6의 체이닝은 지금 환경에서 성립하지 않는다.

- `/quiz-add`, `/quiz-validate`, `/quiz-stats`를 **줄마다 따로 친다.** 막히는 것은 없다
- `/quiz-daily`를 만든다면 `&&`로 묶는 것이 아니라 **본문에 순서를 적어 두는 방식**이 된다
- 교재와 갈리는 자리가 하나 더 늘었다. 교재의 `&&`는 CLI에서도 문서에 없는 방식이다

## 6. 오늘 판단이 흔들린 자리

기록해 둔다. 같은 실수가 되풀이될 자리다.

1. 36번의 결론을 그대로 받았다. 그것이 데스크톱만 본 것인 줄 몰랐다
2. 문서를 읽고 "된다"로 뒤집었다. 문서가 어느 환경을 적은 것인지 확인하지 않았다
3. 사용자가 CLI 기록을 보여 주었을 때 `❯` 두 줄을 따로 친 것으로 읽었다. 한 줄이 갈라진 것이었다

셋 다 **확인하지 않고 읽은 것**이다. 31번 4.3절이 지목한 자리와 같다.
