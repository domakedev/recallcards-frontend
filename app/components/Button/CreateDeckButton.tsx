"use client"
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import Button from "../Button";

const CreateDeckButton = () => {
  const userState = useAppSelector((state) => state.user);
  const actualDeck = useAppSelector((state) => state.deck);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    if (userState) {
      setIsAuth(userState.authenticated);
      setUserId(userState.id);
    } else {
      setIsAuth(false);
    }
  }, [userState]);

  return (
    <div>
      {isAuth && userId === actualDeck?.creatorId ? (
        <Button href="/create-card">Crear Card</Button>
      ) : null}
    </div>
  );
};

export default CreateDeckButton;
