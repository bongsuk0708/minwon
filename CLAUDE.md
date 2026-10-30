# 이 폴더 규칙 (bongsuk0708/minwon — 본에코 현장 앱 모음)

이 폴더는 깃허브 저장소 `bongsuk0708/minwon` 입니다. 올리면 1~2분 뒤 https://bongsuk0708.github.io/minwon/ 에 바로 반영됩니다.
Claude는 아래 순서를 **반드시** 지킨다. 사용자는 "고쳐서 올려줘" 한마디만 한다.

## 1. 고치기 전에 — 항상 최신판 받기
```
git pull
```
- 깃허브에는 본에코(boneco-co)가 올린 수정도 섞여 있다. 받지 않고 고치면 그 수정이 사라진다.
- **깃허브 웹 "Add files via upload"로 올리지 않는다.** 옛 파일로 통째로 덮어써서 다른 사람 수정이 지워진다.

## 2. 고치기
| 앱 | 파일 | 저장 위치(Firebase minwon-c29c2) |
|---|---|---|
| 수거관리 | `index.html`, `field/index.html` | minwon/ |
| 사고관리(민원·사고재해예방) | `report/index.html`, `report/field/index.html` | report/ |
| 계근 전표 | `gyegeun/index.html`, `gyegeun/pc/index.html` | gyegeun/ |
| 위험성평가 | `risk/index.html` | risk/ |

### 지우면 안 되는 줄 (지우면 앱이 멈춤)
- `[10_29 보안]` 이 붙은 줄 = 보이지 않는 자동 로그인. 사고관리(report)는 저장소 규칙이 "로그인한 앱만"이라 이 줄이 없으면 자료를 못 읽고 저장도 안 된다. 다른 앱도 지우지 말고 그대로 둔다.
  - Firebase 프로그램을 쓰는 화면: `firebase-auth-compat.js` 스크립트 줄과 `firebase.initializeApp(...)` 바로 아래 한 줄
  - 주소로 직접 읽고 쓰는 화면(계근·위험성평가): `<head>` 바로 아래 `<script>/* [10_29 보안] ...` 블록
- `report/index.html` 의 `id="mw-sw"` = 본에코 민원처리앱 전환 버튼 (지금은 "테스트 중" 안내만 뜸)

### 버전 번호
- 계근(`gyegeun/index.html`)은 `id="verLine"` 의 `vNN` 과 `const APP_VER = 'vNN'` 을 **둘 다 같이 1 올려야** 현장 폰이 새 화면으로 바뀐다.

## 3. 올리기
```
git add -A
git commit -m "무엇을 고쳤는지 한 줄"
git pull --rebase
git push
```
- `git pull --rebase` 에서 같은 줄을 서로 다르게 고쳤다는 충돌이 나면 **올리지 말고** 사용자에게 알린다.
- 올린 뒤 확인: `grep -c "10_29 보안\|bn_anon" <고친 파일>` 이 0이 아니어야 한다 (자동 로그인 줄이 남아 있는지).

## 참고
- 저장소(Firebase) 규칙: report(사고관리)만 로그인한 앱만, minwon·gyegeun·risk·gyegeun2·undong = 누구나 (10/30 계근 엑셀이 못 읽어서 사고관리만 남기고 다시 엶). 규칙을 바꿀 땐 본에코와 먼저 상의.
- 새 앱을 만들어 다른 저장 위치(예: `newapp/`)를 쓰면 규칙에 추가해야 저장된다 → 본에코에 알려 주기.

## 앱별 방 (대화방 정리)
| 방 | 앱 규칙 | 수정기록 |
|---|---|---|
| 통합 (전체 관리) | 이 파일 | 각 앱 수정기록을 모아 봄 |
| 사고관리 | `report/CLAUDE.md` | `report/수정기록.md` |
| 계근 | `gyegeun/CLAUDE.md` | `gyegeun/수정기록.md` |
| 위험성평가 | `risk/CLAUDE.md` | `risk/수정기록.md` |

- 어느 방에서든 앱을 고치면 **그 앱의 `수정기록.md` 맨 위에 한 줄** (날짜 | 무엇을 | 누가 요청) 을 추가하고 같이 올린다.
- 고치기 전에 그 앱의 `CLAUDE.md` 와 `수정기록.md` 를 먼저 읽고 이어서 작업한다.
- 통합방에서 "요즘 뭐 고쳤어?" 하면 세 수정기록을 모아 보여 준다.
- 휴대폰(클라우드)에서 고칠 때도 같은 규칙. 클라우드는 새 브랜치로 올리기 쉬우니 **main 에 바로 올린다** (그래야 사이트에 반영됨).
