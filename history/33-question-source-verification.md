<!-- 생성: 2026-08-17 10:32 KST -->

# 40문항 외부 출처 교차 검증

- 작성: 검토 세션
- 대상: `questions.js` 40문항 전부 (`b95445a` 시점 저장소 판본)
- 계기: 구현 쪽 요청. 12번 3절이 **가장 큰 공백**으로 지목한 가이드라인 4번(교차 검증)을 실제로 실행했다
- 함께 볼 것: `history/12-question-guidelines.md`

## 0. 요약

- **40문항 전부 정답을 바꿀 것이 없다.** 사실 오류로 판정한 문항은 없다
- 조치는 **권고 1건, 선택 3건**이다. 넷 다 해설 문장이나 문항 표현의 문제이고 정답과는 무관하다
- 12번이 "자료에 따라 서술이 갈린다"고 적은 다섯 문항(`kh_07`, `kh_09`, `ac_10`, `ge_02`, `sc_10`)은 **다섯 다 현행 서술이 맞다.** 근거를 이 문서 4절에 남긴다
- 12번이 몰랐던 갈림이 하나 더 나왔다 — `ge_04`의 낙동강 길이다. 자료에 따라 510km와 521.5km로 갈리는데 **현행 서술이 정부 공식 수치 쪽이다**

12번은 이렇게 적었다.

> 검토 측도 40문항을 지식으로 대조했지 출처를 확인하지 않았다

**이 문서로 그 공백이 닫힌다.** 40문항 각각에 대해 서로 독립인 출처를 둘 이상 확인했고, 문항별 출처를 5절 표에 남겼다.

---

## 1. 방법

- 문항마다 **서로 독립인 출처를 둘 이상** 확인했다. 같은 기관의 다른 페이지는 하나로 셌다
- 우선순위는 이렇게 두었다
  1. 해당 분야의 관리 기관 — 국사편찬위원회, 국가유산청, 국립중앙박물관, 국립국악원, NASA, NOAA, USGS, CIA World Factbook, 소장 미술관
  2. 학술 백과 — 한국민족문화대백과사전, 브리태니커
  3. 위키백과 — 위 둘과 어긋나지 않을 때만 두 번째 출처로 셌다
- 나무위키는 **출처로 세지 않았다.** 검색 결과에 자주 걸렸으나 전부 제외했다

### 도구의 한계 — 무엇을 어떻게 봤는가

- 38문항은 **검색 결과 화면의 발췌**로 확인했다. 출처 기관의 문서 원문을 통째로 받아 읽은 것이 아니다
- 원문을 받아 읽은 것은 둘이다
  - 한국민족문화대백과사전 「낙동강」 — `ge_04`의 수치 갈림을 확인하려고
  - HyperPhysics(조지아주립대) 음속 표 — `sc_05`의 반례 수치를 확인하려고
- 발췌만으로는 **인용 맥락이 잘렸을 위험**이 남는다. 5절 표에 URL을 남겼으니 다투는 문항이 생기면 그 자리에서 원문을 받으면 된다

---

## 2. 조치

| # | 문항 | 항목 | 등급 |
|---|---|---|---|
| 1 | `sc_05` | 해설의 인과 서술에 반례가 있다 | **권고** |
| 2 | `kh_01` | 정답이 둘로 읽힐 여지가 있다 | 선택 |
| 3 | `ac_02` | 해설이 연작의 시작 시점을 아를로 적었다 | 선택 |
| 4 | `ge_04` | 수치가 자료마다 갈린다 | 선택 |

**필수는 없다.**

---

### 2.1 `sc_05` — 해설의 인과가 반례를 갖는다 (권고)

현행 해설이다.

> 소리는 입자가 **촘촘히 붙어 있을수록** 빠르게 전달되므로 고체에서 가장 빠르다

**정답(고체)은 맞다.** 걸리는 것은 근거다.

- 음속은 `v = √(E/ρ)` 로, 탄성률 `E`가 클수록 빨라지고 **밀도 `ρ`가 클수록 오히려 느려진다**
- 즉 "촘촘할수록 빠르다"는 인과가 뒤집혀 있다. 고체가 빠른 것은 촘촘해서가 아니라 **탄성률이 압도적으로 크기 때문**이고, 밀도는 그 효과를 깎는 쪽으로 작용한다
- 반례가 있다. HyperPhysics 표에서 **납(고체) 1,322m/s < 물(액체) 1,493m/s** 다. 납은 물보다 열 배 넘게 촘촘한데 소리는 더 느리다

