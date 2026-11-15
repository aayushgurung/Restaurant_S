export const site = {
  name: "Palpasa Cafe",
  description:
    "A little Nepal, a lot of heart. Discover hand-folded momo, comforting Nepali plates and a warm welcome at Palpasa Cafe.",
  url: "https://shaswat-nepali-kitchen.group-effort25.chatgpt.site",
  email: "hello@palpasa.example",
  location: "Parramatta, NSW, Australia",
  address: "27 Hunter St, Parramatta NSW 2150",
  // Email and opening hours remain placeholders pending confirmation.
  hours: [
    { days: "Monday – Thursday", time: "12:00 pm – 9:30 pm" },
    { days: "Friday – Saturday", time: "12:00 pm – 10:00 pm" },
    { days: "Sunday", time: "12:00 pm – 9:30 pm" },
  ],
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/catering", label: "Catering" },
  { href: "/contact", label: "Visit us" },
] as const;
