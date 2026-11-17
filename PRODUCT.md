# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated (framework not named by the user): a production-grade web framework
deployed on **Vercel**, with rich motion in scope — GSAP, transitions, and
shaders — and "a lot more we'll plan." Leaning Next.js (React) for its
first-party Vercel deploy and animation ecosystem, but the final framework is
an open decision to confirm when we plan the build. This is not a plain
static HTML/CSS/JS site.

_Confirmed constraints: Vercel deployment; production-grade ambition; rich
animation/transitions/shaders are wanted, not decorative afterthoughts._

## Users

_(Product truth inherited from the Atom-lite repository's `PRODUCT.md`,
`README.md`, and docs; website-specific roles derived from the user's brief.)_

- **Primary — evaluating developers.** Developers and agent builders who run
  coding agents from a terminal and want a small, readable, hackable harness
  rather than a large orchestration product. On this site they arrive to
  understand what Atom-lite is, why it is different, and how to install it in
  seconds. They often work against local or self-hosted models (Ollama, LM
  Studio, llama.cpp) and value offline operation, explicit safety boundaries,
  and extensibility without forking the core.
- **Secondary — active users looking up reference.** The same developers
  returning for configuration, tools, providers, sessions, extensions, MCP,
  and architectural decisions (ADRs).
- **Tertiary — contributors and maintainers.** People who need the project's
  real docs, ADRs, contribution path, and release/version context.

## Product Purpose

This website is the public front door for **Atom-lite**. It has three jobs,
in the user's priority order:

1. **Showcase & install** — communicate the product's differentiator and give
   the shortest possible path to `npm install -g atom-lite` / `npx atom-lite`.
2. **Full docs** — host complete, accurate reference mirroring the repository's
   `docs/` and `docs/adr/` so a visitor never needs to leave the site to
   understand or configure the product.
3. **Professional presence** — a polished, credible web presence at the caliber
   of the category's agent sites, reflecting the quality of the engineering.

The underlying product (from `Atom-lite/PRODUCT.md`): a local-first,
model-agnostic coding agent for the terminal built on a deliberately small
harness — one agent loop, ten built-in tools, a conflict-aware scheduler,
durable JSONL sessions, context management, and explicit safety boundaries. It
runs against local or hosted providers through interchangeable adapters, with
no cloud account, telemetry, or control plane required.

Success: a visitor grasps the value in seconds, installs without friction, and
can find any documented fact quickly and accurately.

## Positioning

The website must lead with the claim a neighboring coding agent could not
truthfully copy: **a deliberately tiny core that gains surface area through
Pi-compatible extensions.** Atom-lite ships one agent loop, one conversation,
one registry, and ten built-in tools, then extends through unmodified Pi
extensions (tools, commands, events), MCP servers, and skills. Providers are
interchangeable adapters (OpenAI-compatible, Ollama, Gemini), so the model is a
choice rather than a lock-in. The site's own stance matches the product's
voice: direct, technical, and anti-hype — it explains trade-offs and records
decisions as ADRs rather than making marketing claims.

## Operating Context

- Content derives from real repository artifacts: `README.md`, `docs/`,
  `docs/adr/` (ADRs 0001–0022), `web/DESIGN.md`, `CHANGELOG.md`, and
  `package.json`. The current product version is **0.16.2** (2026-11-16); docs
  and install instructions must stay consistent with it.
- The install path is npm: `npm install -g atom-lite`, with `npx atom-lite <task>`
  as the no-install option. Requires Node.js >= 22.19. Default provider is the
  Kilo AI Gateway with a free, anonymous, rate-limited model.
- Deployment target is Vercel; the site is the public marketing/docs surface,
  distinct from the product's own localhost browser UI (`atom-lite --serve`).
- The site presents (accurately): ten built-in tools (`read`, `write`, `edit`,
  `bash`, `grep`, `glob`, `webfetch`, `websearch`, `task`, `todo`), single agent
  loop, conflict-aware scheduler, durable sessions, context management and
  compaction, live context meter, plan/yolo modes, hash guards, provider-agnostic
  adapters, interactive pickers, command palette, themes, local-first safety,
  Pi extension compatibility, MCP, skills, agent personas, goal continuity, and
  the share-mode web UI.
- Reference docs to mirror or link: configuration, extensions, agents, and the
  ADR index.

## Capabilities and Constraints

- **Must present:** the differentiator above; a fast, copyable install/quick
  start; the feature set listed in Operating Context; full docs reference;
  MIT license, npm package name, and the real GitHub repository
  (`beast-ofcourse/atom-lite`).
- **Voice:** direct, technical, anti-hype. Explain trade-offs; do not oversell.
- **Hard "do not fabricate" list:** no customer testimonials, case studies,
  press coverage, pricing page, hosted service, user/download counts, or
  benchmark claims may be invented — none exist in the repository. npm
  download badges and CI status, if shown, must be live/real, not static claims.
- **Production-grade build:** rich animations, transitions, and shaders (GSAP
  named by the user) are in scope and must be real and purposeful, not filler.
- **Accessibility:** because the direction is animation-heavy, the site must
  honor `prefers-reduced-motion`, be fully keyboard-navigable, and meet contrast
  standards. This extends the product's own commitments (keyboard-first,
  `auto`/`dark`/`light`/`ansi` themes, `NO_COLOR` and `--no-color` always win).
