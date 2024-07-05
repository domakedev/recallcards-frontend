"use client";
import { logoutAction } from "@/services/auth.actions";
import React, { useEffect } from "react";
import { forwardRef } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { MenuItem } from "@headlessui/react";
import { useAppDispatch } from "@/redux/hooks";
import { logout, setUser } from "@/redux/userSlice";

const SignControlButton = () => {
    const session = useSession();
    const dispatch = useAppDispatch();
    console.log("🚀 ~ SignControlButton ~ session:", session)

    const logInHandler = async () => {
        signIn()
    }

    const logOutHandler = async () => {
        signOut()
        dispatch(logout())
    }

  return (
    <MenuItem>
      <button
        className="block text-start w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
        onClick={() => {
          console.log("🚀 ~ SignControlButton ~ onClick ~ signOut");
          session.status === "authenticated" ?  logOutHandler() : logInHandler();
        }}
      >
        {session.status === "authenticated" ? "Cerrar sesión" : "Iniciar sesión"}
      </button>
    </MenuItem>
  );
};

// SignOutButton.displayName = "SignOutButton";

export default SignControlButton;