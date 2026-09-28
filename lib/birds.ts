// Build-time data for the field guide: data/birds.json plus the photo credits.
// Ported from the old tools/build.py generator.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMAGE_DIR = path.join(ROOT, "public", "images", "birds");

export const ORDER = ["seabirds", "shore", "wetland-ground", "forest", "hunters-travellers", "introduced"] as const;

// birds with a longer story on the History page (/history#story-<id>)
export const STORIES: Record<string, string> = {
  weka: "weka", kiwi: "kiwi", kookaburra: "kookaburra", peafowl: "peafowl", "pied-shag": "shag",
  kaka: "forest", kereru: "forest", tui: "forest", korora: "korora", pateke: "korora",
  "shining-cuckoo": "cuckoos", "long-tailed-cuckoo": "cuckoos",
};

export type Species = {
  slug: string;
  name: string;
  maori?: string;
  sci: string;
  origin?: string;
  threat_status?: string;
  history: string;
  behaviour: string;
  fun_fact: string;
  sources?: string[];
  where: string;
  presence_note?: string;
};

export type Group = {
  group: string;
  group_title: string;
  group_intro?: string;
  species: Species[];
};

export type Credit = {
  slug: string;
  commons_page_url?: string;
  author?: string;
  license?: string;
  license_ok?: boolean;
  kind?: "photo" | "illustration";
  suggested_alt?: string;
  focal_point?: string;
};

export type BirdImage = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  alt: string;
  focalPoint: string;
  credit: Credit;
};

export type Tag = { cls: string; label: string; title?: string };

const readJson = <T,>(p: string): T => JSON.parse(fs.readFileSync(p, "utf8")) as T;

const rawGroups = readJson<{ groups: Group[] }>(path.join(ROOT, "data", "birds.json")).groups;
const groupMap = new Map(rawGroups.map((g) => [g.group, g]));
for (const g of ORDER) if (!groupMap.has(g)) throw new Error(`data/birds.json is missing group ${g}`);

/** The six habitat groups, in page order. */
export const groups: Group[] = ORDER.map((g) => groupMap.get(g)!);

/** Every bird in page order, with its group. Also the prev/next order of the detail pages. */
export const birds: { group: Group; sp: Species }[] = groups.flatMap((group) => group.species.map((sp) => ({ group, sp })));

const credits = new Map<string, Credit>();
for (const f of ["credits.json", "credits-2.json"]) {
  const p = path.join(ROOT, "data", f);
  if (fs.existsSync(p)) for (const c of readJson<Credit[]>(p)) credits.set(c.slug, c);
}

export function getBird(slug: string) {
  const i = birds.findIndex((b) => b.sp.slug === slug);
  if (i < 0) return null;
  const n = birds.length;
  return { ...birds[i], prev: birds[(i - 1 + n) % n].sp, next: birds[(i + 1) % n].sp };
}

export function creditFor(slug: string): Credit | null {
  const c = credits.get(slug);
  return c && c.license_ok && fs.existsSync(path.join(IMAGE_DIR, `${slug}.jpg`)) ? c : null;
}

const imageCache = new Map<string, Promise<BirdImage | null>>();

/** The bird's photo with its real size and a tiny blurred placeholder, read from the file at build time. */
export function imageFor(sp: Species): Promise<BirdImage | null> {
  let p = imageCache.get(sp.slug);
  if (!p) {
    p = (async () => {
      const credit = creditFor(sp.slug);
      if (!credit) return null;
      const file = path.join(IMAGE_DIR, `${sp.slug}.jpg`);
      const img = sharp(file);
      const { width, height } = await img.metadata();
      const blur = await img.clone().resize(10, 10, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
      return {
        src: `/images/birds/${sp.slug}.jpg`,
        width: width!,
        height: height!,
        blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
        alt: credit.suggested_alt || sp.name,
        focalPoint: credit.focal_point || "50% 50%",
        credit,
      };
    })();
    imageCache.set(sp.slug, p);
  }
  return p;
}

const ORIGIN: Record<string, [string, string]> = {
  endemic: ["t-endemic", "Endemic"], native: ["t-native", "Native"],
  migrant: ["t-migrant", "Migrant"], introduced: ["t-intro", "Introduced"],
};

const titleCase = (s: string) => s.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

export function originTag(sp: Species): Tag {
  const o = sp.origin ?? "";
  const [cls, label] = ORIGIN[o] ?? ["t-native", titleCase(o)];
  return { cls, label };
}

/** Conservation status (NZTCS) as a short tag; none for introduced birds. */
export function statusTag(sp: Species): Tag | null {
  const s = (sp.threat_status ?? "").replace("(NZTCS)", "").trim();
  if (!s || s.startsWith("Introduced")) return null;
  const label = s.split("–").at(-1)!.trim().replace(/\s*\(.*?\)/g, "");
  const cls = s.startsWith("Threatened") ? "t-threat" : s.startsWith("At Risk") ? "t-risk" : "t-ok";
  return { cls, label, title: s };
}

/** "Photo"/"Illustration", the author without HTML, and the licence without its wiki template. */
export function creditParts(c: Credit) {
  return {
    kind: c.kind === "illustration" ? "Illustration" : "Photo",
    author: (c.author || "Unknown").replace(/<[^>]+>/g, "").trim(),
    licence: (c.license || "").replace(/ *[(].*$/, ""),
    href: c.commons_page_url ?? "",
  };
}

export function maoriOf(sp: Species) {
  return sp.maori && sp.maori.toLowerCase() !== sp.name.toLowerCase() ? sp.maori : "";
}

export function host(u: string) {
  const h = new URL(u).host;
  return h.startsWith("www.") ? h.slice(4) : h;
}
