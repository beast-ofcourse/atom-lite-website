---
name: Atom-lite Website
description: A kraft card-catalogue identity for a local-first coding agent
colors:
  kraft: "#e7dcc3"
  kraft-deep: "#ded0b2"
  card: "#efe6d0"
  ink: "#211e1a"
  ink-soft: "#484236"
  stamp: "#8c2f22"
  rule: "rgba(33, 30, 26, 0.24)"
  tab: "#cdbb9a"
  ink-hover: "#332e26"
  card-hover: "#fff8e8"
  wash-soft: "rgba(255, 255, 255, 0.35)"
  wash-lighter: "rgba(255, 255, 255, 0.4)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Georgia, serif"
    fontSize: "clamp(3.1rem, 6vw, 5.1rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.68rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.15em"
  headline:
    fontFamily: "Bricolage Grotesque, Georgia, serif"
    fontSize: "2.1rem"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bricolage Grotesque, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  subtitle:
    fontFamily: "Bricolage Grotesque, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
  lead:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.14rem"
    lineHeight: 1.65
  prose:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.05rem"
    lineHeight: 1.6
  small:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.94rem"
    lineHeight: 1.65
  caption:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.82rem"
  note:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.78rem"
  micro:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.72rem"
  tiny:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.64rem"
  nav:
    fontFamily: "Bricolage Grotesque, Georgia, serif"
    fontSize: "1.12rem"
    fontWeight: 800
  code:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.9rem"
  diagram-label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "12px"
  diagram-title:
    fontFamily: "Bricolage Grotesque, Georgia, serif"
    fontSize: "15px"
  pitch:
    fontFamily: "Bricolage Grotesque, Georgia, serif"
    fontSize: "1.32rem"
  nano:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.58rem"
  meta:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.6rem"
  display-lg:
    fontFamily: "Bricolage Grotesque, Georgia, serif"
    fontSize: "3.6rem"
  doc-title:
    fontFamily: "Bricolage Grotesque, Georgia, serif"
    fontSize: "2.2rem"
  doc-aside:
    fontFamily: "Bricolage Grotesque, Georgia, serif"
    fontSize: "1.2rem"
  not-found-title:
    fontFamily: "Bricolage Grotesque, Georgia, serif"
    fontSize: "2rem"
  doc-title-max:
    fontFamily: "Bricolage Grotesque, Georgia, serif"
    fontSize: "3.2rem"
  chapter-max:
    fontFamily: "Bricolage Grotesque, Georgia, serif"
    fontSize: "3.4rem"
rounded:
  xs: "2px"
  sm: "3px"
  md: "4px"
  pill: "999px"
spacing:
  sp-1: "4px"
  sp-2: "8px"
  sp-3: "12px"
  sp-4: "16px"
  sp-5: "24px"
  sp-6: "32px"
  sp-7: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.sm}"
    padding: "15px 17px"
  button-primary-hover:
    backgroundColor: "#332e26"
    textColor: "{colors.card}"
    rounded: "{rounded.sm}"
    padding: "15px 17px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "15px 17px"
  card-catalogue:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "clamp(26px, 3.4vw, 54px)"
---

# Design System: Atom-lite Website

## Overview

**Creative North Star: "The Catalogue Drawer."**

The site is an open archive drawer, not a marketing funnel. Warm kraft stock
is the ground and the card faces; deep charcoal ink carries every word; one
signal-red rubber stamp marks the active card and nothing else. The interface
borrows the grammar of a library card catalogue — tabbed dividers, filed
slips, ruled lines, a stamped call number — and makes the install command the
front card's working action. Content is deliberately factual: the product's
own README voice, real screenshots, a real terminal recording, and no
invented social proof.

The personality is precise, handmade, and unsentimental. Density is moderate:
one chapter per screen, generous separation between chapters, tight groups
inside a card. The WebGL layer draws faint kozo fibre and press grain on the
ground; it is material, not decoration, and rests under reduced motion.

**Key Characteristics:**

- Kraft ground and card stock, one signal red reserved for active state
- Display grotesk with real weight, monospace for commands, dates, and labels
- Ruled catalogue cards with small corner radii and soft, offset shadows
- One orchestrated entrance; hover and press feedback on every control
- Real product captures only; no fabricated claims or testimonials

## Colors

A warm paper palette with a single ink-red accent.

