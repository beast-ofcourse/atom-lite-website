"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import PaperShader from "./PaperShader";

type Group = "today" | "week" | "workspace";

type Session = {
  id: string;
  title: string;
  meta: string;
  group: Group;
  visual?: "dark" | "light" | "video";
};

const sessions: Session[] = [
  {
    id: "s-041",
    title: "Hi, check the agentic loop and…",
    meta: "Today · 12:41 · 18 messages",
    group: "today",
    visual: "dark",
  },
  {
    id: "s-040",
    title: "TUI session · 52 seconds",
    meta: "Today · 11:58 · recorded run",
    group: "today",
    visual: "video",
  },
  {
    id: "s-039",
    title: "Draft the release notes for v0.16",
    meta: "Today · 09:12 · 6 messages",
    group: "today",
  },
  {
    id: "s-038",
    title: "try using write and edit tools to…",
    meta: "Yesterday · 20:04 · 22 messages",
    group: "week",
    visual: "light",
  },
  {
    id: "s-037",
    title: "Review the scheduler and ADR 0002",
    meta: "3 days ago · 14 messages",
    group: "week",
  },
  {
    id: "s-036",
    title: "Trace a session across two workspaces",
    meta: "5 days ago · 9 messages",
    group: "week",
  },
  {
    id: "s-035",
    title: "hi, how are you?",
    meta: "Monday · 2 messages",
    group: "workspace",
  },
  {
    id: "s-034",
    title: "Configure a local Ollama provider",
    meta: "Monday · 11 messages",
    group: "workspace",
  },
  {
    id: "s-033",
    title: "Extend the agent with a Pi extension",
    meta: "Last week · 27 messages",
    group: "workspace",
  },
];

const tabs: { id: Group; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "week", label: "Previous 7 days" },
  { id: "workspace", label: "By workspace" },
];

const tools = [
  "read",
  "write",
  "edit",
  "bash",
  "grep",
  "glob",
  "webfetch",
  "websearch",
  "task",
  "todo",
];

const INSTALL = "npm install -g atom-lite";
const NPX = 'npx atom-lite "fix the failing test"';

