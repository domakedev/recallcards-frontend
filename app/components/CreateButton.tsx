"use client"
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CreateButtonProps {
  showCondition: "userAuth" | "always" | "never";
  route: string;
}

const CreateButton = ({ showCondition, route }: CreateButtonProps) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userState) {
      setIsAuth(userState.authenticated);
    }
  }, [userState]);

  if (showCondition === "userAuth" && !isAuth) {
    return null;
  }

  return (
    <button
      onClick={() => {
        router.push(route);
      }}
      className="mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 active:scale-95 block mx-auto my-5"
    >
      Crear Deck
    </button>
  );
};

export default CreateButton;
