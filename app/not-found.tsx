import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <span className="not-found-number">404</span>
      <h1>No card in that drawer.</h1>
      <p>The page you asked for is not filed here.</p>
      <Link href="/">Return to the front of the catalogue</Link>
    </div>
  );
}
