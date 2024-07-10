"use client";
import { resetDeck } from "@/redux/deckSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteDeckAction } from "@/services/deck.actions";
import { DeckDB } from "@/types/Deck";
import { UserDB } from "@/types/User";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

interface DeleteDeckButtonProps {
  deckId: number;
  deckImage: string;
}

const DeleteDeckButton = () => {
  const router = useRouter();
  const userState = useAppSelector((state) => state.user);
  const deckState = useAppSelector((state) => state.deck);
  const dispatch = useAppDispatch(); 
  const [userDB, setUserDB] = useState<UserDB>();
  const [deckId, setDeckId] = useState<number>();
  const [deckImage, setDeckImage] = useState<string>("");
  const [deckCreatorId, setDeckCreatorId] = useState<number>();

  useEffect(() => {
    setUserDB(userState);
  }, [userState]);

  useEffect(() => {
    if (deckState) {
      setDeckId(deckState.id);
      setDeckCreatorId(deckState.creatorId);
      setDeckImage(deckState.deckImage);
    }
  }, [deckState]);

  const deleteDeck = async () => {
    if (userDB?.id === 0 || !userDB || !deckId || userDB.id !== deckCreatorId) {
      return;
    }
    try {
      const result = await deleteDeckAction(deckId, userDB.id, deckImage);
      toast.success(result, {
        autoClose: 1000,
      });
      router.push("/mis-decks");
      dispatch(resetDeck())
    } catch (error: any) {
      toast.error("Ocurrió un error al eliminar el deck");
    }
  };
  return (
    <>
      {!userDB || userDB.id === 0 || userDB.id !== deckCreatorId ? null : (
        <div className="flex flex-col items-center">
          <button
            className={`${
              !userDB || userDB.id === 0 || userDB.id !== deckCreatorId
                ? "hidden"
                : ""
            } border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded flex items-center gap-2 transition-colors duration-150 ease-in-out m-2`}
            type="button"
            disabled={!userDB || userDB.id === 0 || userDB.id !== deckCreatorId}
            onClick={deleteDeck}
          >
            Eliminar Deck <AiOutlineDelete />
          </button>
          <span className=" text-red-500 text-xs">
            Advertencia: Tiene que estar vacío.
          </span>
        </div>
      )}
    </>
  );
};

export default DeleteDeckButton;
