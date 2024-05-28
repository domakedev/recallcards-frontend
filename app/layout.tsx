import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full"
    >
      <body className={`${inter.className} flex flex-col min-h-full`}>
        {/* <header className="min-h-[10px] bg-green-100">Header</header> */}
        <main className="flex-grow">{children}</main>
        {/* Create a footer that show a nice message */}
        <Footer />
      </body>
    </html>
  );
}
