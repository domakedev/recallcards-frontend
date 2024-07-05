"use client"
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/userSlice";
import { UserDB } from "@/types/User";
import {SessionProvider, useSession} from "next-auth/react";
import { useEffect, useState } from "react";

export default function AuthProvider({children}: {children: React.ReactNode}) {
  // const [userNextAuth, setUserNextAuth] = useState<UserDB>();
  // const dispatch = useAppDispatch();
  // const session = useSession();

  // useEffect(() => {
  //   if (session.status === "authenticated") {
  //     const user = {
  //       id: Number(session.data.user.id),
  //       email: session.data.user.email!,
  //       authenticated: true,
  //     };
  //     // setUserNextAuth(user);
  //     dispatch(setUser(user));
  //     }
  //   }
  // , [dispatch, session])

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}