"use client";
import { loginAction, logoutAction } from "@/services/auth.actions";
import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export function SignIn() {
  const { data: session } = useSession();
  const [isSession, setIsSession] = useState(session);

  useEffect(() => {
    setIsSession(session);
  }, [session]);

  return (
    <>
      {isSession ? (
        <div className="">
          <button onClick={() => signOut()}>Salir</button>
          <p className="text-xs">{isSession?.user?.email}</p>
        </div>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </>
  );
}
