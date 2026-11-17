import Link from "next/link";
import { docGroups } from "@/lib/docs";

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="docs-page">
      <PaperBackdrop />
      <header className="topbar docs-topbar">
        <Link className="brand" href="/" aria-label="Atom-lite home">
          <svg className="atom-mark" viewBox="0 0 32 32" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <ellipse cx="16" cy="16" rx="12.5" ry="4.8" />
              <ellipse cx="16" cy="16" rx="12.5" ry="4.8" transform="rotate(60 16 16)" />
              <ellipse cx="16" cy="16" rx="12.5" ry="4.8" transform="rotate(120 16 16)" />
            </g>
            <circle cx="16" cy="16" r="2.4" fill="var(--stamp)" />
          </svg>
          <span className="brand-name">atom-lite</span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <Link href="/docs">Docs</Link>
          <a href="https://github.com/beast-ofcourse/atom-lite" target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
        </nav>
      </header>

      <div className="docs-body">
        <aside className="docs-rail" aria-label="Documentation navigation">
          <span className="docs-rail-label">Catalogue</span>
          <nav>
            <Link href="/docs" className="docs-rail-link">
              Index
            </Link>
            {docGroups.map((group) => (
              <div className="docs-rail-group" key={group.title}>
                <span className="docs-rail-group-title">{group.title}</span>
                {group.docs.map((doc) => (
                  <Link
                    href={`/docs/${doc.slug}`}
                    className="docs-rail-link"
                    key={doc.slug}
                  >
                    {doc.title}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
          <div className="docs-rail-foot">
            <span>v0.16.2</span>
            <span>MIT licensed</span>
          </div>
        </aside>
        <main className="docs-main" id="main">{children}</main>
      </div>
    </div>
  );
}

function PaperBackdrop() {
  return <div className="docs-backdrop" aria-hidden="true" />;
}
