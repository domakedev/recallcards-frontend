import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navigation/NavBarTUI";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";

import Providers from "@/redux/Providers";
import Script from "next/script";
import AuthProvider from "./components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Repaso Activo",
  description: "¡Crea y repasa tus anotaciones de estudios en flashcards!",
  keywords: [
    "Active Recall",
    "Cards",
    "Anotaciones",
    "Estudios",
    "Flashcards",
    "Apuntes",
    "Repaso",
    "Repaso Activo",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.repasoactivo.com",
    siteName: "Repaso Activo",
    description: "¡Apunta, guarda y repasa tus anotaciones de estudios!",
    images: [
      {
        url: "https://res.cloudinary.com/domakedev/image/upload/v1720011553/recall-cards/jnla7elnujumhabiw2dz.png",
        alt: "Repaso Activo",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className="h-full"
    >
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1587638098879183"
        crossOrigin="anonymous"
      ></Script>
      <meta
        name="google-adsense-account"
        content="ca-pub-1587638098879183"
      />
      <GoogleAnalytics />

      <body className={`${inter.className} flex min-h-full flex-col`}>
        <AuthProvider>
          <Providers>
            <Navbar />
            <main className="flex-grow justify-center">{children}</main>
            <Footer />
          </Providers>
        </AuthProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
