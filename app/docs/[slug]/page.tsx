import Link from "next/link";
import { notFound } from "next/navigation";
import { docs, getDoc, repositoryDocsUrl } from "@/lib/docs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc(slug);
  return {
    title: doc ? `${doc.title} — Atom-lite docs` : "Documentation — Atom-lite",
    description: doc?.intro,
  };
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const index = docs.findIndex((entry) => entry.slug === slug);
  const previous = docs[index - 1];
  const next = docs[index + 1];

  return (
    <article className="doc-sheet">
      <Link href="/docs" className="doc-back">
        ← Documentation index
      </Link>
      <h1>{doc.title}</h1>
      <p className="doc-intro">{doc.intro}</p>
      <a
        className="doc-source"
        href={`${repositoryDocsUrl}${doc.source}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        Source · {doc.source}
      </a>

      {doc.sections.map((section) => (
        <section className="doc-section" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.body?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.list && (
            <ul className="doc-list">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.code && <pre className="doc-code"><code>{section.code}</code></pre>}
        </section>
      ))}

      <nav className="doc-pager" aria-label="Documentation pages">
        {previous ? (
          <Link href={`/docs/${previous.slug}`}>← {previous.title}</Link>
        ) : (
          <span />
        )}
        {next ? <Link href={`/docs/${next.slug}`}>{next.title} →</Link> : <span />}
      </nav>
    </article>
  );
}
