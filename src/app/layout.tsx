import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/lib/i18n";
import { ConfirmDialogProvider } from "@/components/ui/ConfirmDialog";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var root = document.documentElement;
                  root.classList.remove('light', 'dark');
                  if (theme === 'light' || theme === 'dark') {
                    root.classList.add(theme);
                  } else {
                    root.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                  }
                } catch(e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <ConfirmDialogProvider>
              <ErrorBoundary>
                {children}
                <Toaster />
              </ErrorBoundary>
            </ConfirmDialogProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
