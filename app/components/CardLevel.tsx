import { useAppSelector } from "@/redux/hooks";
import {
  createCardDifficulty,
  updateCardDifficulty,
} from "@/services/cardDifficulty.services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

type NivelDificultadProps = {
  cardId: number;
  userEmail?: string;
  dificultadActual?: 1 | 2 | 3;
  cardDifficultId?: number;
};

const NivelDificultad: React.FC<NivelDificultadProps> = ({
  cardId,
  dificultadActual,
  cardDifficultId,
  userEmail,
}) => {
  const niveles: Array<1 | 2 | 3> = [1, 2, 3];

  const router = useRouter();

  const [level, setLevel] = useState(dificultadActual);
  const [cardDifficultyId, setCardDifficultyId] = useState<number>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userState) {
      setIsAuth(userState.authenticated);
      setUserId(userState.id);
    }
  }, [userState]);

  const getColor = (nivel: number) => {
    if (nivel === level) {
      switch (nivel) {
        case 1:
          return "bg-green-500 text-white";
        case 2:
          return "bg-yellow-500 text-white";
        case 3:
          return "bg-red-500 text-white";
        default:
          return "";
      }
    }
    return "bg-white text-black";
  };

  const onDificultadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const number = Number(name) as 1 | 2 | 3;
    setLevel(number);
    //Enviar cambio de nivel al backend
    if (cardId !== 0 && isAuth && userId && userId !== 0) {
      //Crea difficulty si no esta definido
      if (!level) {
        const res = await createCardDifficulty({
          userId,
          cardId,
          difficultyId: number,
        });
        //res es el registro creado completo
        setCardDifficultyId(res.difficultyId);
        toast.success(
          `Dificultad de la card "${cardId}" creada: "${getName(
            number
          )}" del usuario ${userEmail}`,
          {
            autoClose: 1000,
          }
        );
      }
      //Actualiza difficulty si ya esta definido

      if ((level === 1 || level === 2 || level === 3) && cardDifficultyId) {
        const res = await updateCardDifficulty({
          id: cardDifficultyId,
          difficultyId: number,
        });
        //res es el registro actualizado completo
        toast.success(
          `Dificultad de la card "${cardId}" actualizada a: "${getName(
            number
          )}" del usuario ${userEmail}`,
          {
            autoClose: 1000,
          }
        );
      }
      router.refresh();
    }
  };

  const changeLevelInDB = () => {};

  const getName = (nivel: number) => {
    switch (nivel) {
      case 1:
        return "Fácil";
      case 2:
        return "Media";
      case 3:
        return "Difícil";
      default:
        break;
    }
  };

  useEffect(() => {
    setLevel(dificultadActual);
  }, [dificultadActual]);

  useEffect(() => {
    setCardDifficultyId(cardDifficultId);
  }, [cardDifficultId]);

  return (
    <div className="m-3">
      {isAuth ? (
        <div className="flex gap-1 sm:gap-2 md:gap-3">
          {niveles.map((nivel) => (
            <label
              key={uuidv4()}
              className={`text-sm md:text-xl py-1 px-4 rounded ${getColor(
                nivel
              )}  cursor-pointer ring-1 ring-gray-500 hover:scale-105 transition-transform duration-200
                `}
              onClick={changeLevelInDB}
            >
              <input
                type="checkbox"
                className="mr-2 bg-white hidden"
                name={String(nivel)}
                checked={nivel === level}
                onChange={onDificultadChange}
              />
              {getName(nivel)}
            </label>
          ))}
        </div>
      ) : (
        <p className="text-sm md:text-base text-red-500 font-bold  text-center">
          <Link
            href="/auth/register"
            className="text-gray-200 block bg-gray-800 p-2 rounded-lg"
          >
            <span className="block">
              Regístrate y guarda tu progreso en esta Card
            </span>
            <span className="block">✅🟨🟥</span>
          </Link>
        </p>
      )}
    </div>
  );
};

export default NivelDificultad;
