"""Build the generated parts of the site from data/birds.json and images/birds/credits*.json.

    python3 tools/build.py

Writes (idempotent):
  - index.html        the bird directory and credits, between the <!-- ... START/END --> markers
  - birds/<slug>/     one detail page per bird
  - assets/site.css   the generated "field guide" block
Gallery thumbnails live in images/birds/thumbs/, made with:
    sips -Z 440 -s format jpeg -s formatOptions 66 <slug>.jpg --out thumbs/<slug>.jpg
"""
import json, os, re, html, shutil
from urllib.parse import urlparse

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGE = os.path.join(REPO, "index.html")
CSS = os.path.join(REPO, "assets", "site.css")
ORDER = ["seabirds", "shore", "wetland-ground", "forest", "hunters-travellers", "introduced"]
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..600'
         '&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">')
# birds with a longer story on the History page (history/#story-<id>)
STORIES = {"weka": "weka", "kiwi": "kiwi", "kookaburra": "kookaburra", "peafowl": "peafowl", "pied-shag": "shag",
           "kaka": "forest", "kereru": "forest", "tui": "forest", "korora": "korora", "pateke": "korora",
           "shining-cuckoo": "cuckoos", "long-tailed-cuckoo": "cuckoos"}
e = lambda s: html.escape(s or "", quote=True)

# ---------- load ----------
groups = {g["group"]: g for g in json.load(open(os.path.join(REPO, "data", "birds.json")))["groups"]}
assert all(g in groups for g in ORDER)
birds = [(g, sp) for g in ORDER for sp in groups[g]["species"]]

credits = {}
for f in ("credits.json", "credits-2.json"):
    p = os.path.join(REPO, "images", "birds", f)
    if os.path.exists(p):
        for c in json.load(open(p)):
            credits[c["slug"]] = c

def image_for(slug):
    c = credits.get(slug)
    if c and c.get("license_ok") and os.path.exists(os.path.join(REPO, "images", "birds", f"{slug}.jpg")):
        return c
    return None

ORIGIN = {"endemic": ("t-endemic", "Endemic"), "native": ("t-native", "Native"),
          "migrant": ("t-migrant", "Migrant"), "introduced": ("t-intro", "Introduced")}

def status_tag(s):
    s = (s or "").replace("(NZTCS)", "").strip()
    if not s or s.startswith("Introduced"):
        return ""
    short = re.sub(r"\s*\(.*?\)", "", s.split("–")[-1].strip())
    cls = "t-threat" if s.startswith("Threatened") else ("t-risk" if s.startswith("At Risk") else "t-ok")
    return f'<span class="tag {cls}" title="{e(s)}">{e(short)}</span>'

def credit_line(c):
    kind = "Illustration" if c.get("kind") == "illustration" else "Photo"
    author = re.sub(r"<[^>]+>", "", c.get("author") or "Unknown").strip()
    lic = re.sub(r" *[(].*$", "", c.get("license") or "")
    return f'{kind}: <a href="{e(c.get("commons_page_url"))}">{e(author)}</a> · {e(lic)}'

def host(u):
    h = urlparse(u).netloc
    return h[4:] if h.startswith("www.") else h

def maori_of(sp):
    return sp["maori"] if sp.get("maori") and sp["maori"].lower() != sp["name"].lower() else ""

def nav(root, current):
    cur = ' aria-current="page"'
    links = [("Birds", f"{root}#guide", "birds"), ("History", f"{root}history/", "history"), ("Sources", "#sources", "sources")]
    items = "\n".join(f'    <a class="l"{cur if k == current else ""} href="{h}">{l}</a>' for l, h, k in links)
    return f'''<nav class="top" aria-label="Site">
  <div class="wrap">
    <a class="mark" href="{root}">Birds of Kawau</a>
{items}
  </div>
</nav>'''

FOOTER = '''<footer>
  <div class="wrap">The Birds of Kawau Island · A field guide to Te Kawau Tūmaro o Toi, Hauraki Gulf</div>
</footer>'''

