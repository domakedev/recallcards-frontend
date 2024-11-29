"use client";
import { useAppSelector } from "@/redux/hooks";
import { createCard } from "@/services/card.services";
import { uploadImages } from "@/services/image.services";
import { Card } from "@/types/Card";
import { DeckDB } from "@/types/Deck";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateCard: React.FC = () => {
  const [newCard, setNewCard] = useState<Card>({
    answer: "",
    question: "",
    deckId: 0,
    creatorId: 0,
  });
  const [images, setImages] = useState<FileList>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [thereIsDeck, setThereIsDeck] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>();
  const [deckState, setDeckState] = useState<DeckDB>();

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
    <div className="-mb-32 flex min-h-screen flex-col items-center bg-gradient-to-r from-blue-500 to-teal-500 pb-16 pt-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl"
      >
        <p className="text-md mb-3 text-gray-400">
          📖 Crea apuntes, repasa y registra tu progreso ✍️
        </p>
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Crea Cards</h2>
        <div className="mb-6">
          <label className="mb-2 flex flex-col gap-1 text-sm font-bold text-gray-700">
            {/* Respuesta puede ser: texto o imagen(url o archivo) */}
            <span>Crearé una card por cada una de tus imágenes 🙌✅</span>
            <blockquote className="quote my-2 flex items-center border-l-4 border-neutral-500 bg-neutral-100 p-2 text-sm font-light text-neutral-600">
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
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            id="deselecting"
            type="button"
            onClick={removeImage}
            className={`focus:shadow-outline mt-4 rounded bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 focus:outline-none ${
              images ? "block" : "hidden"
            }`}
          >
            Quitar todo
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={userId !== deckState?.creatorId || !thereIsDeck}
            className={`focus:shadow-outline transform rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none ${
              userId === deckState?.creatorId && thereIsDeck
                ? ""
                : "cursor-not-allowed bg-gray-500 hover:bg-gray-500"
            }`}
          >
            {isLoading ? "Creando Cards..." : "Crear Cards"}
          </button>
          <button
            type="button"
            className="focus:shadow-outline transform rounded bg-gray-500 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:outline-none"
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
