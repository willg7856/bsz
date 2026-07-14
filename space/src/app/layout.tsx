import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/content";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Beyond Stage Zero — Independent Student Rocketry",
    template: "%s · Beyond Stage Zero",
  },
  description:
    "Australian student rocketry team building Australia's first fully and rapidly reusable launch vehicle — STRAVOX to 30 km apogee.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_AU",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Static fire test — Beyond Stage Zero" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className={`${archivo.variable} ${jetbrains.variable} antialiased`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