이 프로젝트의 검토 규범에 정확히 걸리는 자리다.

> 결론과 근거를 따로 판단한다. 결론이 맞아도 근거가 틀렸으면 근거를 고치라고 한다. 틀린 전제가 남으면 나중에 그 전제로 다른 결정을 내릴 때 틀린다

- 2차 확대 때 이 전제로 "밀도가 높을수록 소리가 빠르다" 같은 문항을 만들면 **그 문항은 틀린 문항이 된다**
- 다만 초중등 교과서도 같은 수준의 설명을 쓰는 일이 있다. 대상 독자를 초중등으로 본다면 그대로 두는 판단도 성립한다. **그래서 필수가 아니라 권고다**
- 고칠 방법은 구현 쪽이 정하면 된다. 인과를 빼고 사실만 적는 것도 방법이다

### 2.2 `kh_01` — 정답이 둘로 읽힐 여지 (선택)

> 조선을 건국한 인물은 누구인가? — 이성계 / 이방원 / **정도전** / 왕건

- 표준 답은 이성계다. 여기에 이견이 없다
- 걸리는 것은 **정도전이 선택지에 있다**는 점이다. 우리역사넷과 지역문화 사전은 정도전을 "조선왕조의 설계자", "조선 건국을 기획하고 구현"한 인물로 적는다
- 아는 사람일수록 "건국한"을 "건국을 주도한"으로 읽어 정도전을 고를 수 있다. 오답을 유도하는 매력적인 선택지가 아니라 **다툼을 부르는 선택지**다
- 12번이 PRD 3.6절에 넣자고 한 가이드라인 1번(정답 유일성)의 실제 사례다. 40문항에서 이 규칙에 걸리는 유일한 문항이다
- 등급을 선택으로 둔 이유는, 상식 퀴즈 맥락에서 "건국한 인물"이 즉위한 사람을 가리킨다는 독법이 충분히 지배적이기 때문이다

### 2.3 `ac_02` — 연작의 시작 시점 (선택)

현행 해설이다.

> 반 고흐는 프랑스 아를에 머물던 1888년 무렵부터 「해바라기」 연작을 그렸다

- 「해바라기」는 **두 계열**이다. 파리 1887년 4점(땅에 놓인 해바라기)이 먼저이고, 아를 1888~89년 7점(화병에 꽂힌 해바라기)이 뒤다
- 유명한 쪽은 아를 계열이 맞다. 다만 "연작을 그렸다"의 시작 시점으로 읽으면 **1887년 파리가 먼저**여서 현행 문장은 부정확하다
- 정답(고흐)에는 영향이 없다. 해설 한 줄의 문제다

### 2.4 `ge_04` — 낙동강 길이가 자료마다 갈린다 (선택)

현행 해설은 "약 510킬로미터"다. 확인해 보니 자료가 갈린다.

| 출처 | 수치 |
|---|---|
| 국토교통부 한국하천일람 | 유로연장 **510.36km** (하천연장 400.7km) |
| 한국민족문화대백과사전 | 유로연장 **521.5km** |
| 위키백과 | 510km |

- **현행 서술이 정부 공식 수치 쪽이므로 고칠 이유는 없다.** 오히려 백과 쪽이 옛 측정치로 보인다
- 다만 "낙동강이 남한에서 가장 길다"는 **두 자료가 모두 같으므로 정답은 안전하다**. 한국민족문화대백과사전 원문도 "남한의 모든 하천 중에서 가장 길고"라고 적는다
- 남기는 이유는 12번 3절의 문제의식 그대로다. **나중에 "521.5km 아닌가"라는 지적이 오면 처음부터 다시 판단해야 한다.** 이 문서가 그 근거가 된다
- 12번의 "자료에 따라 갈리는 다섯 문항" 목록에 **여섯 번째로 이 문항을 더하기를 권한다**

---

## 3. 정답 유일성과 문항 간 중복 — 함께 본 것

12번 5절이 지적한 항목도 이번에 함께 봤다.

- **문항 간 중복은 없다.** 40문항에서 같은 사실을 다른 문장으로 묻는 쌍은 나오지 않았다
- **선택지의 정답 유일성은 `kh_01` 하나를 빼고 전부 안전하다.** 오답 선택지가 정답으로 읽히는 자리를 문항마다 확인했다. 특히 다음 넷은 헷갈릴 만해 따로 봤고, 넷 다 문제없다

