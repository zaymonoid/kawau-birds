import Image from "next/image";
import Link from "next/link";
import { imageFor, maoriOf, type Species } from "@/lib/birds";

// .gal is auto-fill minmax(176px, 1fr): two columns under 560px, roughly 176–250px wide above
const TILE_SIZES = "(max-width: 560px) calc(50vw - 22px), (max-width: 1080px) 250px, 200px";

export default async function BirdTile({ sp }: { sp: Species }) {
  const img = await imageFor(sp);
  const m = maoriOf(sp);
  return (
    <Link className="tile" id={`sp-${sp.slug}`} href={`/birds/${sp.slug}`}>
      <span className="ti">
        {img ? (
          <Image
            src={img.src}
            alt=""
            width={img.width}
            height={img.height}
            sizes={TILE_SIZES}
            placeholder="blur"
            blurDataURL={img.blurDataURL}
            style={{ objectPosition: img.focalPoint }}
          />
        ) : (
          <span className="ph-empty">{(sp.maori || sp.name).slice(0, 1).toUpperCase()}</span>
        )}
        {sp.presence_note ? <span className="rare">Rare here</span> : null}
      </span>
      <span className="tt">
        <span className="tn">{sp.name}</span>
        {m ? <span className="tm">{m}</span> : null}
      </span>
    </Link>
  );
}
