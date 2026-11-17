import Link from "next/link";
import { docGroups } from "@/lib/docs";

export const metadata = {
  title: "Documentation — Atom-lite",
  description:
    "Install, use, configure, and extend Atom-lite, a local-first coding agent for the terminal.",
};

export default function DocsIndex() {
  return (
    <article className="doc-sheet">
      <h1>Documentation</h1>
      <p className="doc-intro">
        These pages mirror the published documentation for Atom-lite 0.16.2.
        Every page documents shipped behavior and gives copy-pasteable examples.
      </p>

      {docGroups.map((group, groupIndex) => (
        <section className="doc-group" key={group.title}>
          <h2>
            <span>{String(groupIndex + 1).padStart(2, "0")}</span>
            {group.title}
          </h2>
          <ol className="doc-index">
            {group.docs.map((doc) => (
              <li key={doc.slug}>
                <Link href={`/docs/${doc.slug}`}>
                  <span className="doc-index-title">{doc.title}</span>
                  <span className="doc-index-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <div className="doc-aside">
        <h2>More in the repository</h2>
        <p>
          Release history, contribution rules, and the security policy live
          alongside the source.
        </p>
        <ul className="doc-repo-links">
          <li>
            <a
              href="https://github.com/beast-ofcourse/atom-lite/blob/master/CHANGELOG.md"
              target="_blank"
              rel="noreferrer noopener"
            >
              CHANGELOG
            </a>
          </li>
          <li>
            <a
              href="https://github.com/beast-ofcourse/atom-lite/blob/master/CONTRIBUTING.md"
              target="_blank"
              rel="noreferrer noopener"
            >
              CONTRIBUTING
            </a>
          </li>
          <li>
            <a
              href="https://github.com/beast-ofcourse/atom-lite/blob/master/SECURITY.md"
              target="_blank"
              rel="noreferrer noopener"
            >
              SECURITY
            </a>
          </li>
        </ul>
      </div>
    </article>
  );
}