### Primary
- **Signal Stamp** (#8c2f22): the active-state mark on the install card, the
  session id in a filed card, tab hover borders, and list markers. Its rarity
  is the point.

### Neutral
- **Kraft Ground** (#e7dcc3): the page field and the shader's base; the hero's
  paper.
- **Deep Kraft** (#ded0b2): session-card faces and the diagram core.
- **Card Stock** (#efe6d0): the install slip, documentation sheet, and diagram
  ground.
- **Catalogue Tab** (#cdbb9a): secondary card surfaces.
- **Ink** (#211e1a): all headings, commands, and primary actions.
- **Ink Soft** (#484236): secondary copy, metadata, and labels.
- **Hairline** (rgba(33, 30, 26, 0.24)): rules, borders, and dividers.

### Named Rules
**The One Stamp Rule.** Signal red appears only on an active state, an
identifier, or a marker. It never becomes a large fill or a background wash.

**The Ink Rule.** Contrast comes from ink weight, not from adding colour to
secondary text; secondary copy is tinted from the same charcoal hue.

## Typography

**Display Font:** Bricolage Grotesque (with Georgia fallback), self-hosted
**Body Font:** Geist (with system-ui fallback), self-hosted
**Label Font:** Geist Mono (with ui-monospace fallback), self-hosted

**Character:** A characterful grotesk sets the product name and chapter titles
with tight tracking; a quiet grotesk carries prose; a workhorse mono carries
commands, dates, catalogue numbers, and labels. The mono is functional — it
never imitates "technical" as a costume.

### Hierarchy
- **Display** (800, clamp 3.1–5.1rem, 0.94): product name and chapter titles.
- **Headline** (700, clamp 2.1–3.6rem, 1.04): chapter titles on the long page.
- **Title** (600, 1rem–1.5rem): session titles and document section headings.
- **Body** (400, 1rem/1.5, prose 1.65): copy, capped near 64ch.
- **Label** (400, 0.66–0.8rem, tracked 0.07–0.15em): tabs, metadata, field
  labels, tool index.

### Named Rules
**The Label Rule.** Uppercase mono is for catalogue metadata only, never for
an eyebrow above a heading. The heading carries its own weight.

## Layout

A 1440px-max stage splits into a 1.04 / 0.96 grid: the stamped install slip
on the left, the session drawer on the right. Equal left and right content
edges are held by `.chapter-wrap` and `.docs-body`. Long-page chapters are one
screen tall at 1440×900, each with a single heading and one idea.

Docs use a 260px navigation rail beside a 780px paper sheet. The rail is
sticky on desktop and wraps into a horizontal list at 920px; the single-column
breakpoint is 920px, with a second compaction at 560px. No horizontal overflow
is allowed at 390px or 320px.

## Elevation & Depth

Depth is physical but restrained: cards lift off the paper with a soft,
offset shadow and a hairline edge. No glass, no glow, no zero-offset coloured
halos. The ground itself is textured by the WebGL paper shader; cards are not.

### Shadow Vocabulary
- **Install slip** (`0 18px 42px rgba(33, 30, 26, 0.13)`): the front card.
- **Filed card** (`0 8px 20px rgba(33, 30, 26, 0.08)`): session cards at rest.
- **Document sheet** (`0 16px 40px rgba(33, 30, 26, 0.1)`): the docs paper.

### Named Rules
**The Border-or-Shadow Rule.** A surface takes a hairline border *or* a soft
shadow for its edge, never a heavy border stacked under a soft shadow.

## Shapes

Corners are small because paper stock is cut, not moulded: 3px on commands and
session cards, 4px on the install slip and document sheet, 2px on tiny
controls. The recurring silhouettes are the notched tab, the ruled index row,
the circular stamp, and the diagram's plain rectangles. No organic clip paths
and no many-vertex polygons.

## Components

### Buttons
- **Shape:** 3px radius, 15px 17px padding.
- **Primary:** ink ground, card stock text; the install command is a working
  copy control, not a decorative link.
- **Hover / Focus:** primary darkens to #332e26; a 2px signal-red focus ring
  sits 3px outside the control; active presses down 1px.
- **Secondary:** transparent with a dashed hairline border and ink text.

### Tabs
- Monospace uppercase labels; active tab inverts to ink with card-stock text.
- Roving tabindex with ArrowLeft/ArrowRight/Home/End keyboard support.

### Cards / Containers
- 3–4px radius, card-stock ground, hairline border, soft offset shadow.
- Session cards carry an id, a date line, a title, and optional real media.
- Hover lifts a linked card 2px; no tilt.

### Command Blocks
- Ink ground, card-stock mono text, a drawn copy icon, and a status line that
  confirms the copy. Never a fake terminal prompt.

### Navigation
- Top bar: atom-orbit mark and wordmark left, Docs and GitHub right.
- Docs rail: mono links with a signal-red left border on hover.

## Do's and Don'ts

### Do:
- **Do** keep the install command as the unmistakable primary action in the
  first viewport.
- **Do** use real product captures and label them honestly.
- **Do** keep every control keyboard-reachable and every motion additive from
  an already-visible state.
- **Do** honour `prefers-reduced-motion` across GSAP and the shader.

### Don't:
- **Don't** add testimonials, customer counts, pricing, or other claims the
  repository cannot support.
- **Don't** invent a production domain; `NEXT_PUBLIC_SITE_URL` is the only
  canonical source.
- **Don't** use gradient text, glass decoration, hard offset shadows, or
  emoji as icons.
- **Don't** let signal red become a large fill or a background wash.
