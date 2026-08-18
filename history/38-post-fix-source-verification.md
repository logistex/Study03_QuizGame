<!-- 생성: 2026-08-18 22:32 KST -->

# 고친 해설에 들어간 새 사실의 출처 대조

- 대상: 2026-08-17 `402c70b`부터 `cadbed3`까지의 수정으로 해설에 새로 들어간 사실 다섯
- 방법: 문항마다 서로 다른 출처 두 곳 이상 대조
- 작성: 구현 세션
- 판본: `cadbed3` 시점 `questions.js`

## 0. 이 문서를 쓰는 이유

`/quiz-validate`를 40문항에 돌려 여덟 건을 고쳤다. 고치면서 해설에 **새 사실을 넣었는데 그것들은 대조를 거치지 않았다.**

- 33번 문서의 대조 기록은 `b95445a` 시점 판본을 본 것이다
- 이번 수정으로 그 기록이 덮지 못하는 문장이 다섯 생겼다
- 명령어의 규칙대로면 그대로 둘 경우 "미확인"으로 남겨야 한다

**검증이 한 번으로 닫히지 않는다는 것이 이 문서의 요지다.** 고치면 고친 것을 다시 검증해야 한다.

## 1. 대조 결과

다섯 다 확인되었다. 갈리는 것은 없다.

| `id` | 새로 들어간 사실 | 출처 1 | 출처 2 |
|---|---|---|---|
| `ac_06` | 사관이 적은 사초를 왕이 죽은 뒤 모아 엮음, 유네스코 세계기록유산 | [국가유산포털 「조선왕조실록」](https://www.heritage.go.kr/heri/html/HtmlPage.do?pg=%2Funesco%2FMemHeritage%2FMemHeritage_02.jsp&pageNo=5_1_2_0) | [대한민국 정책브리핑 「유네스코 등록, 조선왕조실록」](https://www.korea.kr/briefing/policyBriefingView.do?newsId=80082124) |
| `kh_07` | 조선과 중국의 의서를 두루 모아 엮음 | [한국민족문화대백과 「동의보감」](https://encykorea.aks.ac.kr/Article/E0016731) | [국가문화유산포털 국보 동의보감](http://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaCpno=1111103190300) |
| `ge_07` | 남극이 세계에서 가장 넓은 사막 | [National Geographic Education 「Deserts」](https://education.nationalgeographic.org/resource/deserts/) | [Discover Wildlife 「The world's largest desert」](https://www.discoverwildlife.com/environment/largest-desert-in-the-world) |
| `sc_05` | 소리는 진공에서 전달되지 않음 | [브리태니커 「How Does Sound Travel」](https://www.britannica.com/science/How-Does-Sound-Travel) | [Physics Catalyst 「Why Sound Cannot Travel in Vacuum」](https://physicscatalyst.com/article/why-sound-cannot-travel-in-vacuum/) |
| `sc_02` | 100도에서 액체와 기체가 함께 있을 수 있음 | [OpenStax Chemistry 2e 10.4 Phase Diagrams](https://openstax.org/books/chemistry-2e/pages/10-4-phase-diagrams) | [Chemistry LibreTexts 「Phase Diagrams for Pure Substances」](https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Equilibria/Physical_Equilibria/Phase_Diagrams_for_Pure_Substances) |

## 2. 덧붙일 것

- **`ac_06`** — 실록은 다음 왕이 즉위한 뒤 실록청을 열어 편찬했고, 사초는 왕도 볼 수 없었다. 1997년 10월 세계기록유산에 등재되었다
- **`kh_07`** — 백과사전이 "조선과 중국에 유통되던 의서와 임상의학적 체험을 통한 치료법을 엮어놓은"으로 적는다. 현행 해설이 그 서술과 맞는다
- **`ge_07`** — 남극 약 1,420만 제곱킬로미터, 사하라 약 920만 제곱킬로미터다. 북극이 약 1,370만으로 둘째이고 사하라는 셋째다. 사막의 정의가 연 강수량 250밀리미터 미만이라 극지가 사막에 든다
- **`sc_05`** — 소리는 역학파라 매질이 있어야 한다. 예외는 알려져 있지 않다
- **`sc_02`** — 끓는점은 액체의 증기압이 외부 압력과 같아지는 온도이고, 그 선 위에서 액체와 기체가 평형으로 공존한다

## 3. 이 라운드에서 사라진 갈림

`kh_07`의 1610년과 1613년 갈림이 없어졌다. **연도를 뺐기 때문이다.**

- 문항이 묻는 것은 지은 사람이라 연도가 정답의 근거가 아니었다
- 갈리는 값을 쓰지 않는 것이 갈림을 판정하는 것보다 싸다
- `ge_02`와 `ge_04`는 수치 자체가 답의 근거라 같은 방법을 쓸 수 없다. 그쪽은 판단 근거를 주석으로 남겼다

남은 갈림은 다섯이다 — `kh_09`, `ac_10`, `ge_02`, `sc_10`, `ge_04`.

## 4. 다음 검증이 쓸 것

이 문서를 인용할 때는 **`cadbed3` 시점 판본을 본 기록**이라고 적는다. 그 뒤 `questions.js`가 바뀌면 바뀐 문장은 이 기록이 덮지 못한다.

33번 문서와 이 문서를 함께 보면 40문항의 대조 이력이 이어진다.

| 문서 | 판본 | 범위 |
|---|---|---|
| [33번](33-question-source-verification.md) | `b95445a` | 40문항 전부 |
| 이 문서 | `cadbed3` | 그 뒤 해설에 새로 들어간 사실 다섯 |
