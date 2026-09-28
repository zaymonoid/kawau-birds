import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import BirdTile from "@/components/BirdTile";
import Credit from "@/components/Credit";
import SiteNav from "@/components/SiteNav";
import { birds, creditFor, groups } from "@/lib/birds";

export const metadata = {
  title: "The Birds of Kawau Island",
  description:
    "A field guide to the birds of Kawau Island (Te Kawau Tūmaro o Toi) in the Hauraki Gulf, where kiwi, weka and kākā share the bush with Australian kookaburras and a governor's peacocks.",
};

// The topographic map is kept byte-for-byte in kawau-map.svg; only its inner markup is injected.
const mapSvg = fs.readFileSync(path.join(process.cwd(), "app", "kawau-map.svg"), "utf8");
const mapInner = mapSvg.slice(mapSvg.indexOf(">") + 1, mapSvg.lastIndexOf("</svg>"));

export default function Home() {
  return (
    <>
      <SiteNav current="birds" />

      <header className="hero" id="top">
        <svg
          className="contours"
          viewBox="0 0 1051 1106"
          preserveAspectRatio="xMaxYMid meet"
          aria-hidden="true"
          focusable="false"
          dangerouslySetInnerHTML={{ __html: mapInner }}
        />
        <div className="wrap">
          <div className="eyebrow">A field guide · Hauraki Gulf, Aotearoa New Zealand</div>
          <h1>
            The Birds of
            <br />
            <em>Kawau Island</em>
          </h1>
          <div className="reo">Te Kawau Tūmaro o Toi — the shag standing sentinel</div>
          <p className="lede">
            A small island forty kilometres north of Auckland where kiwi forage in the gullies, most of the world's North
            Island weka once lived, and an Australian kookaburra laughs over the bush. It's there because a
            nineteenth-century governor wanted his own Eden.
          </p>
          <div className="facts">
            <div><b>~2,000 ha</b><span>about 8 × 5 km, bisected by Bon Accord Harbour</span></div>
            <div><b>50+</b><span>bird species recorded through the year</span></div>
            <div><b>1862</b><span>the year Sir George Grey bought the island</span></div>
            <div><b>&lt;500</b><span>kookaburras in all of NZ, and every one descends from Kawau's</span></div>
          </div>
        </div>
      </header>

      <main>
        <section id="guide" className="directory">
          <div className="wrap">
            <div className="dir-head">
              <div className="eyebrow">Field guide</div>
              <h2>Which bird did you see?</h2>
              <p className="intro">
                From kiwi in the gullies to gannets offshore, {birds.length} kinds of bird live on or visit Kawau. Find
                yours below, then tap it for its story, its habits and the best places to look for it on the island.
              </p>
            </div>
            <div className="dir">
              <nav className="toc" aria-label="Birds by group">
                <div className="toc-title">Jump to</div>
                <ol>
                  {groups.map((g) => (
                    <li key={g.group}>
                      <a className="tg" href={`#g-${g.group}`}>{g.group_title}</a>
                      <ol>
                        {g.species.map((sp) => (
                          <li key={sp.slug}>
                            <Link href={`/birds/${sp.slug}`}>{sp.name}</Link>
                          </li>
                        ))}
                      </ol>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="dir-main">
                <nav className="chips" aria-label="Bird groups">
                  {groups.map((g) => (
                    <a key={g.group} href={`#g-${g.group}`}>
                      {g.group_title} <span>{g.species.length}</span>
                    </a>
                  ))}
                </nav>
                {groups.map((g) => (
                  <section key={g.group} id={`g-${g.group}`} className="gal-group">
                    <div className="gh">
                      <h3>{g.group_title}</h3>
                      <p>{g.group_intro}</p>
                    </div>
                    <div className="gal">
                      {g.species.map((sp) => (
                        <BirdTile key={sp.slug} sp={sp} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="sources" style={{ borderBottom: 0 }}>
          <div className="wrap">
            <div className="eyebrow">Sources</div>
            <h2 style={{ fontSize: 32 }}>Sources &amp; credits</h2>
            <ul className="sources">
              <li>Each bird's page lists the sources for its story and facts.</li>
              <li>
                Background reading on the island and its history is on the <Link href="/history#sources">History</Link>{" "}
                page.
              </li>
              <li>
                Map elevation: <a href="https://registry.opendata.aws/copernicus-dem/">Copernicus GLO-30 DEM</a> © DLR
                e.V. 2010–2014 and © Airbus Defence and Space GmbH 2014–2018, provided under COPERNICUS by the European
                Union and ESA, via AWS Open Data. Contours at 20&nbsp;m derived for this page.
              </li>
            </ul>
            <details className="more">
              <summary>Photo and illustration credits</summary>
              <ul className="sources">
                {birds.map(({ sp }) => {
                  const c = creditFor(sp.slug);
                  return c ? (
                    <li key={sp.slug}>
                      <Link href={`/birds/${sp.slug}`}>{sp.name}</Link>: <Credit credit={c} />
                    </li>
                  ) : null;
                })}
              </ul>
            </details>
          </div>
        </section>
      </main>
    </>
  );
}
