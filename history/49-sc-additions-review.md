<!-- 생성: 2026-08-21 20:45 KST -->

# 과학 추가 5문항 판정 의견서

- 작성: `Downloads/PRD 검토` 폴더의 검토 세션. **`42`, `46`번을 쓴 세션과 같다.** 앞머리 이름으로 세지 말고 커밋으로 판정할 것(`spec/IMPL-PLAN.md` 1.8절)
- 대상: `6c82e79` 시점의 `sc_11`~`sc_15`
- 방법: `.claude/commands/quiz-validate.md`를 `gh api`로 받아 지시대로 밟았다. 이 세션은 주 작업 폴더가 저장소 밖이라 슬래시로 부르지 못한다
- 멈추는 선: `history/48-kh14-close.md` 2절이 채택한 것을 그대로 적용했다

## 0. 요약

- **필수 없음. 권고 없음. 선택 1건.**
- 다섯 문항의 사실을 열둘로 갈라 각각 출처 둘 이상으로 댔다. 어긋나는 것이 없다
- 자동 검사 위반 0건, 분포 15문항 기준으로 맞음, 최상급 표현과 선택지 위치 지칭과 문항 간 중복 각 0건
- 덤으로 확인한 것 — **33번이 낸 `sc_05` 권고가 반영되어 있다**(3절)

---

## 1. 자동 검사

명령어 1절의 실행 줄을 그대로 썼다. 행 번호로 파일을 자르지 않았다.

```
위반 0건
```

## 2. 사실 대조 — 사실 하나가 단위

문항이 아니라 사실을 단위로 갈랐다(`spec/IMPL-PLAN.md` 1.8절).

