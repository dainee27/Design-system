# Design System

프레임워크에 의존하지 않는 CSS 기반 디자인 시스템입니다.
디자인 토큰 → 기본 스타일 → 컴포넌트의 3계층으로 구성되며, 라이트/다크 테마와 접근성(WAI-ARIA)을 기본으로 지원합니다.

## 구조

```
tokens/
  tokens.json        # 디자인 토큰 원본 (Figma·Style Dictionary 등과 연동용)
src/
  tokens.css         # 토큰 → CSS 변수 (primitive + semantic, 라이트/다크)
  base.css           # 리셋, 타이포그래피, 레이아웃 유틸리티
  components.css     # 컴포넌트 스타일
  index.css          # 엔트리 (위 3개를 import)
  ds.js              # Tabs · Modal · Toast · 테마 전환 (의존성 없음)
docs/
  index.html         # 토큰·컴포넌트 문서 및 라이브 데모
```

## 시작하기

```html
<link rel="stylesheet" href="src/index.css" />
<script src="src/ds.js" defer></script>

<button class="ds-btn">저장</button>
```

문서 페이지 미리보기:

```bash
npm run dev   # http://localhost:5173/docs/
```

## 디자인 토큰

| 분류 | 예시 | 설명 |
| --- | --- | --- |
| Color (primitive) | `--ds-brand-600`, `--ds-gray-200` | 원시 팔레트. 컴포넌트에서 직접 사용하지 않습니다. |
| Color (semantic) | `--ds-color-accent`, `--ds-color-text-secondary` | 용도 기반 별칭. 테마에 따라 값이 바뀝니다. |
| Typography | `--ds-text-sm`, `--ds-weight-semibold` | 12–48px 스케일, 기본 서체 Pretendard |
| Spacing | `--ds-space-4` (16px) | 4px 그리드 |
| Radius | `--ds-radius-md` (8px) | xs · sm · md · lg · xl · full |
| Shadow | `--ds-shadow-md` | xs → xl 5단계 elevation |
| Motion | `--ds-duration-normal`, `--ds-ease-standard` | `prefers-reduced-motion` 시 0ms |
| Z-index | `--ds-z-modal` | dropdown → tooltip 계층 |

**원칙:** 컴포넌트는 semantic 토큰만 참조합니다. 브랜드 색을 바꾸려면 `--ds-brand-*` 값만 교체하면 됩니다.

## 테마

- 기본적으로 OS 설정(`prefers-color-scheme`)을 따릅니다.
- `<html data-theme="light">` 또는 `data-theme="dark"`로 강제할 수 있습니다.
- JS: `DS.setTheme("light" | "dark" | "system")`

## 컴포넌트

| 컴포넌트 | 클래스 | 변형 / 상태 |
| --- | --- | --- |
| Button | `.ds-btn` | `--secondary` `--tertiary` `--ghost` `--danger` · `--sm` `--lg` `--icon` `--block` · `:disabled` `[aria-busy]` |
| Field | `.ds-field` `.ds-label` `.ds-hint` `.ds-error` | `[data-invalid]` |
| Input / Textarea / Select | `.ds-input` `.ds-textarea` `.ds-select` | `--sm` `--lg` · `[aria-invalid]` `:disabled` · `.ds-input-group`(아이콘) |
| Checkbox / Radio | `.ds-check` | `:checked` `:indeterminate` `:disabled` |
| Switch | `.ds-switch` | `role="switch"` |
| Card | `.ds-card` `__header` `__body` `__footer` | `--elevated` `--interactive` |
| Badge | `.ds-badge` | `--accent` `--success` `--warning` `--danger` `--info` `--dot` |
| Alert | `.ds-alert` | `--success` `--warning` `--danger` |
| Avatar | `.ds-avatar` `.ds-avatar-group` | `--sm` `--lg` |
| Tabs | `[data-ds-tabs]` `.ds-tabs__list` `__tab` `__panel` | 방향키·Home·End 지원 |
| Segmented | `.ds-segmented` | `[aria-pressed]` |
| Table | `.ds-table-wrap` `.ds-table` | `.ds-num` |
| Progress / Spinner / Skeleton | `.ds-progress` `.ds-spinner` `.ds-skeleton` | |
| Tooltip | `[data-tooltip="…"]` | CSS only |
| Modal | `<dialog class="ds-modal">` | `[data-ds-open]` `[data-ds-close]` |
| Toast | `DS.toast("메시지")` | |

## 네이밍 규칙

- 접두사 `ds-`로 다른 스타일과의 충돌을 방지합니다.
- BEM 형식: `.ds-block__element--modifier`
- 상태는 가능한 한 네이티브 속성(`:disabled`, `aria-invalid`, `aria-selected`, `aria-busy`)으로 표현해 스타일과 접근성을 일치시킵니다.

## 접근성

- 모든 인터랙티브 요소에 `:focus-visible` 포커스 링 제공
- 본문 텍스트 대비 WCAG AA 이상
- 폼 요소는 네이티브 `input`을 사용해 키보드·스크린리더 호환
- Modal은 네이티브 `<dialog>`로 포커스 트랩과 `Esc` 닫기 지원
- `prefers-reduced-motion` 존중