# ---------- home: directory ----------
def tile(sp):
    slug = sp["slug"]
    c = image_for(slug)
    thumb = f"images/birds/thumbs/{slug}.jpg"
    if c and os.path.exists(os.path.join(REPO, thumb)):
        img = (f'<img src="{thumb}" alt="" loading="lazy" decoding="async" '
               f'style="object-position:{e(c.get("focal_point") or "50% 50%")}">')
    else:
        img = f'<span class="ph-empty">{e((sp.get("maori") or sp["name"])[:1].upper())}</span>'
    rare = '<span class="rare">Rare here</span>' if sp.get("presence_note") else ""
    m = maori_of(sp)
    tm = f'<span class="tm">{e(m)}</span>' if m else ""
    return (f'        <a class="tile" id="sp-{slug}" href="birds/{slug}/">'
            f'<span class="ti">{img}{rare}</span>'
            f'<span class="tt"><span class="tn">{e(sp["name"])}</span>{tm}</span></a>')

chips = "".join(f'<a href="#g-{g}">{e(groups[g]["group_title"])} <span>{len(groups[g]["species"])}</span></a>' for g in ORDER)
sections = []
for g in ORDER:
    grp = groups[g]
    tiles = "\n".join(tile(sp) for sp in grp["species"])
    sections.append(f'''    <section id="g-{g}" class="gal-group">
      <div class="gh">
        <h3>{e(grp["group_title"])}</h3>
        <p>{e(grp.get("group_intro"))}</p>
      </div>
      <div class="gal">
{tiles}
      </div>
    </section>''')
guide = f'''<!-- FIELD GUIDE START -->
<section id="guide" class="directory">
  <div class="wrap">
    <div class="dir-head">
      <div class="eyebrow">Field guide</div>
      <h2>Which bird did you see?</h2>
      <p class="intro">From kiwi in the gullies to gannets offshore, {len(birds)} kinds of bird live on or visit Kawau. Find yours below, then tap it for its story, its habits and the best places to look for it on the island.</p>
      <nav class="chips" aria-label="Bird groups">{chips}</nav>
    </div>
{chr(10).join(sections)}
  </div>
</section>
<!-- FIELD GUIDE END -->'''

# ---------- home: credits ----------
photo_credits = "".join(f'<li><a href="birds/{sp["slug"]}/">{e(sp["name"])}</a>: {credit_line(image_for(sp["slug"]))}</li>'
                        for _, sp in birds if image_for(sp["slug"]))
sources = f'''<!-- SOURCES START -->
<section id="sources" style="border-bottom:0">
  <div class="wrap">
    <div class="eyebrow">Sources</div>
    <h2 style="font-size:32px">Sources &amp; credits</h2>
    <ul class="sources">
      <li>Each bird's page lists the sources for its story and facts.</li>
      <li>Background reading on the island and its history is on the <a href="history/#sources">History</a> page.</li>
      <li>Map elevation: <a href="https://registry.opendata.aws/copernicus-dem/">Copernicus GLO-30 DEM</a> © DLR e.V. 2010–2014 and © Airbus Defence and Space GmbH 2014–2018, provided under COPERNICUS by the European Union and ESA, via AWS Open Data. Contours at 20&nbsp;m derived for this page.</li>
    </ul>
    <details class="more">
      <summary>Photo and illustration credits</summary>
      <ul class="sources">{photo_credits}</ul>
    </details>
  </div>
</section>
<!-- SOURCES END -->'''

# ---------- detail pages ----------
def detail(i, g, sp):
    slug, root = sp["slug"], "../../"
    grp = groups[g]
    c = image_for(slug)
    cls, label = ORIGIN.get(sp.get("origin", ""), ("t-native", sp.get("origin", "").title()))
    if c:
        fig = (f'<figure class="d-img"><img src="{root}images/birds/{slug}.jpg" alt="{e(c.get("suggested_alt") or sp["name"])}">'
               f'<figcaption>{credit_line(c)}</figcaption></figure>')
    else:
        fig = '<figure class="d-img empty" aria-hidden="true"></figure>'
    m = maori_of(sp)
    names = (f'<span class="mi">{e(m)}</span> · ' if m else "") + f'<span class="sci">{e(sp["sci"])}</span>'
    presence = f'\n        <p class="pn">{e(sp["presence_note"])}</p>' if sp.get("presence_note") else ""
    story = (f'\n        <p class="more-story">There’s more about this bird on Kawau in '
             f'<a href="{root}history/#story-{STORIES[slug]}">the island’s history</a>.</p>') if slug in STORIES else ""
    srcs = "".join(f'<li><a href="{e(u)}">{e(host(u))}</a></li>' for u in sp.get("sources", []))
    prev = birds[i - 1][1]
    nxt = birds[(i + 1) % len(birds)][1]
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(sp["name"])} · The Birds of Kawau Island</title>
<meta name="description" content="{e(sp["name"] + " on Kawau Island. " + sp["where"])}">
{FONTS}
<link rel="stylesheet" href="{root}assets/site.css">
</head>
<body>