- **Undecided:** final framework; whether docs are authored on-site or generated
  from repository Markdown; exact information architecture and surface list.

## Brand Commitments

- Name: **Atom-lite**. Tagline: "Local-first, model-agnostic coding agent for
  the terminal."
- License: MIT. Author: Atom-lite contributors. npm package: `atom-lite`.
  Repository: `beast-ofcourse/atom-lite`.
- Voice in docs and on the site is direct, technical, and anti-hype: it explains
  trade-offs and records decisions as ADRs rather than marketing claims.
- Existing brand asset: `Atom-lite/assets/atom-lite.png` (README banner). No
  further logo or wordmark guidance exists in the repository.
- The user named opencode.ai, pi.dev, and cline.bot as examples of the **caliber
  of professional web presence** to match. These are reference points for
  ambition, not a visual style to copy.
- The user explicitly asked for a highly professional, production-grade site
  with animations, transitions, shaders, and GSAP — treated as a binding
  requirement.

## Evidence on Hand

- `Atom-lite/PRODUCT.md` — confirmed product truth (users, purpose,
  positioning, capabilities, principles).
- `Atom-lite/README.md` — install, quick start, configuration, tools,
  providers, safety, sessions, commands, personas, goal continuity, web UI.
- `Atom-lite/docs/README.md`, `docs/configuration.md`, `docs/extensions.md`,
  `docs/agents.md`, `docs/adr/0001`–`0022` — reference docs and decisions.
- `Atom-lite/web/DESIGN.md` — the existing browser client's visual system
  (Operate mode, ChatGPT-derived achromatic shell). This governs the product's
  in-app UI, **not** the marketing site; the site's world is decided in
  new-work.
- `Atom-lite/CHANGELOG.md` — release history through v0.16.2 (2026-11-16).
- `Atom-lite/package.json` — version 0.16.2, Node >= 22.19, dependencies.
- `Atom-lite/assets/atom-lite.png` — existing brand/banner image.
- **Absences future work must not fabricate:** no customer testimonials, case
  studies, press coverage, pricing, hosted service, or user-count claims exist
  in the repository.

## Product Principles

1. **Truth over hype.** Every claim on the site is grounded in the repository;
   no invented social proof, metrics, or features.
2. **Shortest path to value.** Getting from "what is this" to a working install
   command is immediate and obvious.
3. **Docs are the product's memory.** Mirror the real docs and ADRs; accuracy
   and completeness outrank decoration.
4. **Lead with the small-core story.** The differentiator a neighboring agent
   cannot copy is the headline, not a footnote.
5. **Respect local-first.** No account, telemetry, or control plane is implied
   as required anywhere on the site.

## Accessibility & Inclusion

- Site must honor `prefers-reduced-motion` given the animation/shader-heavy
  direction, remain fully keyboard-navigable, and meet WCAG contrast targets.
- Reflect the product's own inclusion commitments: keyboard-first operation,
  theme choices including light/dark, and no reliance on colour or motion alone
  to convey state.
