import Link from "next/link";

type Page = "birds" | "history";

export default function SiteNav({ current }: { current: Page }) {
  const cur = (p: Page) => (p === current ? ("page" as const) : undefined);
  return (
    <nav className="top" aria-label="Site">
      <div className="wrap">
        <Link className="mark" href="/">Birds of Kawau</Link>
        <Link className="l" aria-current={cur("birds")} href="/#guide">Birds</Link>
        <Link className="l" aria-current={cur("history")} href="/history">History</Link>
        <a className="l" href="#sources">Sources</a>
      </div>
    </nav>
  );
}
