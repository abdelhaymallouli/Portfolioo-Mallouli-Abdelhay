# The blues

There are **two** blues on this site, not three. One is the brand accent; the
other is a near-invisible grid line. Everything else that looks blue on screen
is one of these two at reduced opacity.

---

## 1. `--color-primary` — Electric blue

```
#00d4ff
rgb(0, 212, 255)
hsl(190, 100%, 50%)
```

The brand accent. Defined at `src/app/globals.css:73`.

### Contrast

| Against | Ratio | Verdict |
|---|---:|---|
| Ink `#343434` | **7.03** | ✅ AA at any size — this is the load-bearing number |
| Near-black `#0a0a0a` | 11.18 | ✅ safe as text on the dark panels |
| White `#ffffff` | 1.77 | ❌ never put white text on it |
| Canvas `#f0efec` | 1.54 | ❌ never use it as text on the page ground |

The rule the whole palette rests on: **text on this colour is always ink, never
white, and this colour is never text on a light ground.** It is a fill.

### Why 100% saturation

A desaturated teal was tried first — `#99e2d0`, 32% saturation — and was
rejected as looking dead. On a warm bone canvas a muted cool accent has nothing
to push against. Full saturation is what makes it read as a deliberate signal
rather than a tint.

The constraint that set the exact value: it had to stay above ~7:1 against ink
while remaining genuinely blue. Brighter cyans cleared contrast easily but
drifted toward green; deeper blues (`#0f4c81`, `#12508a`) dropped ink contrast
to 5.0–5.9 and would have broken the ink-on-accent rule.

### Where it appears

| Location | File |
|---|---|
| Nav monogram tile | `Navbar.tsx:145` |
| Scroll-to-top FAB | `Navbar.tsx:93` |
| Active nav-link underline | `Navbar.tsx:178` |
| Sliding marker in primary buttons | `Button.tsx:41` |
| Hero backdrop grid lines | `HeroBackdrop.tsx:45` |
| Journey timeline spine | `Journey.tsx:522` |
| Journey spine glow (35% via `color-mix`) | `Journey.tsx:506` |
| Journey milestone dot glow (35%) | `Journey.tsx:291` |
| Journey card hover wash (10%) | `Journey.tsx:328` |
| Dialog top accent bars | `MilestoneDialog.tsx:120`, `CertificationsDialog.tsx:103` |
| Dialog detail bullets | `MilestoneDialog.tsx:198` |
| Favicon + Apple icon tile | `icon.tsx`, `apple-icon.tsx` |
| Social share card | `opengraph-image.tsx` |

### Three places to change it

This value is duplicated by necessity — CSS custom properties cannot reach
everywhere:

1. `--color-primary` in `src/app/globals.css`
2. `BRAND_PRIMARY` in `src/lib/brand.ts` — the icon and OG-image routes run
   through Satori, which loads no stylesheet and resolves no custom properties
3. `src/app/favicon.ico` — a checked-in binary, so it follows neither of the
   above. Regenerate it from the built `icon` route (the ICO is a 6-byte header
   + 16-byte directory entry wrapping the 32×32 PNG that `app/icon.tsx` emits).

---

## 2. Grid line — Deep slate blue

```
#14384a
rgb(20, 56, 74)
hsl(200, 57%, 18%)
```

Hard-coded at `src/components/atoms/GlowBackdrop.tsx:36`. Not a token, because
it exists only here.

### Contrast

| Against | Ratio | Note |
|---|---:|---|
| Near-black `#0a0a0a` | **1.60** | the only figure that matters — this is its ground |

It is deliberately *barely* visible. It replaced `#26241f`, a warm brown-grey
measuring 1.28 on the same ground. The step from 1.28 → 1.60 is what makes the
hue legible without the grid graduating from texture into something the eye
actually reads as a grid.

### Where it appears

The 44px masked grid in `GlowBackdrop`, which backs the **About** section and
the **footer**.

The Hero's grid is a separate implementation: it uses `var(--color-primary)` at
`opacity-[0.14]` rather than this colour. Raised from `0.06` when the lines
changed from white to blue — the accent is darker than white, so at the old
value the grid vanished entirely. Effective contrast lands at 1.25, in the same
band as this one.

---

## What is *not* blue

Worth stating, because it comes up:

- **Backgrounds are not blue.** `--color-surface-dark` is `#0a0a0a`, a
  near-black. A navy surface (`#0d3b66`) was built and reverted — it forced
  every muted text tier up a step to stay AA-compliant.
- **`--color-accent` is green**, `#447e68`. It drives focus rings and text
  selection, and is unrelated to the brand blue.
- **`--color-accent-warm` is yellow**, `#ffcc00` — the former brand colour,
  kept as the rare warm counterpoint. It survives on exactly two elements: the
  year pills in the Journey card and the milestone dialog. Rarity is the point.

---

## Quick reference

```css
--color-primary:      #00d4ff;  /* brand accent — fills, ink on top   */
--color-accent-warm:  #ffcc00;  /* rare warm counterpoint             */
--color-accent:       #447e68;  /* focus rings, selection (green)     */
--color-surface-dark: #0a0a0a;  /* dark panels — NOT blue             */
/* #14384a — grid lines, GlowBackdrop.tsx only, not tokenised         */
```
