import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, PT_Serif as Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Geist y Geist Mono sin cambios
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// PT Serif corregido: pesos válidos 400 y 700
const _serif = Serif({
  weight: ["400", "700"], // pesos válidos
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DIOPTIK - Lentes Premium",
  description:
    "Compra tus lentes sin salir de casa. Las mejores marcas y estilos en óptica.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_serif.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