| 문항 | 걸릴 만한 선택지 | 판정 |
|---|---|---|
| `kh_05` | 원균 — 한산도 대첩에 경상우수사로 참전했다 | 지휘한 장수는 이순신이다. 문제없다 |
| `kh_03` | 무열왕 — 백제를 멸망시켰다 | 통일 완성은 676년 문무왕이다. 문제없다 |
| `ac_06` | 승정원일기 — 역시 날짜순 기록이다 | 태조~철종 범위는 실록뿐이다. 문제없다 |
| `sc_05` | 진공 | 물질의 상태가 아니다. 문제없다 |

**최상급 기준은 12번 이후 개선되어 있다.** 12번이 "가장 걸린다"고 한 `ge_02`가 지금은 "**해발 기준으로** 세계에서 가장 높은 산"으로 되어 있어 해석이 갈리지 않는다. 12번이 본보기로 든 `ge_09` 방식이 적용된 것으로 보인다.

---

## 4. 12번이 남긴 다섯 문항 — 근거를 남긴다

12번 3절은 이 다섯을 "우리가 고른 쪽이 맞지만 **어느 근거로 골랐는지가 남아 있지 않다**"고 적었다. 그 근거를 여기 남긴다.

| 문항 | 현행 | 확인 결과 |
|---|---|---|
| `kh_07` | 1610년 완성 | **맞다.** 1610년 완성, 1613년 내의원 간행. 문항이 "지은 사람"을 묻는 이상 완성 시점이 맞다 |
| `kh_09` | 1485년 시행 | **맞다.** 세조 때 착수, 1466년 편찬 완료, 보완을 거쳐 1485년(성종 16) 반포, 시행. 문항이 "반포한 왕"을 묻는 이상 성종이 맞다 |
| `ac_10` | 1876년 작곡 | **맞다.** 1875년 여름 착수, 1876년 4월 22일 총보 완성, 1877년 3월 볼쇼이 초연. 문항이 "작곡한"을 묻는 이상 1876년이 맞다 |
| `ge_02` | 8,849m | **맞다.** 2020년 12월 8일 중국, 네팔 공동 발표 8,848.86m. 반올림해 8,849m |
| `sc_10` | 왓슨과 크릭 | **맞다, 다만 주의가 필요하다.** 1953년 네이처 발표는 왓슨과 크릭이고 1962년 노벨상은 윌킨스를 포함한 3인이다. 프랭클린의 기여는 2023년 네이처 기사가 "자료 제공자가 아니라 동등한 기여자"로 재평가했다. **현행 코드 주석의 판단은 여전히 유효하다** |

---

## 5. 문항별 확인 출처

문항마다 확인한 것과 출처 둘을 적는다. 셋 이상 본 문항은 대표 둘만 적었다.

### 한국사

