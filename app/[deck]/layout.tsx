import "react-toastify/dist/ReactToastify.css";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Deck - Anotador de estudios",
  description: "¡Apunta, guarda y repasa tus anotaciones de estudios!",
};

export default function DeckLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GoogleAnalytics />
      {children}
    </>
  );
}
