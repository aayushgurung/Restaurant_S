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
    default: "Shaswat Nepali Kitchen — A little Nepal. A lot of heart.",
    template: "%s | Shaswat Nepali Kitchen",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    title: "Shaswat Nepali Kitchen",
    description: site.description,
    images: [
      {
        url: "/images/hero.webp",
        width: 1920,
        height: 1280,
        alt: "Nepali momo at Shaswat",
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
