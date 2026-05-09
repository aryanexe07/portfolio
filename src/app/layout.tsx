import type { Metadata } from "next";
import { Fraunces, DM_Sans, Geist_Mono } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Aryan.exe | Portfolio",
  description: "Crafting digital experiences that make an impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden font-sans">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="aryan-theme"
        >
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
