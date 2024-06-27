import {
  createCardDifficulty,
  updateCardDifficulty,
} from "@/services/cardDifficulty.services";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

type NivelDificultadProps = {
  isAuth: boolean;
  cardId: number;
  userId: number;
  userEmail?: string;
  dificultadActual?: 1 | 2 | 3;
  cardDifficultId?: number;
};

const NivelDificultad: React.FC<NivelDificultadProps> = ({
  isAuth,
  cardId,
  userId,
  dificultadActual,
  cardDifficultId,
  userEmail,
}) => {
  const niveles: Array<1 | 2 | 3> = [1, 2, 3];

  const [level, setLevel] = useState(dificultadActual);
  const [cardDifficultyId, setCardDifficultyId] = useState<number>();

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
    return "bg-gray-300 text-black";
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
          )}" del usuario ${userEmail}`
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
    <div className="mb-2">
      {isAuth ? (
        <div className="flex space-x-2">
          {niveles.map((nivel) => (
            <label
              key={uuidv4()}
              className={`p-2 mx-1 rounded ${getColor(nivel)}`}
              onClick={changeLevelInDB}
            >
              <input
                type="checkbox"
                className="mr-2"
                name={String(nivel)}
                checked={nivel === level}
                onChange={onDificultadChange}
              />
              {getName(nivel)}
            </label>
          ))}
        </div>
      ) : (
        <p className="text-red-500 font-bold  text-center">
          Si quieres guardar tu progreso, inicia sesión 😁🙌⌛✅
        </p>
      )}
    </div>
  );
};

export default NivelDificultad;
