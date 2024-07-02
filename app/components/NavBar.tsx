"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BackArrowIcon from "@/assets/backarrow-icon.svg";
import {
  FaColonSign,
  FaPersonArrowUpFromLine,
  FaPersonFalling,
  FaPersonRunning,
  FaUserGraduate,
} from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/userSlice";
import { UserDB } from "@/types/User";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import AccessRequest from "@/app/components/AccessRequest";

interface NavBarProps {
  title: string;
  goBack: boolean;
}
const NavBar: React.FC<NavBarProps> = ({ title, goBack = false }) => {
  const router = useRouter();
  const params = useParams();
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authUser, setAuthUser] = useState<UserDB>();

  useEffect(() => {
    if (userState.authenticated) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    if (userState) {
      setAuthUser(userState);
      setIsAdmin(userState.roles.includes("admin"));
    }
  }, [userState]);

  const claves = Object.keys(params);

  let goTo: string = "";

  if (claves.includes("card")) {
    goTo = "deck";
  } else if (claves.includes("deck")) {
    goTo = "/";
  }

  return (
    <nav className="p-5 mb-3 flex items-center justify-between w-full bg-slate-100 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-30 sticky top-0 z-10">
      {goBack ? (
        <>
          <button
            className="min-w-[25%] "
            onClick={() => {
              router.push(`${goTo == "/" ? goTo : "/" + params[goTo]}`);
            }}
          >
            <div>
              <Image
                src={BackArrowIcon}
                className="min-w-6 min-h-6 "
                // width={24}
                // height={24}
                alt="Volver atrás"
              />
            </div>
          </button>
        </>
      ) : (
         <div className="min-w-[25%] "></div>
      )}

      <h1 className="font-bold text-lg text-center min-w-[50%] ">{title}</h1>
      <div className="flex items-center justify-center gap-3 min-w-[25%] ">
        {isAuth ? (
          <>
            <span className="text-sm hidden md:block">{authUser?.email}</span>
            <button
              onClick={() => {
                dispatch(logout());
                // router.push("/");
              }}
            >
              <FaPersonRunning
                size={14}
                className="inline-block mx-1 w-4 "
              />
              {"Salir"}
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/auth/login")}
            className="text-sm"
          >
            <FaArrowUp
              size={14}
              className="inline-block w-4 mx-1"
            />
            {"Login"}
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
