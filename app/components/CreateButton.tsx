"use client";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AccessRequest from "./AccessRequest";

interface CreateButtonProps {
  showCondition: "userAuth" | "always" | "never";
  route: string;
}

const CreateButton = ({ showCondition, route }: CreateButtonProps) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userState) {
      setIsAuth(userState.authenticated);
      setIsAdmin(userState.roles.includes("admin"));
    }
  }, [userState]);

  if (showCondition === "userAuth" && !isAuth) {
    return null;
  }

  return (
    <>
      {false ? (
        // {!isAdmin ? (
        <AccessRequest />
      ) : (
        // <button
        //   onClick={() => {
        //     router.push(route);
        //   }}
        //   className="mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 active:scale-95 block mx-auto my-5"
        // >
        //   Crea tu Deck
        // </button>
        <button
          onClick={() => {
            router.push(route);
          }}
          className="mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 active:scale-95 block mx-auto my-5"
        >
          Crear Deck
        </button>
      )}
    </>
  );
};

export default CreateButton;
