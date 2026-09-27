import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const zodiak = localFont({
  src: [
    {
      path: "../../fonts/WEB/fonts/Zodiak-Variable.woff2",
      style: "normal",
      weight: "300 900",
    },
    {
      path: "../../fonts/WEB/fonts/Zodiak-VariableItalic.woff2",
      style: "italic",
      weight: "300 900",
    },
  ],
  variable: "--font-zodiak",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Madi Alenov — Backend & Systems",
  description:
    "Personal engineering portfolio of Madi Alenov. Focused on high-performance APIs, asynchronous pipelines, clean architecture, and container orchestration.",
  keywords: [
    "Madi Alenov",
    "Backend Engineer",
    "Systems Engineer",
    "Python",
    "FastAPI",
    "Docker",
    "Traefik",
    "PostgreSQL",
    "Redis",
    "Distributed Systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} ${zodiak.variable} dark`}
    >
      <body className="min-h-screen bg-[#09090b] text-[#ededed] font-sans antialiased selection:bg-[#22c55e]/25 selection:text-white">
        {children}
      </body>
    </html>
  );
}
