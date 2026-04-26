import type { Metadata } from "next";
import { JetBrains_Mono, DM_Sans, DM_Mono, Geist_Mono } from "next/font/google";
import "./style/global.scss";
import Providers from "./components/Providers";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

const dmMono = DM_Mono({
  variable: "--font-subtext",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-display-var",
});

export const metadata: Metadata = {
  title: "Ivan Abillon | Portfolio",
  description:
    "Portfolio of Ivan Abillon, web designer and software developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${dmSans.variable} ${dmMono.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
