export type DocSection = {
  heading: string;
  body?: string[];
  list?: string[];
  code?: string;
};

export type DocPage = {
  slug: string;
  title: string;
  intro: string;
  source: string;
  sections: DocSection[];
};

export type DocGroup = {
  title: string;
  docs: DocPage[];
};

export const docGroups: DocGroup[] = [
  {
    title: "Get started",
    docs: [
      {
        slug: "install",
        title: "Install",
        intro:
          "Atom-lite needs Node.js 22.19 or newer. Install it globally, run it once with npx, or verify an existing install.",
        source: "docs/install.md",
        sections: [
          {
            heading: "Install and verify",
            code: "npm install -g atom-lite\natom-lite --version\natom-lite --help\natom-lite \"say hello\"",
          },
          {
            heading: "Run without installing",
            code: 'npx atom-lite "fix the failing test"',
          },
          {
            heading: "Default provider",
            body: [
              "The first run uses the Kilo AI Gateway at https://api.kilo.ai/api/gateway with the free kilo-auto/free model. No API key is required; anonymous use is rate-limited to 200 requests per hour per IP.",
            ],
            code: "atom-lite --provider ollama --model qwen2.5-coder:7b",
          },
        ],
      },
      {
        slug: "quickstart",
        title: "Quick start",
        intro:
          "Open a repository, start a conversation, and let the agent call tools. Sessions are stored as resumable JSONL logs grouped by workspace.",
        source: "docs/quickstart.md",
        sections: [
          {
            heading: "Your first session",
            body: [
              "Run atom-lite in the current directory. Ask a question at the prompt and press Enter. The agent streams its answer, calls tools when needed, and returns to the prompt.",
            ],
            code: "atom-lite\natom-lite \"explain the auth module\"\natom-lite --json \"list failing tests\" > result.json\necho \"summarize this repo\" | atom-lite",
          },
          {
            heading: "Resume work",
            code: "atom-lite --continue\natom-lite --session SESSION_ID\natom-lite --list-sessions\natom-lite --search-sessions \"auth\"",
          },
          {
            heading: "First settings",
            body: [
              "User config lives at ~/.config/atom-lite/config.json. Project config lives at <workspace>/.atom-lite/config.json and cannot set secrets or safety fields.",
            ],
            code: '{\n  "runtime": { "mode": "plan" },\n  "ui": { "theme": "auto" }\n}',
          },
        ],
      },
      {
        slug: "cli",
        title: "CLI",
        intro:
          "Run atom-lite in a project to open the full-screen terminal interface, or pass a task for a one-shot run.",
        source: "docs/cli.md",
        sections: [
          {
            heading: "Usage",
            code: "atom-lite [task] [--provider NAME] [--model MODEL] [--continue] [--session ID]\n          [--list-sessions] [--search-sessions QUERY] [--no-tools] [--json]\n          [--theme NAME] [--no-color] [--serve [PORT]] [--version] [--help]",
          },
          {
            heading: "Key flags",
            list: [
              "--provider NAME / --model MODEL — choose a profile or override the model",
              "--continue / --session ID — resume the latest or a specific session",
              "--list-sessions / --search-sessions QUERY — inspect the index",
              "--no-tools — model-only chat; --json — non-interactive output",
              "--serve [PORT] — browser UI on localhost; --share — outbound tunnel",
            ],
          },
          {
            heading: "Terminal interface",
            body: [
              "The prompt accepts tasks and slash commands. /help lists every command; ctrl+p opens the fuzzy command palette. Tab toggles plan/yolo mode and Escape cancels the active turn. Set ui.mouse to false to disable wheel scrolling and click-to-focus.",
            ],
          },
          {
            heading: "Non-interactive use",
            body: [
              "Without a TTY, approval requests are denied rather than hanging. Use --json for scripted runs.",
            ],
            code: 'atom-lite --json "find unused exports" > result.json',
          },
        ],
      },
    ],
  },
  {
    title: "Use",
    docs: [
      {
        slug: "commands",
        title: "Commands",
        intro:
          "Type /help in the prompt to list every command grouped by category. ctrl+p opens the fuzzy command palette.",
        source: "docs/commands.md",
        sections: [
          {
            heading: "General and model",
            list: [
              "/help — grouped command list; /doctor — diagnostics",
              "/model [model] — fuzzy picker or direct switch",
              "/provider [profile] — add or select a provider",
              "/effort [low|medium|high] — reasoning effort",
              "/thinking — toggle thinking display; /theme — live-preview theme picker",
            ],
          },
          {
            heading: "Agent and goals",
            list: [
              "/agents — list primary personas; /agent [name] — switch",
              "/goal set, criteria, constraints, pause, resume, clear, complete, status",
            ],
            body: [
              "Bare /goal prints the statement, criteria, status, constraints, and open-todo count. The statement and criteria are user-owned; the model may only read them and mark a goal complete with evidence.",
            ],
          },
          {
            heading: "Sessions",
            list: [
              "/sessions [all] — resume here or across workspaces",
              "/search <query> — matching sessions with snippets",
              "/rename, /new, /compact [focus], /diff, /export, /steer",
            ],
          },
          {
            heading: "Extensions and skills",
            list: [
              "/skills, /skill <name>, /extensions [doctor], /reload",
              "/trust allow|deny|reset — project trust for local extensions and personas",
              "/mcp [reconnect [server]] — list or reconnect MCP servers",
            ],
          },
          {
            heading: "Arguments",
            body: [
              "Commands parse the text after the name as one argument string; quotes are not required for multi-word values. Unknown names print usage and never fall through to the agent as a prompt.",
            ],
          },
        ],
      },
      {
        slug: "tools",
        title: "Tools",
        intro:
          "Atom-lite ships ten built-in tools. The model chooses which to call; the runtime validates arguments, applies permissions, and schedules execution.",
        source: "docs/tools.md",
        sections: [
          {
            heading: "The catalogue",
            list: [
              "read — inspect a file, with optional line ranges",
              "write — create or replace a file, guarded by expected_hash",
              "edit — find-and-replace edit, guarded by expected_hash",
              "bash — shell commands; tests, Git, builds, and formatters go here",
              "grep — ripgrep content search with a JavaScript fallback",
              "glob — find files matching a glob pattern",
              "webfetch — fetch a URL and convert HTML to markdown",
              "websearch — search the web and return ranked results",
              "task — query or control a background bash task",
              "todo — maintain the session task ledger",
            ],
          },
          {
            heading: "Scheduling",
            body: [
              "A tool-call batch runs with at most runtime.maxParallelToolCalls (default 10) concurrent calls. Per-file read/write locks prevent conflicting edits. bash is a global exclusive barrier unless runtime.bashConcurrency is parallel. Each result is capped at 30000 bytes; a bash call times out after 120000 ms.",
            ],
          },
          {
            heading: "Background tasks and guards",
            body: [
              "bash with { \"background\": true } returns a task id; task inspects output, checks status, or stops it. Background tasks belong to one turn. write and edit accept expected_hash and return FILE_CHANGED_SINCE_READ when a file changed after it was read. Plan mode blocks write, edit, and bash; the todo and goal tools stay available because they change session state, not the workspace.",
            ],
          },
        ],
      },
      {
        slug: "sessions",
        title: "Sessions",
        intro:
          "A session is an append-only JSONL event log under the user config directory. It records messages, tool calls, approvals, and state changes, and is resumable across restarts.",
        source: "docs/sessions.md",
        sections: [
          {
            heading: "Lifecycle",
            body: [
              "A new session stays in memory until its first message, so creating one and quitting leaves no file. The index derives a title from the first user message until /rename rename <title> overrides it.",
            ],
            code: "atom-lite --continue\natom-lite --session SESSION_ID\natom-lite --list-sessions\natom-lite --search-sessions \"auth\"",
          },
          {
            heading: "Ownership",
            body: [
              "A sibling <sessionId>.jsonl.lock records the owning process. The terminal and the browser server both take this lock, so one session cannot be driven from two places at once. A lock left by a killed process is reclaimed automatically.",
            ],
          },
          {
            heading: "Compaction and retention",
            body: [
              "The context manager summarizes older history before the budget is exceeded while the full transcript stays on disk. Goal, ledger, criteria, active paths, and a bounded recent tail are injected alongside the summary. sessions.retentionDays deletes older sessions; null keeps everything.",
            ],
          },
          {
            heading: "Recovery",
            body: [
              "Automatic checkpoints are not part of the product. Use git for undo and /diff to review workspace changes.",
            ],
          },
        ],
      },
      {
        slug: "goals",
        title: "Goals",
        intro:
          "A goal is a durable anchor for long work: one statement, success criteria, a lifecycle status, and optional constraints. It survives compaction and session resume.",
        source: "docs/goals.md",
        sections: [
          {
            heading: "Fields and ownership",
            list: [
              "Statement — user-owned; /goal set",
              "Criteria — user-owned; /goal criteria, separated by lines or ;",
              "Constraints — user-owned; /goal constraints",
              "Status — active, paused, or complete; Todos — model-owned ledger",
            ],
            body: [
              "The model can read the goal through the goal tool but cannot rewrite the statement, criteria, or constraints.",
            ],
          },
          {
            heading: "Lifecycle",
            code: "/goal set Ship the login fix\n/goal criteria tests pass; docs updated\n/goal constraints no new dependencies\n/goal pause\n/goal resume\n/goal complete \"CI green and README updated\"",
          },
          {
            heading: "Pause and completion",
            body: [
              "Pause is a goal status, not plan mode: in-flight tools finish, then no new iteration starts. The completion gate rejects a completion call unless every criterion is backed by a completed todo or explicit evidence; unmet criteria are named in the error. The gate is soft — the run can continue.",
            ],
          },
        ],
      },
      {
        slug: "safety",
        title: "Safety",
        intro:
          "Atom-lite keeps a small set of explicit boundaries. The model chooses tools; the runtime enforces these rules.",
        source: "docs/safety.md",
        sections: [
          {
            heading: "Workspace boundary",
            body: [
              "read, write, and edit resolve paths against the workspace and reject escapes. Shell commands are not constrained by this boundary, so bash runs as a global exclusive barrier by default. Outside-workspace access and shell calls require approval interactively; non-interactive runs deny them.",
            ],
          },
          {
            heading: "Modes and approvals",
            list: [
              "plan — read-only tools, including tools declaring readOnlyHint",
              "yolo — every tool; the default",
              "Approval choices: y approve, n deny, t trust for session",
            ],
            body: [
              "The approval dialog shows the exact command, working directory, timeout, and sandbox status. Escape denies; a dropped browser tab fails safe as a denial after the grace period.",
            ],
          },
          {
            heading: "Trust and secrets",
            body: [
              "Project-local extensions and personas are discovered but disabled until the project is approved. API keys are stored in credentials.json with 0600 permissions; environment variables take precedence. Secrets are never written to project config, session files, or exported transcripts.",
            ],
          },
          {
            heading: "Local-first",
            body: [
              "No cloud account, telemetry, or control plane is required. The optional browser surface binds 127.0.0.1; share mode opens an outbound tunnel and keeps the local bind unchanged.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Customize",
    docs: [
      {
        slug: "config",
        title: "Config",
        intro:
          "Atom-lite is configured with JSON files and a small set of environment variables. Set only the options you need.",
        source: "docs/config.md",
        sections: [
          {
            heading: "Files",
            list: [
              "User — ${XDG_CONFIG_HOME:-~/.config}/atom-lite/config.json",
              "Project — <workspace>/.atom-lite/config.json (non-secrets only)",
              "Credentials — ${XDG_CONFIG_HOME:-~/.config}/atom-lite/credentials.json (0600)",
            ],
          },
          {
            heading: "Precedence",
            body: [
              "Low to high: defaults, user config, project config, environment variables, CLI and API overrides. Objects merge key by key. runtime.mode, token budgets, runtime.agent, and the whole ui section are read only from user config or the environment so a repository cannot relax safety settings, select a persona, or change your editor behaviour.",
            ],
          },
          {
            heading: "Top-level keys",
            list: [
              "defaultProvider, providers, runtime, context, sessions",
              "lsp, ui, keybindings, mcpServers, extensions",
            ],
            body: [
              "Key runtime limits include maxParallelToolCalls (10), maxToolOutputBytes (30000), maxBashTimeMs (120000), and bashConcurrency (serial). Context compaction triggers at 85 percent by default; reserveOutputTokens is 4096.",
            ],
          },
          {
            heading: "Environment",
            list: [
              "ATOM_LITE_PROVIDER — default provider profile",
              "ATOM_LITE_MODE — plan or yolo",
              "NO_COLOR — force the no-colour theme; COLORFGBG — light/dark detection",
            ],
          },
        ],
      },
      {
        slug: "providers",
        title: "Providers",
        intro:
          "A provider profile names an endpoint, a model, and a credential source. The model is a choice, not a lock-in.",
        source: "docs/providers.md",
        sections: [
          {
            heading: "Adapters",
            list: [
              "openai-compatible — LM Studio, llama.cpp, Kilo, OpenAI, Anthropic, OpenRouter, Groq, Mistral, xAI",
              "ollama — native Ollama chat API",
              "gemini — official Gemini API",
            ],
            body: [
              "Every profile requires type and model. baseUrl defaults per adapter; profiles can also set headers, options, think, keepAlive, and contextWindow.",
            ],
          },
          {
            heading: "Default and setup",
            body: [
              "The built-in kilo profile points at the Kilo AI Gateway with kilo-auto/free and needs no key. /provider lists built-in providers; /model opens a picker over every configured provider's models. Selections persist to user config.",
            ],
            code: "atom-lite --provider ollama\natom-lite --model gemini-2.0-flash\n/provider openai\n/model openai/gpt-4o-mini",
          },
          {
            heading: "Credentials and context window",
            body: [
              "Lookup order: the environment variable named by apiKeyEnv, the stored credential in credentials.json, then inline apiKey. The status meter and compaction budget resolve the model window from contextWindow, live provider metadata, then a built-in table of known model families.",
            ],
          },
        ],
      },
      {
        slug: "agents",
        title: "Agent personas",
        intro:
          "Primary agent personas are reusable prompt and permission presets for the one Atom-lite agent loop. A persona does not create a second agent, conversation, or tool registry.",
        source: "docs/agents.md",
        sections: [
          {
            heading: "Use",
            code: "/agents\n/agent reviewer",
            body: [
              "The active persona appears as agent:<name> in the status line. Switching rebuilds the system prompt on the next turn and leaves session messages intact. Set runtime.agent in user config to load one at startup; project config cannot select a persona.",
            ],
          },
          {
            heading: "Locations and trust",
            body: [
              "Personas are Markdown files with YAML frontmatter. Discovery order is bundled, global, .opencode, then .atom-lite — later entries override by name. Only files with mode: primary are selectable. Project-local personas require the same project trust as local extensions.",
            ],
          },
          {
            heading: "Permissions",
            body: [
              "A permission map sets allow, ask, or deny per tool. Exact patterns beat globs; the most specific glob wins otherwise. allow runs without a prompt, ask uses the approval flow, and deny blocks the call before execution.",
            ],
          },
        ],
      },
      {
        slug: "extensions",
        title: "Extensions",
        intro:
          "Atom-lite hosts unmodified Pi coding-agent extensions in-process. Load one for a single run or install it in a user or project directory.",
        source: "docs/extensions.md",
        sections: [
          {
            heading: "Discovery and trust",
            code: "atom-lite -e ./my-extension\n/extensions doctor",
            body: [
              "Extensions are discovered from CLI paths, Atom-lite's own directories, and Pi's discovery locations and manifests. Project-local extensions are skipped until the project is trusted; user, global, and CLI extensions load normally.",
            ],
          },
          {
            heading: "Compatibility tiers",
            list: [
              "Tier 1 — discovery, trust, tools, commands, events, session entries, UI surfaces, providers",
              "Tier 2 — renderers, transformers, shortcuts, flags, autocomplete, chrome — compatible surface, staged",
              "Tier 3 — session forks, codemode, MCP registration, OAuth, RPC — deliberately deferred and fail loudly",
            ],
          },
          {
            heading: "Diagnostics",
            body: [
              "Use /extensions to list discovered extensions and /extensions doctor for per-extension load status, tool and command counts, and errors. Pi extensions using export default function (pi) or export async function activate(pi) work unchanged.",
            ],
          },
        ],
      },
      {
        slug: "web",
        title: "Web UI",
        intro:
          "The browser surface runs the same runtime, tools, sessions, and approvals as the terminal.",
        source: "docs/web.md",
        sections: [
          {
            heading: "Start and boundaries",
            code: "atom-lite --serve          # port 7317, or next free port\natom-lite --serve 8765",
            body: [
              "The command prints a localhost URL with a per-run token; treat it as a secret while the server runs. The server binds 127.0.0.1 only, rejects foreign Origin and Host headers, and the terminal and server take the same per-session lock. The first tab controls the session; later tabs are read-only viewers.",
            ],
          },
          {
            heading: "Use",
            body: [
              "The model chip opens a catalog refreshed from configured providers. The composer switches effort and mode, attaches files, and becomes a Stop control during a turn. ctrl/cmd+o opens the directory explorer; ctrl/cmd+k opens the command palette. Markdown, highlighted code, local images, Mermaid diagrams, and inline diffs render in the transcript.",
            ],
          },
          {
            heading: "Phone access",
            body: [
              "Install cloudflared, then run atom-lite --serve --share. The server stays on 127.0.0.1 while an outbound HTTPS tunnel publishes it; the shared URL contains the run token. Use --tunnel-command for another provider and --no-qr when the terminal cannot draw the code.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Reference",
    docs: [
      {
        slug: "troubleshooting",
        title: "Troubleshooting",
        intro:
          "Common failures and their exact fixes, from unreachable providers to locked sessions and config errors.",
        source: "docs/troubleshooting.md",
        sections: [
          {
            heading: "Provider and model",
            body: [
              "Check the selected profile and endpoint with atom-lite --help and a direct --provider/--model run. Local servers need the correct baseUrl: Ollama uses http://127.0.0.1:11434 and OpenAI-compatible servers usually expose a /v1 path. Set contextWindow for local models without metadata; /model includes providers whose key is present in the environment.",
            ],
          },
          {
            heading: "Sessions and edits",
            body: [
              "A locked session means another process owns it; the refusal names the holder, and locks left by killed processes are reclaimed. FILE_CHANGED_SINCE_READ means the file changed after it was read — re-read it and retry; do not disable hash guards.",
            ],
          },
          {
            heading: "Approvals, goals, and colour",
            body: [
              "In the terminal press y, n, or t; Escape denies. Non-interactive runs always deny. /goal pause freezes new iterations after in-flight work finishes — use /goal resume or /goal clear. NO_COLOR and --no-color force the no-colour theme; /theme auto follows the terminal report, then COLORFGBG.",
            ],
          },
          {
            heading: "Config errors",
            body: [
              "Malformed JSON reports Invalid JSON in config file: <path>. Unknown keys are rejected by the strict schema and validation errors name the offending path. Project config cannot set mode, token budgets, agent, ui, mcpServers, or extensions.",
            ],
          },
        ],
      },
    ],
  },
];

export const docs: DocPage[] = docGroups.flatMap((group) => group.docs);

export function getDoc(slug: string) {
  return docs.find((doc) => doc.slug === slug);
}

export const repositoryDocsUrl =
  "https://github.com/beast-ofcourse/atom-lite/blob/master/";
