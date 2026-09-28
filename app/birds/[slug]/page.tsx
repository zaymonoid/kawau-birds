import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Credit from "@/components/Credit";
import SiteNav from "@/components/SiteNav";
import { birds, getBird, host, imageFor, maoriOf, originTag, statusTag, STORIES } from "@/lib/birds";

// .detail is 1.15fr / 1fr inside a 1120px wrap; one column under 860px
const HERO_SIZES = "(max-width: 860px) 100vw, (max-width: 1120px) 54vw, 550px";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return birds.map(({ sp }) => ({ slug: sp.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = getBird((await params).slug);
  if (!b) return {};
  return {
    title: `${b.sp.name} · The Birds of Kawau Island`,
    description: `${b.sp.name} on Kawau Island. ${b.sp.where}`,
  };
}

export default async function BirdPage({ params }: Props) {
  const b = getBird((await params).slug);
  if (!b) notFound();
  const { sp, group, prev, next } = b;
  const img = await imageFor(sp);
  const origin = originTag(sp);
  const status = statusTag(sp);
  const m = maoriOf(sp);
  const story = STORIES[sp.slug];

  return (
    <>
      <SiteNav current="birds" />

      <main className="bird-page">
        <div className="wrap">
          <Link className="back" href={`/#g-${group.group}`}>← {group.group_title}</Link>
          <article className="detail">
            {img ? (
              <figure className="d-img">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes={HERO_SIZES}
                  priority
                  placeholder="blur"
                  blurDataURL={img.blurDataURL}
                />
                <figcaption>
                  <Credit credit={img.credit} />
                </figcaption>
              </figure>
            ) : (
              <figure className="d-img empty" aria-hidden="true" />
            )}
            <div className="d-body">
              <div className="tags">
                <span className={`tag ${origin.cls}`}>{origin.label}</span>
                {status ? <span className={`tag ${status.cls}`} title={status.title}>{status.label}</span> : null}
              </div>
              <h1>{sp.name}</h1>
              <div className="nm">
                {m ? <><span className="mi">{m}</span> · </> : null}
                <span className="sci">{sp.sci}</span>
              </div>
              <p className="where">{sp.where}</p>
              {sp.presence_note ? <p className="pn">{sp.presence_note}</p> : null}
              <h2>Story</h2>
              <p>{sp.history}</p>
              <h2>Behaviour</h2>
              <p>{sp.behaviour}</p>
              <aside className="ff"><span>Did you know?</span> {sp.fun_fact}</aside>
              {story ? (
                <p className="more-story">
                  There’s more about this bird on Kawau in <Link href={`/history#story-${story}`}>the island’s history</Link>.
                </p>
              ) : null}
            </div>
          </article>
          <nav className="pager" aria-label="More birds">
            <Link className="prev" href={`/birds/${prev.slug}`}><span>Previous</span>{prev.name}</Link>
            <Link className="next" href={`/birds/${next.slug}`}><span>Next</span>{next.name}</Link>
          </nav>
        </div>
      </main>

      <section id="sources" style={{ borderBottom: 0 }}>
        <div className="wrap">
          <div className="eyebrow">Sources</div>
          <ul className="sources">
            {(sp.sources ?? []).map((u) => (
              <li key={u}><a href={u}>{host(u)}</a></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