| 문항 | 사실 | 출처 1 | 출처 2 |
|---|---|---|---|
| `sc_11` | 규모는 지진의 절대적 크기, 하나의 지진에 하나 | [한국지질자원연구원 「지진규모」](https://www.kigam.re.kr/menu.es?mid=a40302020000) | [위키백과 「지진 규모」](https://ko.wikipedia.org/wiki/지진_규모) |
| `sc_11` | 진도는 지점마다 다르다 | [국토안전관리원 「규모-진도관계」](https://www.kalis.or.kr/wpge/m_187/info/info0603.do) | [한국지질자원연구원](https://www.kigam.re.kr/menu.es?mid=a40302020000) |
| `sc_12` | 승화는 고체에서 액체를 거치지 않고 기체로 | [USGS 「dry ice sublimates directly a vapor」](https://www.usgs.gov/media/images/frozen-carbon-dioxide-dry-ice-sublimates-directly-a-vapor) | [ScienceDirect 「dry ice sublimation temperature」](https://www.sciencedirect.com/science/article/pii/S0735193323004311) |
| `sc_12` | 드라이아이스 승화점 영하 78.5도 | 위와 같음 | 위와 같음 |
| `sc_13` | 관성은 밖의 힘이 없으면 운동 상태를 지키려는 성질 | [NASA 「Newton's Laws of Motion」](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/newtons-laws-of-motion/) | [위키백과 「관성」](https://ko.wikipedia.org/wiki/관성) |
| `sc_13` | 뉴턴 운동 제1법칙이 이것을 정한다 | [NASA](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/newtons-laws-of-motion/) | [위키백과 「관성」](https://ko.wikipedia.org/wiki/관성) |
| `sc_14` | 25도 순수한 물은 수소 이온과 수산화 이온의 양이 같다 | [Chemistry LibreTexts 「Temperature Dependence of the pH of pure Water」](https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Acids_and_Bases/Acids_and_Bases_in_Aqueous_Solutions/The_pH_Scale/Temperature_Dependence_of_the_pH_of_pure_Water) | [ChemKey 「The Ionic Product of Water」](https://shout.education/ChemKey/physical/acidbaseeqia/kw.html) |
| `sc_14` | 그때 pH가 7이고 7보다 낮으면 산성, 높으면 염기성 | 위와 같음 | 위와 같음 |
| `sc_15` | 멘델레예프가 1869년에 발표 | [AIP 「A look at the first published periodic table」](https://www.aip.org/library/a-look-at-the-first-published-periodic-table) | [ASBMB 「A brief history of the periodic table」](https://www.asbmb.org/asbmb-today/science/020721/a-brief-history-of-the-periodic-table) |
| `sc_15` | 원자량 순으로 늘어놓아 성질이 주기적으로 되풀이됨을 보임 | [AIP](https://www.aip.org/library/a-look-at-the-first-published-periodic-table) | [ASBMB](https://www.asbmb.org/asbmb-today/science/020721/a-brief-history-of-the-periodic-table) |
| `sc_15` | 빈칸에 들어갈 원소의 성질을 예측 | [위키백과 「Mendeleev's predicted elements」](https://en.wikipedia.org/wiki/Mendeleev%27s_predicted_elements) | [ASBMB](https://www.asbmb.org/asbmb-today/science/020721/a-brief-history-of-the-periodic-table) |

`sc_13`의 해설 문장은 [위키백과 「관성」](https://ko.wikipedia.org/wiki/관성)의 정의와 거의 같은 어순이고, 그 문서가 **버스 급정거를 관성의 예로 그대로 들고 있다.** 문항과 해설이 같은 자료 위에 서 있다.

### 갈리는 자료

없었다. 다섯 문항 열두 사실 모두 출처들이 같은 것을 적는다.

---

## 3. 정답 유일성과 선택지

다섯 다 오답 셋이 명백하다. 헷갈릴 만한 자리를 따로 봤다.

| 문항 | 걸릴 만한 선택지 | 판정 |
|---|---|---|
| `sc_11` | 진도 | 문항이 "절대적 크기"라 못박아 갈린다. 진앙, 진원은 값이 아니라 위치다 |
| `sc_12` | 기화 | 기화는 액체에서 기체다. 문항이 "액체를 거치지 않고"라 적었다 |
| `sc_15` | 돌턴 | 원자설이지 주기율표가 아니다. 마이어는 선택지에 없다 |

`sc_15`에 한 가지 적어 둔다. 로타어 마이어가 비슷한 시기에 독립적으로 유사한 표를 만들었으나 **선택지에 없으므로 정답 유일성에 걸리지 않는다.** 문항이 "원자량 순"이라 적은 것도 정확하다. 현대 주기율표는 원자 번호 순이고, 그 전환은 멘델레예프 이후의 일이다.

---

## 4. 선택 1건 — `sc_12` 승화점의 압력 조건

해설이 이렇게 적는다.

> 드라이아이스의 승화점은 영하 78.5도다.

**이 값은 1기압에서의 값이다.** 압력이 달라지면 달라지고, 2절에 든 ScienceDirect 논문이 바로 그 의존성을 다룬다.

같은 카테고리 안에서 처리가 갈린다.

| | 조건 |
|---|---|
| `sc_02` | 문항에 **"1기압에서"**를 명시 |
| `sc_12` | 해설에 조건 없음 |

**다만 고칠 것으로 보지 않는다.** 48번이 채택한 선을 대었다.

> 정답 판정을 바꾸지 않고, 읽는 사람을 틀린 결론으로 이끌지 않으면 고치지 않는다.

- 정답은 `승화`이고 조건이 붙든 말든 바뀌지 않는다
- 대기압이 일상의 기본값이라 조건 없이 읽어도 틀린 결론에 이르지 않는다
- 교과와 사전이 조건 없이 영하 78.5도로 적는 것이 보통이다

그래서 **선택**이다. 카테고리 안의 서술을 고르게 맞추고 싶을 때만 손대면 된다.

---

## 5. 덤으로 확인한 것 — 33번 권고가 반영되어 있다

이번 검토 대상은 아니나 화면에 걸려 적어 둔다.

`history/33-question-source-verification.md` 2.1절이 `sc_05` 해설의 인과 서술을 권고로 지적했다. 당시 문장은 이랬다.

> 소리는 입자가 **촘촘히 붙어 있을수록** 빠르게 전달되므로 고체에서 가장 빠르다

지금은 이렇다.

> 소리는 대체로 고체에서 가장 빠르고 기체에서 가장 느리며, 진공에서는 전달되지 않는다.

**인과가 빠지고 사실만 남았다.** 33번이 든 반례(납 1,322m/s < 물 1,493m/s)와 부딪히지 않는다.

최상급 기준도 세 문항에 들어갔다. `sc_03`은 "지름이", `sc_05`는 "일반적으로", `sc_06`은 "부피 기준으로"다. 33번과 12번이 암묵이라 지적한 자리다.

---

## 6. 분포

| | 실제 | 기준 |
|---|---|---|
| 난이도 초급/중급/고급 | 6 / 6 / 3 | 6 / 6 / 3 |
| 정답 인덱스 0~3 | 4 / 4 / 4 / 3 | 각 3 이상 4 이하 |

새 다섯이 초급 2, 중급 2, 고급 1로 들어와 비율이 유지됐다. 한국사 15문항과 같은 모양이다.

---

## 7. 확인하지 않은 것

- **`prd-69` 세션의 판정을 보지 않고 썼다.** 서로 결과를 보기 전에 각자 돌리라는 요청을 지켰다
- `sc_01`~`sc_10`은 이번 대상이 아니다. 5절은 화면에 걸려 적은 것이지 대조한 것이 아니다
- 브리태니커 「inertia」 항목은 403으로 받지 못해 NASA와 위키백과로 대신했다
- `sc_12`의 승화점을 **NIST 같은 표준 기관 자료로는 확인하지 못했다.** USGS와 학술 논문, 교육 자료가 모두 영하 78.5도로 일치해 그것으로 갈음했다

## 8. 닫히는가

이 세션 판단으로는 **선택 1건뿐이므로 닫아도 된다.** 다만 `spec/IMPL-PLAN.md` 1.8절이 서로 다른 두 세션의 판정을 요구하므로, `prd-69`의 결과가 나온 뒤 구현 쪽이 세면 된다.

두 판정이 갈리면 그 자리가 이 실습에서 값어치 있는 자료가 된다. 앞선 왕복에서 이미 그랬다.