{nav(root, "birds")}

<main class="bird-page">
  <div class="wrap">
    <a class="back" href="{root}#g-{g}">← {e(grp["group_title"])}</a>
    <article class="detail">
      {fig}
      <div class="d-body">
        <div class="tags"><span class="tag {cls}">{label}</span>{status_tag(sp.get("threat_status"))}</div>
        <h1>{e(sp["name"])}</h1>
        <div class="nm">{names}</div>
        <p class="where">{e(sp["where"])}</p>{presence}
        <h2>Story</h2>
        <p>{e(sp["history"])}</p>
        <h2>Behaviour</h2>
        <p>{e(sp["behaviour"])}</p>
        <aside class="ff"><span>Did you know?</span> {e(sp["fun_fact"])}</aside>{story}
      </div>
    </article>
    <nav class="pager" aria-label="More birds">
      <a class="prev" href="{root}birds/{prev["slug"]}/"><span>Previous</span>{e(prev["name"])}</a>
      <a class="next" href="{root}birds/{nxt["slug"]}/"><span>Next</span>{e(nxt["name"])}</a>
    </nav>
  </div>
</main>

<section id="sources" style="border-bottom:0">
  <div class="wrap">
    <div class="eyebrow">Sources</div>
    <ul class="sources">{srcs}</ul>
  </div>
</section>

{FOOTER}

