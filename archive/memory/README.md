<!-- 생성: 2026-08-17 10:54 KST -->

# 자동 메모리 스냅샷

- 뜬 시점: 2026-08-17 10:54 KST
- 원본 위치: `~/.claude/projects/<프로젝트>/memory/`
- 뜬 이유: 강의 노트 5.2.1에서 실물을 보여 주기 위해. 원본은 클로드가 세션마다 고쳐 쓰므로 이 폴더가 그 시점의 모습을 붙들어 둔다

## 이 스냅샷에 담긴 것

| 파일 | 유형 | 무엇을 기억한 것인가 |
|---|---|---|
| `how-to-address-user.md` | user | 사용자를 "신 교수"로 부른다 |
| `note-request-work-separation.md` | feedback | 논의 중에 앞질러 파일을 고치지 않는다 |
| `review-output-hides-process.md` | feedback | 산출물에 학생이 재현할 수 없는 과정을 넣지 않는다 |
| `summary-in-outline-style.md` | feedback | 요약은 개조식으로, 20~30줄로 |
| `quiz-project-working-rules.md` | project | 인계 문서 먼저 읽기, 규격 동결, 브라우저 자동화 한계, 캐시, 노션 편집 |
| `MEMORY.md` | — | 색인. 한 줄에 한 건 |

## 이 시점에 낡아 있던 것

`quiz-project-working-rules.md`에 두 군데가 사실과 어긋나 있다. **일부러 고치지 않고 그대로 떴다.**

| 적혀 있던 것 | 실제 |
|---|---|
| 최신 인계 문서가 `history/17-session-handoff.md` | 1차 구현이 끝나 31번까지 있고, 33번도 올라왔다 |
| 미리보기 서버 캐시는 "포트를 바꾸는 것이 유일하게 통한다" | `serve.py`가 `no-store` 헤더를 붙이는 방식으로 바뀌었다 |

- 자동 메모리는 **쓴 시점의 사실**이다. 시간이 지나면 어긋나므로 그대로 믿지 말고 확인해야 한다
- 원본은 이 스냅샷을 뜬 직후에 고쳤다. 그래서 "고치기 전"은 이 폴더에, "고친 뒤"는 원본에 있다
