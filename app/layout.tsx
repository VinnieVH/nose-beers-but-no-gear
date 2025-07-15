import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Nose Beers But No Gear",
  description: "A World of Warcraft guild website for Nose Beers But No Gear - Where we take our nose beers seriously, but everything else is fair game for a laugh!",
  keywords: ["World of Warcraft", "WoW", "Guild", "Raid", "Gaming", "Nose Beers But No Gear"],
  authors: [{ name: "Nose Beers But No Gear" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-pandaria-light dark:bg-pandaria-dark text-pandaria-dark dark:text-pandaria-light transition-colors duration-300">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
