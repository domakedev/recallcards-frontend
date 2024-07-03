"use client"
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import Button from "../Button";

const CreateDeckButton = ({href, text}:{href:string, text:string}) => {
  const userState = useAppSelector((state) => state.user);
  const actualDeck = useAppSelector((state) => state.deck);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    if (userState) {
      setIsAuth(userState.authenticated);
      setUserId(userState.id);
      setIsAdmin(userState.roles.includes("admin"));
    } else {
      setIsAuth(false);
    }
  }, [userState]);

  return (
    <div>
      {isAuth && userId === actualDeck?.creatorId ? (
      // {isAuth && userId === actualDeck?.creatorId && isAdmin ? (
        <Button href={href}>{text}</Button>
      ) : null}
    </div>
  );
};

export default CreateDeckButton;
