import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Nostalgia VR — Liminal Horror for Meta Quest",
  description:
    "Explore Dreamcore, Weirdcore, Frutiger Aero, and the Backrooms in this multiplayer VR horror game by Constantplot. Available on Meta Quest.",
  keywords: [
    "Nostalgia VR",
    "VR Horror",
    "Backrooms VR",
    "Dreamcore",
    "Weirdcore",
    "Meta Quest",
    "Multiplayer Horror",
    "Liminal Spaces",
    "Constantplot",
  ],
  authors: [{ name: "Constantplot" }],
  openGraph: {
    title: "Nostalgia VR — Liminal Horror for Meta Quest",
    description:
      "Step into the liminal. Survive the nostalgia. A multiplayer VR horror game featuring Dreamcore, Weirdcore, Frutiger Aero, and Backrooms levels.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${poppins.variable} bg-frutiger-gradient text-body antialiased`}
      >
        <div className="grain-overlay">{children}</div>
      </body>
    </html>
  );
}
