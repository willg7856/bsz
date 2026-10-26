import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beyondstagezero.space"),
  title: "Beyond Stage Zero · .space",
  description: "Beyond Stage Zero.",
  openGraph: {
    type: "website",
    siteName: "Beyond Stage Zero",
    title: "Beyond Stage Zero · .space",
    description: "Beyond Stage Zero.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className={`${jetbrains.variable} antialiased`}>{children}</body>
    </html>
  );
}