</body>
</html>
'''

# ---------- CSS ----------
css = '''  /* ---------- field guide ---------- */
  .chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
  .chips a { display: inline-flex; gap: 8px; align-items: center; padding: 8px 14px; border: 1px solid var(--rule); border-radius: 999px; background: var(--card); color: var(--ink); text-decoration: none; font-size: 15px; }
  .chips a:hover { border-color: var(--pohutukawa); color: var(--pohutukawa); }
  .chips a span { font: 500 12px/1 "IBM Plex Mono", monospace; color: var(--ink-soft); }
  section.directory { padding-top: 88px; }
  .dir-head .intro { max-width: 680px; }
  .gal-group { margin-top: 64px; padding: 0; border-bottom: 0; scroll-margin-top: 64px; }
  .dir-head + .gal-group { margin-top: 56px; }
  .gal-group .gh { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr); gap: 12px 40px; align-items: baseline; border-top: 2px solid var(--ink); padding-top: 16px; }
  .gal-group h3 { font-size: 30px; }
  .gal-group .gh p { margin: 0; font-size: 15px; color: var(--ink-soft); }
  .gal { display: grid; grid-template-columns: repeat(auto-fill, minmax(176px, 1fr)); gap: 20px 16px; margin-top: 28px; }
  .tile { display: block; color: var(--ink); text-decoration: none; scroll-margin-top: 80px; }
  .tile .ti { display: block; position: relative; aspect-ratio: 1 / 1; overflow: hidden; border-radius: 4px; background: var(--paper-2); box-shadow: var(--shadow); }
  .tile img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .35s ease; }
  .tile:hover img, .tile:focus-visible img { transform: scale(1.04); }
  .tile .ph-empty { position: absolute; inset: 0; display: grid; place-items: center; font: italic 300 64px/1 "Newsreader", serif; color: var(--rule); }
  .tile .rare { position: absolute; left: 8px; top: 8px; font: 500 10px/1 "IBM Plex Mono", monospace; letter-spacing: .08em; text-transform: uppercase; padding: 5px 6px; border-radius: 3px; background: var(--paper); color: var(--ochre); }
  .tile .tt { display: block; padding: 10px 2px 0; }
  .tile .tn { display: block; font: 500 19px/1.2 "Newsreader", serif; }
  .tile:hover .tn { color: var(--pohutukawa); }
  .tile .tm { display: block; margin-top: 2px; font: italic 15px/1.3 "Newsreader", serif; color: var(--bush); }

  /* ---------- bird detail page ---------- */
  main.bird-page { padding: 32px 0 72px; }
  .back { display: inline-block; font-size: 15px; color: var(--ink-soft); text-decoration: none; margin-bottom: 24px; }
  .back:hover { color: var(--pohutukawa); }
  .detail { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 48px; align-items: start; }
  .d-img { margin: 0; position: sticky; top: 76px; }
  .d-img img { display: block; width: 100%; max-height: 78vh; object-fit: contain; object-position: left top; border-radius: 4px; }
  .d-img.empty { aspect-ratio: 4 / 3; background: var(--paper-2); border-radius: 4px; }
  .d-img figcaption { margin-top: 8px; font-size: 12.5px; color: var(--ink-soft); }
  .d-img figcaption a { color: inherit; }
  .d-body h1 { font-size: clamp(38px, 5vw, 58px); margin-top: 6px; }
  .d-body .tags { margin: 0 0 14px; }
  .d-body .nm { margin-top: 8px; font-size: 16px; color: var(--ink-soft); }
  .d-body .nm .mi { font: italic 20px "Newsreader", serif; color: var(--bush); }
  .d-body .where { margin: 22px 0 0; font: italic 22px/1.4 "Newsreader", serif; color: var(--ink); }
  .d-body .pn { margin: 16px 0 0; font-size: 15px; color: var(--ochre); border-left: 2px solid var(--ochre); padding-left: 12px; }
  .d-body h2 { font-size: 13px; font-family: "IBM Plex Mono", monospace; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: var(--ochre); margin: 32px 0 8px; }
  .d-body p { font-size: 17px; }
  .d-body .ff { margin-top: 28px; background: var(--card); border: 1px solid var(--rule); border-left: 3px solid var(--pohutukawa); padding: 16px 18px; border-radius: 3px; font-size: 17px; }
  .d-body .ff span { display: block; font: 500 11px/1.6 "IBM Plex Mono", monospace; letter-spacing: .1em; text-transform: uppercase; color: var(--pohutukawa); margin-bottom: 4px; }
  .d-body .more-story { margin-top: 24px; font-size: 15px; color: var(--ink-soft); }
  .pager { display: flex; justify-content: space-between; gap: 16px; margin-top: 64px; padding-top: 20px; border-top: 1px solid var(--rule); }
  .pager a { color: var(--ink); text-decoration: none; font: 400 22px/1.2 "Newsreader", serif; }
  .pager a:hover { color: var(--pohutukawa); }
  .pager span { display: block; font: 500 11px/1.6 "IBM Plex Mono", monospace; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-soft); }
  .pager .next { text-align: right; }
  .tag.t-ok, .tag.t-risk, .tag.t-threat { background: transparent; border: 1px solid var(--rule); color: var(--ink-soft); padding: 5px 7px; }
  .tag.t-risk { border-color: var(--ochre); color: var(--ochre); }
  .tag.t-threat { border-color: var(--pohutukawa); color: var(--pohutukawa); }
  details.more { margin-top: 20px; border-top: 1px solid var(--rule); padding-top: 14px; }
  details.more summary { cursor: pointer; font-weight: 500; }
  details.more .sources { margin-top: 14px; }
  @media (max-width: 860px) {
    .gal-group .gh, .detail { grid-template-columns: 1fr; }
    .detail { gap: 28px; }
    .d-img { position: static; }
    .d-img img { max-height: 60vh; }
  }
  @media (max-width: 560px) {
    .gal { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 12px; }
    .tile .tn { font-size: 17px; }
    .tile .tm { font-size: 14px; }
    .pager a { font-size: 18px; }
  }
'''

# ---------- apply ----------
s = open(PAGE).read()
s, n1 = re.subn(r"<!-- FIELD GUIDE START -->.*?<!-- FIELD GUIDE END -->", lambda m: guide, s, flags=re.S)
s, n2 = re.subn(r"<!-- SOURCES START -->.*?<!-- SOURCES END -->", lambda m: sources, s, flags=re.S)
assert n1 == n2 == 1
open(PAGE, "w").write(s)

c = open(CSS).read()
c, n = re.subn(r"  /\* -+ field guide -+ \*/\n.*?(?=  /\* -+ pest free)", lambda m: css, c, flags=re.S)
assert n == 1
open(CSS, "w").write(c)

out = os.path.join(REPO, "birds")
wanted = {sp["slug"] for _, sp in birds}
if os.path.isdir(out):
    for d in os.listdir(out):
        if d not in wanted and os.path.isdir(os.path.join(out, d)):
            shutil.rmtree(os.path.join(out, d))
for i, (g, sp) in enumerate(birds):
    os.makedirs(os.path.join(out, sp["slug"]), exist_ok=True)
    open(os.path.join(out, sp["slug"], "index.html"), "w").write(detail(i, g, sp))

print(f"{len(birds)} birds, {sum(1 for _, sp in birds if image_for(sp['slug']))} with images, {len(wanted)} detail pages")
