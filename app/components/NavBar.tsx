"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BackArrowIcon from "@/assets/backarrow-icon.svg";
import { FaUserGraduate } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/userSlice";

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

  useEffect(() => {
    if (userState.authenticated) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
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
    <div className="mt-5 mb-[41px] px-3 flex  justify-between w-full">
      {goBack ? (
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
      ) : (
        <div className="min-w-[25%] "></div>
      )}

      <h1 className="font-bold text-lg text-center min-w-[50%] ">
        {title}
      </h1>
      <div className="flex items-center justify-center gap-3 min-w-[25%] ">
        {/* <Link href={true ? "/auth/login" : "/auth/register"}>
        </Link> */}
        {isAuth ? (
          <button
            onClick={() => {
              dispatch(logout());
              router.push("/");
            }}
          >
            <FaUserGraduate
              size={24}
              className="inline-block"
            />
            {"Salir"}
          </button>
        ) : (
          <button onClick={() => router.push("/auth/login")}>
            <FaUserGraduate
              size={24}
              className="inline-block"
            />
            {"Login"}
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
