---
name: quiz-project-working-rules
description: "Study03_QuizGame 작업 규칙 — 인계 문서를 먼저 읽고, 규격 동결과 노션 편집 규칙을 지킨다"
metadata: 
  node_type: memory
  type: project
  originSessionId: 1172856e-65bd-4938-9484-4355b888f8a4
  modified: 2026-08-15T12:22:01.093Z
---

이 프로젝트를 이어서 할 때는 `history/`의 가장 큰 번호 인계 문서를 먼저 읽는다. 2026-08-15 기준으로 [[history/17-session-handoff.md]]이며, 진행 상황과 열린 항목, 작업 규칙이 모두 거기 있다.

**Why:** 『바이브 코딩』 5장 실습이라 검토를 주고받은 기록 자체가 결과물이다. 세션이 바뀌어도 규칙이 끊기면 기록이 어긋난다.

**How to apply:**
- 2단계부터 6단계까지 PRD를 고치지 않는다. 예외는 코드와 규격이 어긋난 것을 발견했을 때뿐이다
- 브라우저 자동화가 키 이벤트의 기본 동작을 일으키지 못한다. 초점 이동까지만 확인하고 누르는 것은 사용자에게 맡긴다
- 미리보기 서버가 `script.js`를 캐시한다. 포트를 바꾸는 것이 유일하게 통한다
- 노션 편집은 탭 들여쓰기를 원문 그대로 맞추고, 넣은 뒤 이웃 블록이 그대로인지 확인한다. 확인을 빠뜨려 블록을 잃은 적이 있다

[[summary-in-outline-style]]
