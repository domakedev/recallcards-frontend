import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Deck",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
