# Blockgrid 디자인 시스템

종이 같은 바탕에 1px 헤어라인으로 칸을 나누고, 색은 굵은 도형 블록에만 쓰는 디자인 시스템입니다.
미리보기는 `index.html`을 브라우저로 열면 됩니다.

## 구성

| 경로 | 내용 |
|---|---|
| `tokens/tokens.css` | CSS 변수 (색, 글꼴, 크기, 그리드, 모서리) |
| `tokens/tokens.json` | 같은 토큰의 JSON 버전과 블록·도형 색 짝 |
| `shapes/*.svg` | 기본 도형 10개 (`fill="currentColor"`) |
| `index.html` | 토큰·도형·컴포넌트·슬라이드 적용 예시 |

## 원칙

1. **칸으로 정리한다.** 모든 요소는 헤어라인 그리드 칸 안에 놓는다. 칸 사이 간격은 0, 선이 곧 간격이다.
2. **색은 블록에만 쓴다.** 글자와 선은 Ink 하나. 색은 정사각 도형 타일의 면과 도형에만 쓴다.
3. **도형이 아이콘이다.** 별도 아이콘 세트 대신 기본 도형 10개를 쓴다.
4. **크게, 붙여서.** 제목은 크고 굵게(600), 타일은 간격 없이 맞붙인다. 둥근 모서리는 바깥 프레임과 알약형 버튼·태그에만 쓴다.

## 색

| 역할 | 이름 | 값 |
|---|---|---|
| 바탕 | Paper / Paper 2 | `#EEEDE6` / `#E4E3DA` |
| 글자 | Ink / Ink 2 / Ink 3 | `#1C2E1A` / `#4A5A46` / `#7D8878` |
| 선 | Line | `#C9CBBE` |
| 블록 | Lime, Green, Forest, Pink, Blue, Sky, Orange, Yellow, Lilac | `#E4F86A` `#7ED98A` `#1C3A1C` `#F4B8D4` `#3F86D8` `#A9CBF2` `#F07A3A` `#F5D33C` `#D9B3F0` |

블록 색과 도형 색은 짝으로 쓴다: lime/pink, forest/green, green/forest, pink/forest, blue/sky, orange/pink, yellow/ink, lilac/forest.
강조 배지(예: `EX`)는 Pink 바탕에 Ink 글자 하나로 통일한다.

## 글꼴

- 웹: 제목 **Bricolage Grotesque** 600, 한글·본문 **Noto Sans KR**, 코드·라벨 **JetBrains Mono**
- PPT: 영문 Arial, 한글 맑은 고딕 (받는 PC에 글꼴이 없어도 깨지지 않도록)
- 크기: Hero 88 · H1 52 · H2 28 · H3 20 · Body 16 · Small 13 · Micro 11 (px)

## 도형

`pill-pair` `clover` `loop` `arch` `half-pair` `flower` `triangles` `asterisk` `quarter` `eyes`

타일은 1:1, 도형은 타일 안쪽 14% 여백. SVG는 `currentColor`로 칠해지므로 `color`로 도형 색을 정한다.

```html
<div style="background:var(--lime);color:var(--pink);aspect-ratio:1;padding:14%">
  <img src="shapes/pill-pair.svg" alt="">  <!-- 인라인 SVG로 넣어야 currentColor가 적용됩니다 -->
</div>
```

## 슬라이드 적용 규칙

- 바탕은 Paper, 글자는 Ink. 검정 배경 슬라이드는 쓰지 않는다.
- 상단 헤더(문서명 · 부제 · 출처 · 연도)는 헤어라인으로 칸을 나눈다.
- 표지에는 도형 타일 4칸, 각 장 제목 왼쪽에는 그 장의 도형 타일 하나를 붙인다.
- 카드·목록은 칠하지 않고 헤어라인 칸으로 나눈다.
