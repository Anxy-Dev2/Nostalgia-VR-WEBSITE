import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Carter — Unity & VR Physics Portfolio",
  description:
    "Unity developer specializing in full-body VR physics, Gorilla Tag fan games, and custom gameplay systems.",
  keywords: [
    "Carter",
    "Unity Developer",
    "VR Physics",
    "Gorilla Tag",
    "Hurricane VR",
    "C#",
    "Portfolio",
  ],
  authors: [{ name: "Carter" }],
  openGraph: {
    title: "Carter — Unity & VR Physics Portfolio",
    description:
      "A portfolio showcasing Unity gameplay systems, VR interaction design, and custom C# physics tools.",
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
        className={`${inter.variable} ${spaceGrotesk.variable} bg-dark text-body antialiased`}
      >
        <div className="grain-overlay">{children}</div>
      </body>
    </html>
  );
}
