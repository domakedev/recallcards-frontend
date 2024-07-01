import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

import Providers from "@/redux/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Repaso Activo",
  description: "¡Apunta, guarda y repasa tus anotaciones de estudios!",
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
    images: [
      {
        url: "/public/og-logo.png",
        alt: "Repaso Activo",
        width: 200,
        height: 190,
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
      <body className={`${inter.className} flex flex-col min-h-full`}>
        {/* <header className="min-h-[10px] bg-green-100">Header</header> */}
        <Providers>
          <main className="flex-grow mb-16 pb-8">{children}</main>
          {/* Create a footer that show a nice message */}
          <Footer />
        </Providers>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