| 문항 | 확인한 것 | 출처 1 | 출처 2 |
|---|---|---|---|
| `kh_01` | 1392년 이성계 즉위, 조선 건국 | [한국민족문화대백과 「태조」](https://encykorea.aks.ac.kr/Article/E0059033) | [우리역사넷 「태조 왕건」 대비 항목](https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_n312600) |
| `kh_02` | 1443년 창제, 1446년 반포 | [우리역사넷 「한글 창제와 훈민정음」](https://contents.history.go.kr/mobile/km/view.do?levelId=km_037_0070_0020_0010) | [위키백과 「훈민정음의 창제」](https://ko.wikipedia.org/wiki/훈민정음의_창제) |
| `kh_03` | 676년 기벌포 전투, 문무왕 통일 완성 | [한국민족문화대백과 「문무왕」](https://encykorea.aks.ac.kr/Article/E0019473) | [우리역사넷 「신라·당 전쟁」](https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i101220) |
| `kh_04` | 918년 궁예 축출, 고려 건국 | [한국민족문화대백과 「태조」](https://encykorea.aks.ac.kr/Article/E0059032) | [우리역사넷 「태조 왕건」](https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_n206200) |
| `kh_05` | 1592년 한산도 대첩, 학익진, 이순신 | [한국민족문화대백과 「한산도대첩」](https://encykorea.aks.ac.kr/Article/E0061676) | [위키백과 「한산도 대첩」](https://ko.wikipedia.org/wiki/한산도_대첩) |
| `kh_06` | 698년 동모산, 대조영 | [한국민족문화대백과 「고왕」](https://encykorea.aks.ac.kr/Article/E0003841) | [우리역사넷 「발해 건국」](https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i100800) |
| `kh_07` | 1610년 완성, 1613년 간행 | [국가유산청 국가유산포털](https://www.heritage.go.kr/heri/html/HtmlPage.do?pg=%2Funesco%2FMemHeritage%2FMemHeritage_07.jsp) | [한국민족문화대백과 「동의보감」](https://encykorea.aks.ac.kr/Article/E0016731) |
| `kh_08` | 1919년 3월 1일 서울 시작, 전국 확산 | [한국민족문화대백과 「3·1운동」](https://encykorea.aks.ac.kr/Article/E0026772) | [우리역사넷 「3·1독립만세 운동」](https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i400200) |
| `kh_09` | 세조 착수, 1485년 성종 반포, 시행 | [한국민족문화대백과 「경국대전」](https://encykorea.aks.ac.kr/Article/E0002296) | [국가유산청 「조선 문명의 틀, 경국대전」](https://www.cha.go.kr/cop/bbs/selectBoardArticle.do?nttId=14490&bbsId=BBSMSTR_1008&mn=NS_01_09_01) |
| `kh_10` | 1232년 최우, 강화 천도 | [한국민족문화대백과 「강화천도」](https://encykorea.aks.ac.kr/Article/E0001532) | [우리역사넷 「몽골의 고려침입」](https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i200800) |

### 과학

| 문항 | 확인한 것 | 출처 1 | 출처 2 |
|---|---|---|---|
| `sc_01` | 수소 2, 산소 1 | [브리태니커 「Water」](https://www.britannica.com/science/water) | [PubChem(미국 국립보건원) 「Water」](https://pubchem.ncbi.nlm.nih.gov/compound/Water) |
| `sc_02` | 1기압 100도 | [IAPWS(국제물성협회) FAQ](https://iapws.org/faq1/boil.html) | [위키백과 「Boiling point」](https://en.wikipedia.org/wiki/Boiling_point) |
| `sc_03` | 최대 행성, 지름 지구의 약 11배 | [NASA 「Jupiter Facts」](https://science.nasa.gov/jupiter/jupiter-facts/) | [ESA 「Facts about Jupiter」](https://www.esa.int/Science_Exploration/Space_Science/Juice/Facts_about_Jupiter) |
| `sc_04` | 빛에너지로 이산화 탄소와 물에서 양분 생성 | [위키백과 「광합성」](https://ko.wikipedia.org/wiki/광합성) | [KOCW 대학 강의자료 「식물의 광합성」](http://contents2.kocw.or.kr/KOCW/document/2017/cnue/parkheonwoo/5.pdf) |
| `sc_05` | 고체 > 액체 > 기체 | [PhysLink 「Why does sound travel faster in solids」](https://www.physlink.com/education/askexperts/ae20.cfm) | [HyperPhysics(조지아주립대) 음속 표](https://hyperphysics.gsu.edu/hbase/Tables/Soundv.html) |
| `sc_06` | 질소 78.08%, 산소 20.95% | [NASA Earthdata](https://www.earthdata.nasa.gov/topics/atmosphere/air-mass-density) | [NOAA 「The Atmosphere」](https://www.noaa.gov/jetstream/atmosphere) |
| `sc_07` | 적혈구 헤모글로빈의 산소 운반 | [미국 국립보건원 「Oxygen Transport」](https://www.ncbi.nlm.nih.gov/books/NBK54103/) | [MedlinePlus 「Hemoglobin」](https://medlineplus.gov/ency/imagepages/19510.htm) |
| `sc_08` | 원자 번호 1, 양성자 1개 | [영국 왕립화학회 주기율표 「Hydrogen」](https://periodic-table.rsc.org/element/1/hydrogen) | [Periodic Table One 「Hydrogen」](https://www.periodictable.one/element/1) |
| `sc_09` | 파장별 굴절률 차이에 의한 분산 | [브리태니커 「Prism」](https://www.britannica.com/technology/prism-optics) | [The Physics Classroom 「Dispersion of Light by Prisms」](https://www.physicsclassroom.com/class/refrn/lesson-4/dispersion-of-light-by-prisms) |
| `sc_10` | 1953년 왓슨, 크릭 이중 나선 발표 | [네이처 「What Rosalind Franklin truly contributed」](https://www.nature.com/articles/d41586-023-01313-5) | [Science History Institute 인물 해설](https://www.sciencehistory.org/education/scientific-biographies/francis-crick-rosalind-franklin-james-watson-and-maurice-wilkins/) |

### 지리

| 문항 | 확인한 것 | 출처 1 | 출처 2 |
|---|---|---|---|
| `ge_01` | 면적 1,833.2㎢, 국내 최대 섬 | [한국민족문화대백과 「제주도」](https://encykorea.aks.ac.kr/Article/E0051413) | [위키백과 「제주도」](https://ko.wikipedia.org/wiki/제주도) |
| `ge_02` | 2020년 재측량 8,848.86m | [CNN 2020-12-08 보도](https://www.cnn.com/travel/article/mount-everest-height-intl-hnk-scli) | [Kathmandu Post 2020-12-08 보도](https://kathmandupost.com/national/2020/12/08/it-s-official-mount-everest-is-8-848-86-metres-tall) |
| `ge_03` | 1914년 개통, 두 대양 연결 | [브리태니커 「Panama Canal」](https://www.britannica.com/topic/Panama-Canal) | [HISTORY 「Panama Canal open to traffic」](https://www.history.com/this-day-in-history/august-15/panama-canal-open-to-traffic) |
| `ge_04` | 유로연장 510.36km, 남한 최장 | [한국민족문화대백과 「낙동강」](https://encykorea.aks.ac.kr/Article/E0011565) (원문 확인, 521.5km) | [위키백과 「낙동강」](https://ko.wikipedia.org/wiki/낙동강) (510km) |
| `ge_05` | 시드니, 멜버른 경쟁의 타협지 | [호주 국립영상음향아카이브(NFSA)](https://www.nfsa.gov.au/collection/item/canberra-1913-naming-federal-capital-australia) | [호주 ACT 의회 「Establishing the nation's capital」](https://www.parliament.act.gov.au/visit-and-learn/learn/resources/fs/establishing-the-nations-capital) |
| `ge_06` | 최대 해양, 해수면의 약 46% | [NOAA Ocean Exploration](https://oceanexplorer.noaa.gov/ocean-fact/pacific-size/) | [NOAA Ocean Service 「largest ocean basin」](https://oceanservice.noaa.gov/facts/biggestocean.html) |
| `ge_07` | 아프리카 북부, 최대 더운 사막 | [브리태니커 「Sahara」](https://www.britannica.com/place/Sahara-desert-Africa) | [Live Science 「The Sahara: Earth's largest hot desert」](https://www.livescience.com/23140-sahara-desert.html) |
| `ge_08` | 1884년 그리니치 채택 | [영국 왕립그리니치박물관(RMG)](https://www.rmg.co.uk/stories/time/what-prime-meridian-why-it-greenwich) | [브리태니커 「Greenwich meridian」](https://www.britannica.com/place/Greenwich-meridian) |
| `ge_09` | 총면적 17,098,242㎢, 세계 1위 | [CIA World Factbook 러시아 항목](https://user.iiasa.ac.at/~marek/fbook/04/geos/rs.html) | [Worldometer 「Largest Countries by Area」](https://www.worldometers.info/geography/largest-countries-in-the-world/) |
| `ge_10` | 태평양 가장자리 화산대, 지진대 | [내셔널지오그래픽 「Plate Tectonics and the Ring of Fire」](https://education.nationalgeographic.org/resource/plate-tectonics-ring-fire/) | [USGS 「Pacific Ocean Subduction Zones」](https://www.usgs.gov/media/images/pacific-ocean-subduction-zones) |

### 예술과 문화

| 문항 | 확인한 것 | 출처 1 | 출처 2 |
|---|---|---|---|
| `ac_01` | 다빈치 작, 루브르 소장 | [브리태니커 「Mona Lisa」](https://www.britannica.com/topic/Mona-Lisa-painting) | [Art & Object 「A Brief History」](https://www.artandobject.com/news/mona-lisa-brief-history-da-vincis-famous-painting) |
| `ac_02` | 네덜란드 화가, 아를 1888~89년 7점 | [영국 내셔널갤러리 「Sunflowers」](https://www.nationalgallery.org.uk/paintings/vincent-van-gogh-sunflowers) | [호주 국립미술관 「The Seven Sunflowers」](https://nga.gov.au/stories-ideas/the-seven-sunflowers/) |
| `ac_03` | 고수의 북 반주와 추임새 | [국립국악원 국악사전 「고수」](https://www.gugak.go.kr/ency/topic/view/1575) | [한국민족문화대백과 「판소리」](https://encykorea.aks.ac.kr/Article/E0059663) |
| `ac_04` | 베토벤 교향곡 5번 c단조 op.67 | [브리태니커 「Symphony No. 5 in C Minor」](https://britannica.com/topic/Symphony-No-5-in-C-Minor-Op-67) | [BBC Classical Music 「Beethoven Fifth Symphony」](https://www.classical-music.com/features/works/beethoven-fifth-symphony) |
| `ac_05` | 「씨름」, 「서당」이 든 단원 풍속도첩 | [국립중앙박물관 소장품 「씨름」](https://www.museum.go.kr/site/main/relic/treasure/view?relicId=551) | [한국민족문화대백과 「김홍도 필 풍속도 화첩」](https://encykorea.aks.ac.kr/Article/E0013639) |
| `ac_06` | 태조~철종 25대 472년, 편년체 | [국사편찬위원회 조선왕조실록 소개](https://sillok.history.go.kr/intro/intro.do) | [한국민족문화대백과 「조선왕조실록」](https://encykorea.aks.ac.kr/Article/E0052160) |
| `ac_07` | 로미오와 줄리엣 1594~96, 햄릿 1599~1601 | [브리태니커 「William Shakespeare」](https://www.britannica.com/biography/William-Shakespeare/Romeo-and-Juliet) | [HISTORY 「William Shakespeare」](https://www.history.com/articles/william-shakespeare) |
| `ac_08` | 지베르니 연못, 약 250점, 말년 30여 년 | [메트로폴리탄미술관 「Water Lilies」](https://www.metmuseum.org/art/collection/search/437137) | [위키백과 「Water Lilies (Monet series)」](https://en.wikipedia.org/wiki/Water_Lilies_(Monet_series)) |
| `ac_09` | 1893년, 노르웨이 | [노르웨이 국립미술관(Nasjonalmuseet)](https://www.nasjonalmuseet.no/en/collection/object/NG.M.00939) | [스미스소니언 매거진 보도](https://www.smithsonianmag.com/smart-news/the-scream-gets-a-new-home-in-norways-650m-museum-180980233/) |
| `ac_10` | 1875년 착수, 1876년 완성, 1877년 초연 | [브리태니커 「Swan Lake」](https://www.britannica.com/topic/Swan-Lake-ballet-by-Tchaikovsky) | [Tchaikovsky Research 「Swan Lake」](https://en.tchaikovsky-research.net/pages/Swan_Lake) |

---

## 6. 남기는 참고 — 조치가 아니다

고칠 필요는 없다고 판단했으나, 나중에 지적이 들어올 수 있는 자리를 적어 둔다. **넷 다 교과 수준에서는 논란이 아니다.**

| 문항 | 자리 | 판단 |
|---|---|---|
| `sc_02` | 1기압 물의 끓는점은 ITS-90 기준 정확히는 99.974도다 | 상식 퀴즈 수준을 넘는다. 그대로 둔다 |
| `ge_08` | 현행 기준선(IERS)은 그리니치 천문대에서 약 102m 동쪽이다 | 문항이 "지나는 영국의 지역"을 묻으므로 답은 그대로 그리니치다 |
| `kh_06` | 698년 건국 당시 국호는 진(震)국이고 발해는 713년부터다 | 교과서 표준 서술이 "698년 발해 건국"이다. 그대로 둔다 |
| `ac_04` | "운명이 문을 두드린다"는 신들러의 전언이라 신빙성이 의심된다 | 현행 해설이 "비유되어 그렇게 불린다"로 적어 베토벤의 말로 단정하지 않았다. 문제없다 |

---

## 7. 2차 확대에 넘기는 것

- 12번 8절의 조치 2, 3번(PRD 3.6절과 계획서 1.8절 보강)은 **그대로 유효하다.** 이 문서는 그 규칙이 없던 상태에서 만들어진 40문항을 사후 검증한 것이지, 규칙을 대신하지 않는다
- 12번의 "자료에 따라 갈리는 문항" 목록에 **`ge_04`를 여섯 번째로 더하기를 권한다**
- 이번 검증에 든 품은 40문항에 검색 40여 회다. 2차에서 문항이 늘면 같은 비율로 늘어난다. **문항을 쓰면서 출처를 함께 적어 두는 편이 사후에 몰아서 대조하는 것보다 싸다**

## 8. 확인하지 않은 채 닫는 것

- 5절 출처 대부분은 **검색 결과 발췌**로 봤다. 원문을 통째로 읽은 것은 두 건뿐이다(1절)
- 「모나리자」의 현재 전시 위치처럼 시점에 의존하는 서술은 오늘 기준으로만 맞다. 12번이 `ac_01`에 대해 적은 판단(실무 위험이 낮다)을 그대로 따른다
