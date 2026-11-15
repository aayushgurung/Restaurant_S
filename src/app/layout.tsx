import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/providers/cart-provider";
import { site } from "@/config/site";
import "./globals.css";
import { inter, cormorant, devanagari } from "./fonts";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Palpasa Cafe — A little Nepal. A lot of heart.",
    template: "%s | Palpasa Cafe",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    title: "Palpasa Cafe",
    description: site.description,
    images: [
      {
        url: "/images/hero.webp",
        width: 1920,
        height: 1280,
        alt: "Nepali momo at Palpasa Cafe",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: false, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${devanagari.variable}`}
    >
      <body>
        <CartProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