function AtomMark() {
  return (
    <svg className="atom-mark" viewBox="0 0 32 32" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="16" cy="16" rx="12.5" ry="4.8" />
        <ellipse
          cx="16"
          cy="16"
          rx="12.5"
          ry="4.8"
          transform="rotate(60 16 16)"
        />
        <ellipse
          cx="16"
          cy="16"
          rx="12.5"
          ry="4.8"
          transform="rotate(120 16 16)"
        />
      </g>
      <circle cx="16" cy="16" r="2.4" fill="var(--stamp)" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="copy-icon">
      <rect
        x="6.5"
        y="6.5"
        width="10"
        height="10"
        rx="1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M13.5 4.5h-8a1 1 0 0 0-1 1v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="play-icon">
      <path d="M8 5.5v13l10-6.5z" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState<Group>("today");
  const [copied, setCopied] = useState<"install" | "npx" | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        all: "(min-width: 0px)",
      },
      (context) => {
        if (context.conditions?.reduce) return;

        // Motion is additive: every element is already visible, so a slow
        // hydrate never flashes content out or leaves a region looking absent.
        const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });
        timeline
          .from(".js-topbar", { y: -14, duration: 0.6 }, 0)
          .from(".js-install", { y: 26, scale: 0.985, duration: 0.9 }, 0.05)
          .from(
            ".js-rule",
            { scaleX: 0, transformOrigin: "left center", duration: 0.8 },
            0.4,
          )
          .from(
            ".js-stamp",
            {
              scale: 1.35,
              rotation: -24,
              duration: 0.7,
              ease: "back.out(1.9)",
            },
            0.58,
          )
          .from(
            ".js-session",
            { y: 30, x: 26, duration: 0.85, stagger: 0.08 },
            0.22,
          )
          .from(".js-tools", { y: 10, duration: 0.6 }, 0.75);

        return () => timeline.kill();
      },
      root,
    );

    return () => {
      mm.revert();
      if (resetRef.current) clearTimeout(resetRef.current);
    };
  }, []);

  async function copy(text: string, key: "install" | "npx") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const field = document.createElement("textarea");
      field.value = text;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(key);
    if (resetRef.current) clearTimeout(resetRef.current);
    resetRef.current = setTimeout(() => setCopied(null), 1400);
  }

  function onTabKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    setActive(tabs[next].id);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  }

  const visible = sessions.filter((session) => session.group === active);

  return (
    <div className="page" ref={rootRef as React.RefObject<HTMLDivElement>}>
      <PaperShader />

      <header className="topbar wrap js-topbar">
        <a className="brand" href="/" aria-label="Atom-lite home">
          <AtomMark />
          <span className="brand-name">atom-lite</span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="/docs">
            Docs
          </a>
          <a
            href="https://github.com/beast-ofcourse/atom-lite"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
        </nav>
      </header>

      <main className="stage" id="main">
        <section className="install-card js-install" aria-labelledby="product-name">
          <h1 id="product-name" className="product-name">
            atom-lite
          </h1>
          <p className="pitch">
            Local-first, model-agnostic coding agent for the terminal.
          </p>
          <div className="rule js-rule" aria-hidden="true" />
          <p className="mechanism">
            One agent loop. Ten built-in tools. Durable sessions you can resume.
            Extend it with Pi extensions, MCP, and skills. No account, telemetry,
            or control plane required.
          </p>

          <div className="install-block">
            <span className="field-label" id="install-label">
              Install
            </span>
            <button
              type="button"
              className="command command-primary"
              onClick={() => copy(INSTALL, "install")}
              aria-describedby="install-label"
            >
              <span className="command-text">{INSTALL}</span>
              <span className="copy-button" aria-hidden="true">
                <CopyIcon />
              </span>
              <span className="sr-only" aria-live="polite">
                {copied === "install" ? "Copied install command" : ""}
              </span>
            </button>
            <button
              type="button"
              className="command command-secondary"
              onClick={() => copy(NPX, "npx")}
            >
              <span className="command-text">{NPX}</span>
              <span className="copy-button" aria-hidden="true">
                <CopyIcon />
              </span>
              <span className="sr-only" aria-live="polite">
                {copied === "npx" ? "Copied one-shot command" : ""}
              </span>
            </button>
            <p className={`copy-note ${copied ? "is-visible" : ""}`} role="status">
              {copied === "install"
                ? "Install command copied."
                : copied === "npx"
                  ? "One-shot command copied."
                  : "\u00a0"}
            </p>
          </div>

          <div className="card-number" aria-hidden="true">
            <span>CATALOGUE</span>
            <strong>001</strong>
          </div>
          <div className="stamp js-stamp" aria-hidden="true">
            <span>LOCAL</span>
            <span>FIRST</span>
          </div>
        </section>

        <section className="drawer" aria-label="Session archive">
          <div className="drawer-head">
            <div className="tabs" role="tablist" aria-label="Session groups">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active === tab.id}
                  aria-controls="session-panel"
                  tabIndex={active === tab.id ? 0 : -1}
                  className={`tab ${active === tab.id ? "is-active" : ""}`}
                  onClick={() => setActive(tab.id)}
                  onKeyDown={(event) => onTabKey(event, index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="drawer-count">
              {String(visible.length).padStart(2, "0")} filed
            </span>
          </div>

          <div className="card-stack" role="tabpanel" id="session-panel" aria-labelledby={`tab-${active}`}>
            {visible.map((session, index) => (
              <article
                className={`session-card slot-${index} js-session`}
                key={session.id}
              >
                <div className="session-head">
                  <span className="session-id">{session.id}</span>
                  <span className="session-meta">{session.meta}</span>
                </div>
                <h2 className="session-title">{session.title}</h2>
                {session.visual === "dark" && (
                  <img
                    className="session-shot"
                    src="/assets/Dark-theme-card.png"
                    alt="Real Atom-lite web UI, dark theme"
                    width={1200}
                    height={675}
                  />
                )}
                {session.visual === "light" && (
                  <img
                    className="session-shot"
                    src="/assets/Light-theme-card.png"
                    alt="Real Atom-lite web UI, light theme"
                    width={1200}
                    height={675}
                  />
                )}
                {session.visual === "video" && (
                  <div className="session-video">
                    <video
                      controls
                      preload="none"
                      poster="/assets/demo-poster.png"
                      aria-label="Real Atom-lite terminal session recording"
                    >
                      <source
                        src="/assets/Atom-lite-demo.webm"
                        type="video/webm"
                      />
                    </video>
                    <span className="video-badge" aria-hidden="true">
                      <PlayIcon /> TUI · 00:52
                    </span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="tool-strip wrap js-tools" aria-label="Built-in tools">
        <span className="tool-strip-label">Ten tools</span>
        <ul>
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
