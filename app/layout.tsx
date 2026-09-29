import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { getRequestLocale } from "./i18n/serverLocale";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pavan Sai Vejju | Senior Front-End Developer (React JS)",
  description: "Senior Frontend Engineer with 5.5+ years of experience building scalable enterprise and responsive web applications with modern frontend architecture.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getRequestLocale();

  return (
    <html
      lang={locale}
      className={`${plusJakarta.variable} ${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider initialLocale={locale}>
          {children}
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
