import localFont from "next/font/local";

export const inter = localFont({
  src: "../../public/fonts/inter.woff2",
  weight: "400 700",
  variable: "--font-inter",
  display: "swap",
});
export const cormorant = localFont({
  src: [
    {
      path: "../../public/fonts/cormorant.woff2",
      weight: "400 600",
      style: "normal",
    },
    {
      path: "../../public/fonts/cormorant-italic.woff2",
      weight: "400 500",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
});
export const devanagari = localFont({
  src: "../../public/fonts/devanagari.woff2",
  weight: "400 500",
  variable: "--font-devanagari",
  display: "swap",
  preload: false,
});
