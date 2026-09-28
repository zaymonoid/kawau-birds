import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";

// latin-ext covers the macrons in te reo Māori (ā ē ī ō ū)
const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "The Birds of Kawau Island",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        {children}
        <footer>
          <div className="wrap">The Birds of Kawau Island · A field guide to Te Kawau Tūmaro o Toi, Hauraki Gulf</div>
        </footer>
      </body>
    </html>
  );
}
