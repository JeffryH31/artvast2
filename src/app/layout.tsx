import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Artvast - Empowering Designers",
    template: "%s | Artvast",
  },
  description:
    "Showcase portfolios, safely sell your work and connect with local clients. Premium digital designs from talented creators.",
  keywords: ["digital design", "marketplace", "designers", "portfolio", "creative work", "UI/UX", "branding", "illustration"],
  authors: [{ name: "Artvast Team" }],
  creator: "Artvast",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_URL || "https://artvast.com",
    title: "Artvast - Empowering Designers",
    description: "Showcase portfolios, safely sell your work and connect with local clients",
    siteName: "Artvast",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artvast - Empowering Designers",
    description: "Showcase portfolios, safely sell your work and connect with local clients",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased`}>
        <ThemeProvider>
          <ErrorBoundary>
            {children}
            <Toaster />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
