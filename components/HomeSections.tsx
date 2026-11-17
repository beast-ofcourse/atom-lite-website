"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const tools: { name: string; purpose: string }[] = [
  { name: "read", purpose: "Inspect files with optional line ranges" },
  { name: "write", purpose: "Create or replace files safely, hash-guarded" },
  { name: "edit", purpose: "Precise find-and-replace, hash-guarded" },
  { name: "bash", purpose: "Run shell commands behind one global barrier" },
  { name: "grep", purpose: "Regex search, ripgrep-backed" },
  { name: "glob", purpose: "Find files by pattern" },
  { name: "webfetch", purpose: "Fetch a URL as markdown" },
  { name: "websearch", purpose: "Search the web, ranked results" },
  { name: "task", purpose: "Query or control a background bash task" },
  { name: "todo", purpose: "Maintain the session task ledger" },
];

const providers = [
  {
    tag: "01",
    name: "OpenAI-compatible",
    detail:
      "LM Studio, llama.cpp, Kilo, OpenAI, Anthropic, OpenRouter, Groq, Mistral, xAI — any compatible endpoint.",
  },
  {
    tag: "02",
    name: "Ollama",
    detail: "Native Ollama chat API for models running on your own machine.",
  },
  {
    tag: "03",
    name: "Gemini",
    detail: "The official Gemini API, with the same profile-based switching.",
  },
];

