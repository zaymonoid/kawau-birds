"""Build the generated parts of the site from data/birds.json and images/birds/credits*.json.

Run from anywhere: python3 tools/build.py  (idempotent; rewrites marked regions only)
"""
import json, os, re, html

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGE = os.path.join(REPO, "index.html")
ORDER = ["seabirds", "shore", "wetland-ground", "forest", "hunters-travellers", "introduced"]
e = lambda s: html.escape(s or "", quote=True)

# ---------- load content ----------
groups = {g["group"]: g for g in json.load(open(os.path.join(REPO, "data", "birds.json")))["groups"]}
missing = [g for g in ORDER if g not in groups]
assert not missing, missing

credits = {}
for f in ("credits.json", "credits-2.json"):
    p = os.path.join(REPO, "images", "birds", f)
    if os.path.exists(p):
        for c in json.load(open(p)):
            credits[c["slug"]] = c

def image_for(slug):
    c = credits.get(slug)
    path = os.path.join(REPO, "images", "birds", f"{slug}.jpg")
    if c and c.get("license_ok") and os.path.exists(path):
        return c
    return None

ORIGIN = {"endemic": ("t-endemic", "Endemic"), "native": ("t-native", "Native"),
          "migrant": ("t-migrant", "Migrant"), "introduced": ("t-intro", "Introduced")}

def status_tag(s):
    if not s:
        return ""
    s = s.replace("(NZTCS)", "").strip()
    short = s.split("–")[-1].strip() if "–" in s else s
    short = re.sub(r"\s*\(.*?\)", "", short)
    if s.startswith("Introduced"):
        return ""  # origin tag already says it
    cls = "t-threat" if s.startswith("Threatened") else ("t-risk" if s.startswith("At Risk") else "t-ok")
    return f'<span class="tag {cls}" title="{e(s)}">{e(short)}</span>'

def credit_line(c):
    kind = "Illustration" if c.get("kind") == "illustration" else "Photo"
    author = re.sub(r"<[^>]+>", "", c.get("author") or "Unknown").strip()
    return (f'{kind}: <a href="{e(c.get("commons_page_url"))}">{e(author)}</a> · {e(re.sub(r" *[(].*$", "", c.get("license") or ""))}')

def card(sp):
    slug = sp["slug"]
    c = image_for(slug)
    cls, label = ORIGIN.get(sp.get("origin", ""), ("t-native", sp.get("origin", "").title()))
    if c:
        fig = (f'<figure class="ph"><img src="images/birds/{slug}.jpg" alt="{e(c.get("suggested_alt") or sp["name"])}" '
               f'loading="lazy" decoding="async" style="object-position:{e(c.get("focal_point") or "50% 50%")}">'
               f'<figcaption>{credit_line(c)}</figcaption></figure>')
    else:
        initial = e((sp.get("maori") or sp["name"])[:1].upper())
        fig = f'<figure class="ph empty" aria-hidden="true"><span>{initial}</span></figure>'
    names = []
    if sp.get("maori") and sp["maori"].lower() != sp["name"].lower():
        names.append(f'<span class="mi">{e(sp["maori"])}</span>')
    names.append(f'<span class="sci">{e(sp["sci"])}</span>')
    presence = f'<p class="pn">{e(sp["presence_note"])}</p>' if sp.get("presence_note") else ""
    return f'''        <article class="sp" id="sp-{slug}">
          {fig}
          <div class="bd">
            <div class="tags"><span class="tag {cls}">{label}</span>{status_tag(sp.get("threat_status"))}</div>
            <h3>{e(sp["name"])}</h3>
            <div class="nm">{" · ".join(names)}</div>
            {presence}
            <p><b>Story.</b> {e(sp["history"])}</p>
            <p><b>Behaviour.</b> {e(sp["behaviour"])}</p>
            <p class="ff"><span>Did you know?</span> {e(sp["fun_fact"])}</p>
            <p class="where">{e(sp["where"])}</p>
          </div>
        </article>'''

# ---------- field guide ----------
count = sum(len(groups[g]["species"]) for g in ORDER)
chips = "".join(f'<a href="#g-{g}">{e(groups[g]["group_title"])} <span>{len(groups[g]["species"])}</span></a>' for g in ORDER)
parts = [f'''<!-- FIELD GUIDE START -->
<section id="guide" class="guide-intro">
  <div class="wrap">
    <div class="eyebrow">Field guide</div>
    <h2>Every bird on the list</h2>
    <p class="intro">{count} species recorded on Kawau, grouped by where you'll find them. Status tags follow the New Zealand Threat Classification System. Some birds on older island checklists turn out to be rare visitors, and their cards say so.</p>
    <nav class="chips" aria-label="Bird groups">{chips}</nav>
  </div>
</section>''']
for i, g in enumerate(ORDER):
    grp = groups[g]
    cards = "\n".join(card(sp) for sp in grp["species"])
    parts.append(f'''<section id="g-{g}" class="guide-group">
  <div class="wrap">
    <div class="gh">
      <div class="eyebrow">{i + 1:02d} · {len(grp["species"])} species</div>
      <h2>{e(grp["group_title"])}</h2>
      <p class="intro">{e(grp.get("group_intro"))}</p>
    </div>
    <div class="sp-grid">
{cards}
    </div>
  </div>
</section>''')
parts.append("<!-- FIELD GUIDE END -->")
guide = "\n\n".join(parts)

