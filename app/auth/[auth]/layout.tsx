import "react-toastify/dist/ReactToastify.css";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login/Registro",
  description: "¡Guarda la dificultad de tus anotaciones de estudios!",
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
