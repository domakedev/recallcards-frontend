"use client";
import { useAppSelector } from "@/redux/hooks";
import { createCard } from "@/services/card.services";
import { uploadImages } from "@/services/image.services";
import { Card } from "@/types/Card";
import { DeckDB } from "@/types/Deck";
import Image from "next/image";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import { useRouter } from "next/navigation";

const CreateCard: React.FC = () => {
  const [newCard, setNewCard] = useState<Card>({
    answer: "",
    question: "",
    // @TODO: Cambiar estos valores por los valores reales
    deckId: 0,
    creatorId: 0,
  });
  const [images, setImages] = useState<FileList>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [thereIsDeck, setThereIsDeck] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [deckState, setDeckState] = useState<DeckDB>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const router = useRouter();

  //Store
  const userStateRedux = useAppSelector((state) => state.user);
  const deckStateRedux = useAppSelector((state) => state.deck);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (deckStateRedux.id !== 0) {
      setNewCard({
        ...newCard,
        deckId: deckStateRedux.id,
        creatorId: deckStateRedux.creatorId,
      });
      setThereIsDeck(true);
      setDeckState({
        id: deckStateRedux.id,
        name: deckStateRedux.deckName,
        image: deckStateRedux.deckImage,
        creatorId: deckStateRedux.creatorId,
      });
    }
    if (deckStateRedux.id === 0) {
      toast.error("Primero selecciona un deck");
      setThereIsDeck(false);
    }
  }, [deckStateRedux]);

  useEffect(() => {
    if (!userStateRedux.authenticated) {
      toast.error("Primero inicia sesión");
      setThereIsDeck(false);
    } else {
      setUserId(userStateRedux.id);
      setIsAdmin(userStateRedux.roles.includes("admin"));
    }
  }, [userStateRedux]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 1) {
      setImages(files);
    }
  };

  const removeImage = () => {
    resetFileInput();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (newCard.deckId === 0 || newCard.creatorId === 0) {
      toast.error("Primero selecciona un deck | Inicia sesión");
      return;
    }
    try {
      e.preventDefault();
      let imageURL = "";
      let newCardCopy = { ...newCard };
      // Lógica para manejar el envío del formulario
      if (!images || images.length <= 1) {
        toast.error("Debes enviar al menos 2 imágenes");
        return;
      }

      //Cargar imagenes a Cloudinary y obtener la URL
      if (images && images.length > 1) {
        //@TODO: añadir 2do argumento: deckName
        setIsLoading(true);
        const imagesURLArr = await uploadImages(images, String(deckState?.id));

        for (let i = 0; i < imagesURLArr.length; i++) {
          const imageURL = imagesURLArr[i];

          //Establecer url en newCard.answer
          newCardCopy = {
            ...newCard,
            answer: imageURL,
          };

          //Enviar newCards al Backend 1 por 1
          const result = await createCard(newCardCopy);
          removeImage();
          setNewCard({
            answer: "",
            question: "",
            // @TODO: Cambiar estos valores por los valores reales
            deckId: 0,
            creatorId: 0,
          });
        }
        toast.success("Cards creadas con éxito", {
          autoClose: 1000,
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      // toast.error("Ocurrió un error al crear la carta");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen -mb-32 pb-16 pt-16">
      {/* <NavBar
        title={`${
          userStateRedux.id !== deckState?.creatorId
            ? "No tienes permisos para crear cartas en este deck"
            : "🌲⛅🌲"
        }`}
        goBack={false}
      /> */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8"
      >
        <p className=" text-md text-gray-400 mb-3">
          📖 Sube tus apuntes, estúdialos y registra tu progreso ✍️
        </p>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Crea Cards</h2>
        <div className="mb-6">
          <label className="text-gray-700 text-sm font-bold mb-2 flex flex-col gap-1">
            {/* Respuesta puede ser: texto o imagen(url o archivo) */}
            <span>Crearé una card por cada una de tus imágenes 🙌✅</span>
            <blockquote className="text-sm p-2 font-light border-l-4 my-2 bg-neutral-100 text-neutral-600 border-neutral-500 quote flex items-center">
              Te recomiendo usar un formato rectangular tipo Card:{" "}
              <span className="text-3xl">🎴</span>
            </blockquote>
          </label>
          <input
            type="file"
            ref={fileInputRef}
            multiple={true}
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            id="deselecting"
            type="button"
            onClick={removeImage}
            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 text-sm ${
              images ? "block" : "hidden"
            }`}
          >
            Quitar todo
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            // disabled={!thereIsDeck || userId!==deckState?.creatorId}
            disabled={
              userId !== deckState?.creatorId || !thereIsDeck
              // userId !== deckState?.creatorId || !thereIsDeck || !isAdmin
            }
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out ${
              userId === deckState?.creatorId && thereIsDeck
                ? ""
                : "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Creando Cards..." : "Crear Cards"}
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out"
            onClick={() => {
              router.back();
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCard;
