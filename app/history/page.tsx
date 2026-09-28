import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "History · The Birds of Kawau Island",
  description:
    "How Kawau Island's unusual bird life came together: Sir George Grey's menagerie, the kiwi, weka, kookaburras and peacocks, and the pest-free programme.",
};

export default function HistoryPage() {
  return (
    <>
      <SiteNav current="history" />

      <header className="page-head">
        <div className="wrap">
          <div className="eyebrow">History · Te Kawau Tūmaro o Toi</div>
          <h1>How Kawau got its <em>birds</em></h1>
          <p className="lede">A governor's menagerie, a rescue for the weka, a kiwi population nobody quite understood, and a plan to make Kawau the largest inhabited pest-free island in New Zealand.</p>
        </div>
      </header>

      <main>

      <section id="story">
        <div className="wrap">
          <div className="eyebrow">Why Kawau is strange</div>
          <h2>A governor's Eden</h2>
          <div className="story">
            <div className="text">
              <p>The island is named for its shags. In tradition the ancestor Toi-te-huatahi named it <em>Te Kawau Tūmaro</em>, the shag that stands watch, and shags still nest in the pōhutukawa that lean out over its bays. Ngāti Tai and later Te Kawerau lived here, and Ngāti Manuhiri remain kaitiaki (guardians) of the island and the neighbouring coast today.</p>
              <p>In the 1840s it became one of New Zealand's first mining sites. In 1844–45 Kawau's copper made up about a third of Auckland's exports. In 1862 Governor Sir George Grey bought the island. He enlarged the mine manager's house into the Mansion House and spent the next 26 years and a fortune trying to turn Kawau into a private paradise.</p>
              <p>Grey was an obsessive collector. He planted hundreds of exotic species and shipped in kangaroos, wallabies, antelope, zebras, gnu, monkeys, emus, peafowl and kookaburras. He also moved native birds around, bringing kiwi from the Hokianga. Most of the menagerie failed. The zebras never settled, and the monkeys did so well they had to be exterminated.</p>
              <p>A few of the introductions took hold, and they still shape the island's bird life. The kookaburras and peacocks are now part of Kawau's identity. The wallabies and possums stripped the forest understorey for 150 years, and removing them is the goal of the eradication programme that began in 2025.</p>
            </div>
            <aside className="menagerie" aria-label="What happened to Grey's animals">
              <h3>What became of the menagerie</h3>
              <div className="sub">A selection of Grey's introductions, 1862–1888</div>
              <ul>
                <li><span>Laughing kookaburra</span><span className="fate-stayed">Still here</span></li>
                <li><span>Indian peafowl</span><span className="fate-mixed">Died out, returned</span></li>
                <li><span>North Island brown kiwi</span><span className="fate-stayed">Still here</span></li>
                <li><span>Wallabies (several species)</span><span className="fate-stayed">Being eradicated</span></li>
                <li><span>Brushtail possum (1868–69)</span><span className="fate-stayed">Being eradicated</span></li>
                <li><span>Zebra</span><span className="fate-gone">Failed</span></li>
                <li><span>Monkeys</span><span className="fate-gone">Exterminated</span></li>
                <li><span>Emu, gnu, antelope</span><span className="fate-gone">Gone</span></li>
              </ul>
            </aside>
          </div>
          <div className="timeline narrow" id="timeline">
            <div className="tl"><div className="yr">Tradition</div><div className="ev"><b>Te Kawau Tūmaro</b><span>Toi-te-huatahi names the island for its sentinel shags.</span></div></div>
            <div className="tl"><div className="yr">1844</div><div className="ev"><b>Copper boom</b><span>Kawau's mine produces a third of Auckland's exports.</span></div></div>
            <div className="tl big"><div className="yr">1862</div><div className="ev"><b>Grey buys the island</b><span>The acclimatisation experiment begins.</span></div></div>
            <div className="tl"><div className="yr">1860s</div><div className="ev"><b>Kiwi and peafowl arrive</b><span>Kiwi from the Hokianga, a gift from Judge Maning.</span></div></div>
            <div className="tl big"><div className="yr">1866</div><div className="ev"><b>Kookaburras released</b><span>Grey's birds are the only ones in New Zealand that survive.</span></div></div>
            <div className="tl"><div className="yr">1868</div><div className="ev"><b>Possums released</b><span>Along with several wallaby species. Both go on to strip the forest understorey.</span></div></div>
            <div className="tl"><div className="yr">1888</div><div className="ev"><b>Grey sells up</b><span>Grey's original peafowl die out sometime in the following decades.</span></div></div>
            <div className="tl big"><div className="yr">1976</div><div className="ev"><b>31 weka released</b><span>East Cape birds found what becomes the subspecies' largest population.</span></div></div>
            <div className="tl"><div className="yr">1996</div><div className="ev"><b>Weka peak</b><span>An estimated ~3,500 birds, the island's equilibrium.</span></div></div>
            <div className="tl"><div className="yr">2004</div><div className="ev"><b>The peahens vanish</b><span>The remaining peacocks keep displaying anyway.</span></div></div>
            <div className="tl big"><div className="yr">2025</div><div className="ev"><b>Eradication begins; kiwi surveyed</b><span>In May, hunters, dogs and thermal drones go after wallabies and possums. A dog survey finds 56 kiwi and no chicks.</span></div></div>
            <div className="tl"><div className="yr">2026</div><div className="ev"><b>Operations resume</b><span>After a summer pause, the team targets the last wallabies in Block&nbsp;1.</span></div></div>
          </div>
        </div>
      </section>

      <section id="birds">
        <div className="wrap">
          <div className="eyebrow">Stories</div>
          <h2>The residents</h2>
          <p className="intro">On Kawau, endemic birds that are rare on the mainland live alongside introduced birds found almost nowhere else in New Zealand. These are the ones with the best stories.</p>

          <div className="species">

            <article className="bird" id="story-weka">
              <div className="head">
                <svg className="sil" viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M50 14c-4-3-10-2-12 3-1 3 0 6-3 8-6 3-16 2-22 8-5 5-6 12-3 16 3 5 11 6 18 4 5-1 8-4 11-8 3-4 3-9 6-12 2-2 5-2 7-3 3-1 5-2 7-2-2-1-5-1-7-2 0-2 0-3-2-4zM44 18a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM24 52l-2 8h2l2-7zm8-1 1 9h2l-1-9z"/></svg>
                <div>
                  <h3>Weka</h3>
                  <div className="names">North Island weka · <span className="sci">Gallirallus australis greyi</span></div>
                </div>
              </div>
              <div className="tags"><span className="tag t-endemic">Endemic</span><span className="tag t-native">Flightless rail</span><span className="tag t-intro">Translocated 1976</span></div>
              <p>Weka are the birds visitors notice first. They are bold, flightless and curious, and they will walk off with anything shiny or brightly coloured: car keys, sunglasses, a pink sandal. Their loud rising <em>coo-eet</em> calls carry across the bays at dusk.</p>
              <p>They are here because of a rescue. By the 1970s North Island weka had nearly disappeared from the mainland. In March 1976, 31 birds from the East Cape were released on Kawau. By 1985 they had spread across the island, and by the mid-1990s they had reached an estimated equilibrium of a few thousand birds.</p>
              <div className="stat"><b>77–84%</b><span>of all adult North Island weka lived on Kawau in the 1990s, making this small island the subspecies' stronghold</span></div>
            </article>

            <article className="bird" id="story-kiwi">
              <div className="head">
                <svg className="sil" viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M30 18c-11 0-20 8-20 18 0 8 6 13 13 14l-2 8h2l3-7h6l1 7h2l0-8c7-2 11-8 11-14 0-2 0-4-1-5 3-1 6 1 8 4l8 10c1 1 2 0 1-1l-8-11c-3-4-7-6-11-6-3-5-8-9-13-9zm11 10a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"/></svg>
                <div>
                  <h3>Kiwi</h3>
                  <div className="names">North Island brown kiwi · <span className="sci">Apteryx mantelli</span></div>
                </div>
              </div>
              <div className="tags"><span className="tag t-endemic">Endemic</span><span className="tag t-native">Nocturnal</span><span className="tag t-intro">Brought by Grey, 1860s</span></div>
              <p>Kawau's kiwi are thought to descend from a handful of birds that Judge Frederick Maning gave Grey from the Hokianga in the 1860s. Genetic testing confirms they form a distinct, isolated cluster with very low genetic diversity, and many of the birds are closely related.</p>
              <p>In early 2025 a kiwi-detection dog named Kimihia and her handler searched the island over three trips. Dry weather had pushed the birds off the ridges, and every kiwi was found roosting in a gully. All were adults, many in poor condition, and <strong>no chicks or juveniles were found</strong>. Researchers now think Kawau may need new birds brought in for genetic rescue, and that its own birds, carrying unique genes, could help restock the mainland.</p>
              <div className="stat"><b>56</b><span>kiwi located in the 2025 survey, 51 handled and microchipped, zero juveniles</span></div>
            </article>

            <article className="bird" id="story-kookaburra">
              <div className="head">
                <svg className="sil" viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M20 14c-6 0-10 5-10 10l-8 2 8 2c1 4 4 7 8 8l2 12-6 14h3l6-12 4 12h3l-4-14 2-10c6-2 12-7 14-14l8-8-9 3c-3-4-9-5-14-5-3 0-5 0-7 0zm-2 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/></svg>
                <div>
                  <h3>Kookaburra</h3>
                  <div className="names">Laughing kookaburra · <span className="sci">Dacelo novaeguineae</span></div>
                </div>
              </div>
              <div className="tags"><span className="tag t-intro">Introduced 1866</span><span className="tag t-intro">From Australia</span></div>
              <p>Small shipments of laughing kookaburras were released in New Zealand between 1866 and 1880. Only Grey's birds on Kawau survived, and they later crossed the 1.4&nbsp;km channel to the mainland. Every wild kookaburra in New Zealand descends from this one island population.</p>
              <p>They are still scarce. The range runs along the east coast from around Whangārei south to Kaukapakapa, Riverhead and the Waitākere Ranges, centred on the Kawau–Warkworth coast. The raucous group chorus at dawn and dusk is one of the strangest sounds in the Hauraki Gulf.</p>
              <div className="stat"><b>&lt;500</b><span>estimated total population in New Zealand, thought to be stable</span></div>
            </article>

            <article className="bird" id="story-peafowl">
              <div className="head">
                <svg className="sil" viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M44 6c-2 0-3 1-3 3l-1 4c-2 1-3 4-3 6l-2 10c-8 0-16 4-22 12-5 7-9 14-11 20h4c3-6 8-11 14-13l-2 10h2l3-10h3l1 10h2l0-11c6-2 10-8 12-15l2-9c1-2 2-3 2-5l4-1-4-1c0-2-1-3-3-4 0-2 1-4 1-6zm-1 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
                <div>
                  <h3>Peacock</h3>
                  <div className="names">Indian peafowl · <span className="sci">Pavo cristatus</span></div>
                </div>
              </div>
              <div className="tags"><span className="tag t-intro">Introduced 1860s</span><span className="tag t-intro">Reintroduced 1958–89</span></div>
              <p>Grey released peafowl on Kawau in the 1860s, but that population died out sometime between 1886 and 1923. The birds strutting across the Mansion House lawns today come from later releases between 1958 and 1989.</p>
              <p>A DOC ecologist studied them from 1992 to 2010, while he was mainly there to study the weka. In winter 2004 every peahen vanished. The males kept fanning their trains at their usual display sites for <strong>five more years</strong>, with no females left to see them. Two peacocks, known locally as Solo and Two-Toes, still hold court near the house.</p>
              <div className="stat"><b>5 years</b><span>of courtship display after the last peahen disappeared</span></div>
            </article>

            <article className="bird wide" id="story-shag">
              <div className="head">
                <svg className="sil" viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M32 10c-3 0-5 2-5 5v6c-6 1-12 3-18 0-3-1-6-1-8 1 5 1 9 4 13 6 5 3 9 5 13 5l-3 18c0 2 1 3 3 3h10c2 0 3-1 3-3l-3-18c4 0 8-2 13-5 4-2 8-5 13-6-2-2-5-2-8-1-6 3-12 1-18 0v-4l5-2-5-1c0-2-2-4-5-4zm1 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
                <div>
                  <h3>Kawau — the shag</h3>
                  <div className="names">Pied shag / kāruhiruhi · <span className="sci">Phalacrocorax varius</span>, with black and little shags</div>
                </div>
              </div>
              <div className="tags"><span className="tag t-native">Native</span><span className="tag t-native">Namesake</span></div>
              <div className="cols">
                <div>
                  <p><em>Kawau</em> is the Māori word for shag (cormorant), and the island is named for them. Pied shags, known locally as the "Kawau shag", nest in the big pōhutukawa at Rocky Bay and other sheltered bays.</p>
                </div>
                <div>
                  <p>Look for them on the rocks with their wings held out to dry. Unlike most waterbirds, shags have feathers that soak through, which helps them dive. Black and little shags also fish the harbour. Gannets plunge offshore, and flocks of white-fronted terns, which locals call "kahawai birds", show fishers where the kahawai are.</p>
                </div>
              </div>
            </article>

            <article className="bird" id="story-forest">
              <div className="head">
                <svg className="sil" viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M28 8c-6 0-11 4-11 10 0 2 1 4 2 5-4 5-6 12-5 20l3 13h3l-1-9 6 4-2 11h3l3-11c6-4 9-11 9-18 0-5-2-9-4-12 3 0 6 2 7 5 1-5-2-10-7-12-2-4-4-6-6-6zm-2 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/></svg>
                <div>
                  <h3>Kākā, kererū &amp; tūī</h3>
                  <div className="names"><span className="sci">Nestor meridionalis · Hemiphaga novaeseelandiae · Prosthemadera novaeseelandiae</span></div>
                </div>
              </div>
              <div className="tags"><span className="tag t-endemic">Endemic</span><span className="tag t-native">Forest birds</span></div>
              <p>These three are Kawau's loudest forest birds. Kākā, big bush parrots, move freely between the islands of the Gulf. Kererū (wood pigeons) crash through the canopy with their heavy wingbeats. Tūī feed at flax and pōhutukawa blossom, pollinating as they go.</p>
              <p>A council survey team in late 2025 noted a "noticeable abundance of birdlife, including kākā, tūī, kererū" at Little Vivian Bay. The forest baseline report found bird communities "relatively intact" despite the wallaby damage, which is a hopeful sign for recovery.</p>
              <div className="stat"><b>Kākā</b><span>listed as a key beneficiary of the pest-free programme</span></div>
            </article>

            <article className="bird" id="story-korora">
              <div className="head">
                <svg className="sil" viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M32 6c-5 0-9 4-9 9v3l-6 2 6 1c-4 6-6 14-6 22 0 8 4 13 9 14l-3 3h6l1-2h4l1 2h6l-3-3c5-1 9-6 9-14 0-10-3-19-7-24 1-2 1-4 1-6 0-4-4-7-9-7zm-3 7a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z"/></svg>
                <div>
                  <h3>Kororā &amp; pāteke</h3>
                  <div className="names">Little penguin · <span className="sci">Eudyptula minor</span> — brown teal · <span className="sci">Anas chlorotis</span></div>
                </div>
              </div>
              <div className="tags"><span className="tag t-native">Kororā at risk</span><span className="tag t-endemic">Pāteke endemic</span><span className="tag t-intro">Pāteke threatened</span></div>
              <p>Kororā, the world's smallest penguin, come ashore around the rocky coastline at night. You're more likely to hear their braying calls than see them.</p>
              <p>Pāteke, a small endemic duck once common across the country, is now New Zealand's rarest mainland waterfowl. Only about 2,000–2,500 survive in the wild, and Kawau's coastal wetlands are among the places they persist. Both species are named as priorities for the eradication project.</p>
              <div className="stat"><b>~2,000</b><span>pāteke left in the wild nationwide (2022 estimate)</span></div>
            </article>

            <article className="bird wide" id="story-cuckoos">
              <div className="head">
                <svg className="sil" viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" d="M14 22c-3 0-5 2-6 4l-6 1 6 2c1 3 4 5 7 5 6 0 10 3 16 5l20 8 12 3-11-5 8-1-12-3c-4-8-12-14-20-17-4-2-8-2-14-2zm0 3a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z"/></svg>
                <div>
                  <h3>The spring travellers</h3>
                  <div className="names">Shining cuckoo / pīpīwharauroa · long-tailed cuckoo / koekoeā</div>
                </div>
              </div>
              <div className="tags"><span className="tag t-migrant">Migrant</span><span className="tag t-native">Brood parasites</span></div>
              <div className="cols">
                <p>Each year, starting around September, two cuckoos fly in from the tropical Pacific. The shining cuckoo winters as far away as the Solomon Islands, and the long-tailed cuckoo spreads across Polynesia. They stay until about March.</p>
                <p>Both lay their eggs in other birds' nests. The shining cuckoo uses the tiny grey warbler (riroriro), which lives on Kawau. The long-tailed cuckoo uses whiteheads, which don't live on the island, so the koekoeā heard here are probably just passing through. Traditionally the shining cuckoo's rising whistle marked the start of the planting season. On Kawau it arrives in the same weeks the peacocks begin to display.</p>
              </div>
            </article>

          </div>

          <blockquote className="pull">
            "Despite the absence of females, peacocks continued to display for 5 years after all peahens were lost."
            <cite>Beauchamp, Notornis 60 (2013)</cite>
          </blockquote>
        </div>
      </section>

      <section id="pestfree">
        <div className="wrap">
          <div className="eyebrow">Working towards a pest-free Kawau</div>
          <h2>Taking back the understorey</h2>
          <p className="intro">For 150 years Grey's wallabies and possums have eaten Kawau's forest seedlings. A 2025 baseline study found the browsing had "created a recruitment bottleneck and arrested forest succession across much of Kawau Island." The eradication programme aims to reverse that.</p>
          <div className="pf">
            <div>
              <ol>
                <li><b>Phase one: browsers (from May 2025).</b> Hunters with indicator dogs and thermal drones target wallabies (<span className="sci">Notamacropus</span>, <span className="sci">Petrogale</span> and <span className="sci">Wallabia</span> species) and possums. Toxins are used where monitoring finds hotspots.</li>
                <li><b>Summer pause, then resumption (2026).</b> By December 2025, modelling suggested fewer than a dozen wallabies remained in Block&nbsp;1, and possum eradication was well advanced. Work resumed in March 2026.</li>
                <li><b>Phase two: predators (proposed).</b> Removing rats and stoats is under discussion and depends on community agreement. A 2024 dog survey found no evidence of stoats, but the island is still vulnerable to them.</li>
                <li><b>Then, recovery.</b> Once pests are gone, species could be reintroduced from nearby pest-free islands.</li>
              </ol>
              <p style={{ fontSize: 15, color: "var(--ink-soft)" }}>Partners include Ngāti Manuhiri (through the Manuhiri Kaitiaki Charitable Trust), Auckland Council, the Department of Conservation, the Pohutukawa Trust and Island Conservation.</p>
            </div>
            <div className="callout">
              <div className="eyebrow" style={{ color: "inherit", opacity: 0.8 }}>If it succeeds</div>
              <b className="big">Largest</b>
              <h3>inhabited pest-free island in New Zealand</h3>
              <p>About 100 people live on Kawau, and most of the island is private land reached only by boat. That makes it an unusually hard eradication. The expected winners are the weka, kororā, pāteke, kiwi and kākā, along with the forest that feeds them.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="sources" style={{ borderBottom: 0 }}>
        <div className="wrap">
          <div className="eyebrow">Sources</div>
          <h2 style={{ fontSize: 32 }}>Further reading</h2>
          <ul className="sources">
            <li>Joustra, T. &amp; Donovan, T. (2025). <a href="https://savethekiwi.nz/wp-content/uploads/2026/02/Population-Survey-for-North-Island-Brown-Kiwi-on-Kawau-Island-2025_Final-Report.pdf">Population Survey for North Island Brown Kiwi on Kawau Island</a>. Save the Kiwi.</li>
            <li>Beauchamp, A.J. (2013). <a href="https://www.birdsnz.org.nz/wp-content/uploads/2021/12/Beauchamp_2013_0.pdf">Breeding and behaviour records of peafowl at Mansion House Historic Reserve, Kawau Island</a>. <em>Notornis</em> 60(3).</li>
            <li>Department of Conservation. <a href="https://www.doc.govt.nz/globalassets/documents/science-and-technical/tsrp29.pdf">Weka recovery plan (TSRP 29)</a>.</li>
            <li>Department of Conservation. <a href="https://www.doc.govt.nz/get-involved/run-a-project/translocation/translocation-success/north-island-weka/">North Island weka: understanding translocation success</a>.</li>
            <li>New Zealand Birds Online. <a href="https://www.nzbirdsonline.org.nz/species/laughing-kookaburra">Laughing kookaburra</a>.</li>
            <li>Te Ara. <a href="https://teara.govt.nz/en/introduced-land-birds/page-5">Introduced land birds: kookaburras</a>.</li>
            <li>Tiaki Tāmaki Makaurau. <a href="https://www.tiakitamakimakaurau.nz/get-involved/working-towards-a-pest-free-kawau-island/pest-free-kawau-island-programme/">Pest free Kawau Island programme</a> and December 2025 newsletter.</li>
            <li>OurAuckland. <a href="https://ourauckland.aucklandcouncil.govt.nz/news/2026/03/pest-eradication-on-kawau-island-resumes/">Pest eradication on Kawau Island resumes</a> (March 2026).</li>
            <li>DOC. <a href="https://www.doc.govt.nz/parks-and-recreation/places-to-go/auckland/places/kawau-island-historic-reserve/mansion-house/history-of-mansion-house/">History of Mansion House</a>.</li>
            <li><a href="https://www.kawauisland.org/nature">Kawau Island community: Island nature</a>.</li>
            <li><a href="https://www.nzbirds.com/birding/kawaubirds.html">NZ Birds: Kawau Island birds</a>.</li>
            <li><a href="https://en.wikipedia.org/wiki/Kawau_Island">Wikipedia: Kawau Island</a>.</li>
          </ul>
          <p className="more-note">Sources for each bird are listed on its own page in the <Link href="/#guide">field guide</Link>.</p>
        </div>
      </section>

      </main>
    </>
  );
}