# ---------- sources ----------
per_species = []
photo_credits = []
for g in ORDER:
    for sp in groups[g]["species"]:
        links = ", ".join(f'<a href="{e(u)}">{i + 1}</a>' for i, u in enumerate(sp.get("sources", [])))
        per_species.append(f'<li>{e(sp["name"])}: {links}</li>')
        c = image_for(sp["slug"])
        if c:
            photo_credits.append(f'<li>{e(sp["name"])}: {credit_line(c)}</li>')
sources = f'''<!-- SOURCES START -->
<section id="sources" style="border-bottom:0">
  <div class="wrap">
    <div class="eyebrow">Sources</div>
    <h2 style="font-size:32px">Sources &amp; credits</h2>
    <ul class="sources">
      <li>Background reading on the island and its history is on the <a href="history/#sources">History</a> page.</li>
      <li>Map elevation: <a href="https://registry.opendata.aws/copernicus-dem/">Copernicus GLO-30 DEM</a> © DLR e.V. 2010–2014 and © Airbus Defence and Space GmbH 2014–2018, provided under COPERNICUS by the European Union and ESA, via AWS Open Data. Contours at 20&nbsp;m derived for this page.</li>
    </ul>
    <details class="more">
      <summary>Sources for each species</summary>
      <ul class="sources">{"".join(per_species)}</ul>
    </details>
    <details class="more">
      <summary>Photo and illustration credits</summary>
      <ul class="sources">{"".join(photo_credits) or "<li>Images coming soon.</li>"}</ul>
    </details>
  </div>
</section>
<!-- SOURCES END -->'''

# ---------- CSS ----------
css = '''  /* ---------- field guide ---------- */
  .chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
  .chips a { display: inline-flex; gap: 8px; align-items: center; padding: 8px 14px; border: 1px solid var(--rule); border-radius: 999px; background: var(--card); color: var(--ink); text-decoration: none; font-size: 15px; }
  .chips a:hover { border-color: var(--pohutukawa); color: var(--pohutukawa); }
  .chips a span { font: 500 12px/1 "IBM Plex Mono", monospace; color: var(--ink-soft); }
  section.guide-intro { border-bottom: 0; padding-bottom: 0; }
  section.guide-group { padding: 72px 0; }
  .sp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; margin-top: 40px; }
  .sp { background: var(--card); border: 1px solid var(--rule); border-radius: 4px; box-shadow: var(--shadow); overflow: hidden; display: flex; flex-direction: column; scroll-margin-top: 72px; }
  .sp .ph { margin: 0; position: relative; aspect-ratio: 4 / 3; background: var(--paper-2); }
  .sp .ph img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
  .sp .ph figcaption { position: absolute; right: 0; bottom: 0; max-width: 100%; padding: 3px 8px; font-size: 10.5px; line-height: 1.4; color: #f4efe4; background: rgba(20, 26, 23, .62); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sp .ph figcaption a { color: inherit; }
  .sp .ph.empty { display: grid; place-items: center; }
  .sp .ph.empty span { font: italic 300 96px/1 "Newsreader", serif; color: var(--rule); }
  .sp .bd { padding: 20px 22px 22px; display: flex; flex-direction: column; flex: 1; }
  .sp .tags { margin: 0 0 12px; }
  .sp h3 { font-size: 25px; }
  .sp .nm { font-size: 14px; margin: 4px 0 12px; color: var(--ink-soft); }
  .sp .nm .mi { font-family: "Newsreader", serif; font-style: italic; color: var(--bush); font-size: 16px; }
  .sp p { font-size: 15px; line-height: 1.55; margin: 0 0 .7em; }
  .sp p b { font-weight: 600; }
  .sp .pn { font-size: 13.5px; color: var(--ochre); border-left: 2px solid var(--ochre); padding-left: 10px; }
  .sp .ff { background: var(--paper-2); padding: 10px 12px; border-radius: 3px; }
  .sp .ff span { display: block; font: 500 10.5px/1.6 "IBM Plex Mono", monospace; letter-spacing: .1em; text-transform: uppercase; color: var(--pohutukawa); }
  .sp .where { margin-top: auto; padding-top: 12px; border-top: 1px dashed var(--rule); font: italic 16px/1.45 "Newsreader", serif; color: var(--ink-soft); margin-bottom: 0; }
  .tag.t-ok, .tag.t-risk, .tag.t-threat { background: transparent; border: 1px solid var(--rule); color: var(--ink-soft); padding: 5px 7px; }
  .tag.t-risk { border-color: var(--ochre); color: var(--ochre); }
  .tag.t-threat { border-color: var(--pohutukawa); color: var(--pohutukawa); }
  details.more { margin-top: 20px; border-top: 1px solid var(--rule); padding-top: 14px; }
  details.more summary { cursor: pointer; font-weight: 500; }
  details.more .sources { margin-top: 14px; }
'''

# ---------- apply ----------
s = open(PAGE).read()
s = re.sub(r"<!-- FIELD GUIDE START -->.*?<!-- FIELD GUIDE END -->", lambda m: guide, s, flags=re.S)
s = re.sub(r"<!-- SOURCES START -->.*?<!-- SOURCES END -->", lambda m: sources, s, flags=re.S)
open(PAGE, "w").write(s)

CSS = os.path.join(REPO, "assets", "site.css")
c = open(CSS).read()
c, n = re.subn(r"  /\* -+ field guide -+ \*/\n.*?(?=  /\* -+ pest free)", lambda m: css, c, flags=re.S)
assert n == 1
open(CSS, "w").write(c)
have = [sp["slug"] for g in ORDER for sp in groups[g]["species"] if image_for(sp["slug"])]
print(f"{count} cards, {len(have)} with images")