export default function HomeSections() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(
      { reduce: "(prefers-reduced-motion: reduce)", all: "(min-width: 0px)" },
      (context) => {
        if (context.conditions?.reduce) return;
        const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });
        timeline
          .from(".js-diagram-branch", { scale: 0.92, duration: 0.7 }, 0)
          .from(".js-diagram-core", { y: 14, duration: 0.8 }, 0.08)
          .from(
            ".js-index-row",
            { x: -14, duration: 0.6, stagger: 0.035 },
            0.15,
          )
          .from(".js-provider", { y: 16, duration: 0.65, stagger: 0.08 }, 0.2);
        return () => timeline.kill();
      },
      root,
    );
    return () => {
      mm.revert();
      if (resetRef.current) clearTimeout(resetRef.current);
    };
  }, []);

  async function copyInstall() {
    try {
      await navigator.clipboard.writeText("npm install -g atom-lite");
    } catch {
      const field = document.createElement("textarea");
      field.value = "npm install -g atom-lite";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    if (resetRef.current) clearTimeout(resetRef.current);
    resetRef.current = setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="sections" ref={rootRef}>
      <section className="chapter" id="why" aria-labelledby="why-title">
        <div className="chapter-wrap wrap">
          <h2 id="why-title" className="chapter-title">
            A small core, not a small agent.
          </h2>
          <p className="chapter-lede">
            Atom-lite ships one agent loop, one conversation, one registry, and
            ten built-in tools. Everything past that is added at the edges, so
            the harness stays readable while the agent grows.
          </p>
          <div className="diagram" role="img" aria-label="One agent loop at the centre, extended by Pi extensions, MCP servers, skills, and interchangeable providers">
            <ul className="diagram-mobile" aria-hidden="true">
              <li><strong>One agent loop</strong><span>scheduler · context · safety</span></li>
              <li><strong>Pi extensions</strong><span>tools · commands · events</span></li>
              <li><strong>MCP servers</strong><span>external tool catalogues</span></li>
              <li><strong>Skills</strong><span>project + global</span></li>
              <li><strong>Providers</strong><span>local or hosted adapters</span></li>
            </ul>
            <svg viewBox="0 0 900 380" aria-hidden="true">
              <g className="js-diagram-branch diagram-branch">
                <rect x="24" y="26" width="212" height="74" rx="3" />
                <text x="40" y="54" className="diagram-label">PI EXTENSIONS</text>
                <text x="40" y="78" className="diagram-note">tools · commands · events</text>
              </g>
              <g className="js-diagram-branch diagram-branch">
                <rect x="664" y="26" width="212" height="74" rx="3" />
                <text x="680" y="54" className="diagram-label">MCP SERVERS</text>
                <text x="680" y="78" className="diagram-note">external tool catalogues</text>
              </g>
              <g className="js-diagram-branch diagram-branch">
                <rect x="24" y="280" width="212" height="74" rx="3" />
                <text x="40" y="308" className="diagram-label">SKILLS</text>
                <text x="40" y="332" className="diagram-note">project + global</text>
              </g>
              <g className="js-diagram-branch diagram-branch">
                <rect x="664" y="280" width="212" height="74" rx="3" />
                <text x="680" y="308" className="diagram-label">PROVIDERS</text>
                <text x="680" y="332" className="diagram-note">local or hosted adapters</text>
              </g>
              <g className="diagram-lines" fill="none" strokeWidth="1.4">
                <path d="M236 63 H450 V164" />
                <path d="M664 63 H450 V164" />
                <path d="M236 317 H450 V216" />
                <path d="M664 317 H450 V216" />
              </g>
              <g className="js-diagram-core diagram-core">
                <rect x="350" y="150" width="200" height="80" rx="3" />
                <text x="450" y="185" textAnchor="middle" className="diagram-core-label">ONE AGENT LOOP</text>
                <text x="450" y="209" textAnchor="middle" className="diagram-note">scheduler · context · safety</text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      <section className="chapter chapter-alt" id="tools" aria-labelledby="tools-title">
        <div className="chapter-wrap wrap">
          <h2 id="tools-title" className="chapter-title">
            Ten tools. Nothing hidden.
          </h2>
          <p className="chapter-lede">
            The whole built-in catalogue fits on one page. Tests, git, builds,
            and package managers run through <code>bash</code> — there is no
            second, invisible tool layer.
          </p>
          <ol className="tool-index">
            {tools.map((tool, index) => (
              <li className="js-index-row" key={tool.name}>
                <span className="tool-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <code className="tool-name">{tool.name}</code>
                <span className="tool-purpose">{tool.purpose}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="chapter" id="providers" aria-labelledby="providers-title">
        <div className="chapter-wrap wrap">
          <h2 id="providers-title" className="chapter-title">
            Bring your own model.
          </h2>
          <p className="chapter-lede">
            Provider profiles combine endpoint, model, auth source, and options.
            Switching profiles mid-tool-exchange is refused, so a run never
            silently changes brains.
          </p>
          <div className="provider-list">
            {providers.map((provider) => (
              <article className="provider js-provider" key={provider.name}>
                <span className="provider-tag">{provider.tag}</span>
                <h3>{provider.name}</h3>
                <p>{provider.detail}</p>
              </article>
            ))}
          </div>
          <p className="chapter-footnote">
            Out of the box: the Kilo AI Gateway with a free, anonymous,
            rate-limited model. No key required to start.
          </p>
        </div>
      </section>

      <section className="chapter chapter-alt" id="sessions" aria-labelledby="sessions-title">
        <div className="chapter-wrap wrap">
          <h2 id="sessions-title" className="chapter-title">
            Every session is a file you own.
          </h2>
          <p className="chapter-lede">
            Sessions are append-only JSONL event logs, grouped by workspace and
            resumable across restarts. Compact older context without losing the
            transcript; search titles and content from the command line.
          </p>
          <div className="session-frame">
            <video
              controls
              preload="none"
              poster="/assets/demo-poster.png"
              aria-label="Real Atom-lite terminal session recording"
            >
              <source src="/assets/Atom-lite-demo.webm" type="video/webm" />
            </video>
          </div>
        </div>
      </section>

      <section className="chapter chapter-close" id="start" aria-labelledby="start-title">
        <div className="chapter-wrap wrap">
          <h2 id="start-title" className="chapter-title">
            Start in one command.
          </h2>
          <p className="chapter-lede">
            Requires Node.js 22.19 or newer. No account, no telemetry, no
            control plane.
          </p>
          <button type="button" className="command command-primary close-command" onClick={copyInstall}>
            <span className="command-text">npm install -g atom-lite</span>
            <span className="copy-button" aria-hidden="true">
              <svg viewBox="0 0 20 20" className="copy-icon">
                <rect x="6.5" y="6.5" width="10" height="10" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <path d="M13.5 4.5h-8a1 1 0 0 0-1 1v8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <span className="sr-only" aria-live="polite">
              {copied ? "Install command copied" : ""}
            </span>
          </button>
          <p className="copy-note is-visible" role="status">
            {copied ? "Install command copied." : "\u00a0"}
          </p>
          <nav className="close-links" aria-label="Next steps">
            <a href="/docs">Read the documentation</a>
            <a href="https://github.com/beast-ofcourse/atom-lite" target="_blank" rel="noreferrer noopener">
              View the source
            </a>
          </nav>
        </div>
      </section>
    </div>
  );
}
