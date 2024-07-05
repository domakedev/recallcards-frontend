"use client";
import { useAppSelector } from "@/redux/hooks";
import { createCard } from "@/services/card.services";
import { uploadImage, uploadImages } from "@/services/image.services";
import { Card } from "@/types/Card";
import { DeckDB } from "@/types/Deck";
import { set } from "@cloudinary/url-gen/actions/variable";
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
import { CgCamera } from "react-icons/cg";
import { FaCamera, FaImage } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CreateCard: React.FC = () => {
  const [newCard, setNewCard] = useState<Card>({
    answer: "",
    question: "",
    deckId: 0,
    creatorId: 0,
  });
  const [image, setImage] = useState<File>();
  const [disableTitle, setDisableTitle] = useState<boolean>(false);
  const [disableAnswerText, setDisableAnswerText] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [thereIsDeck, setThereIsDeck] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageBlobUrl, setImageBlobUrl] = useState<string>("");
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
    if (files && files.length == 1) {
      const blob = URL.createObjectURL(files[0]);
      setImageBlobUrl(blob);
      setImage(files[0]);
      setDisableAnswerText(true);
    } else {
      setDisableAnswerText(false);
      setImageBlobUrl("");
      setImage(undefined);
    }
  };

  // const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  const handleChange = (e: any) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  const removeImage = () => {
    setImage(undefined);
    setImageBlobUrl("");
    setImageUrl("");
    setDisableAnswerText(false);
    resetFileInput();
    setDisableTitle(false);
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
      // if (!image) {
      //   toast.error("Debes enviar al menos 1 imagen");
      //   return;
      // }

      //Cargar imagen a Cloudinary y obtener la URL
      if (image) {
        setIsLoading(true);
        imageURL = await uploadImage(image, String(deckState?.id));
        //Establecer url en newCard.answer
        newCardCopy = {
          ...newCard,
          answer: imageURL,
        };

        //Enviar newCard al Backend
        const result = await createCard(newCardCopy);
        toast.success(result.message, {
          autoClose: 1000,
        });
        removeImage();
        setNewCard({
          answer: "",
          question: "",
          deckId: 0,
          creatorId: 0,
        });
        setIsLoading(false);
      } else {
        //Enviar newCard al Backend
        const result = await createCard(newCard);
        toast.success(result.message, {
          autoClose: 1000,
        });
        removeImage();
        setNewCard({ ...newCard, answer: "", question: "" });
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      // toast.error("Ocurrió un error al crear la carta");
    }
  };

  const countLetters = (text: string) => {
    return text.length;
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen -mb-16 pb-16">
      <NavBar
        title={`${
          userStateRedux.id !== deckState?.creatorId
            ? "No tienes permisos para crear cartas en este deck"
            : "🌲Tienes permiso⛅🌲"
        }`}
        goBack={false}
      />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8 m-5"
      >
        <p className=" text-md text-gray-400">Deck: {deckState?.name}</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Crea una Card</h2>
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            🤔 Título o Pregunta
          </label>
          <input
            type="text"
            id="question"
            name="question"
            disabled={disableTitle}
            value={newCard.question}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="text-gray-700 text-sm font-bold mb-2 flex flex-col gap-1">
            {/* Respuesta puede ser: texto o imagen(url o archivo) */}
            <span>✅ Respuesta</span>
            <span className="text-sm font-light">Texto o Imagen</span>
          </label>
          <textarea
            maxLength={400}
            // type="text"
            name="answer"
            onChange={handleChange}
            value={newCard.answer}
            disabled={disableAnswerText}
            className={`relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              disableAnswerText && "line-through"
            } h-[150px]`}
            // placeholder="Escribe tu respuesta"
          ></textarea>
          <div className="w-full flex justify-end">
            <div
              className={
                "bg-gray-700 rounded-xl text-white w-fit mt-0 mb-2 self-end px-2 py-1 text-xs "
              }
            >
              {countLetters(newCard.answer)} /400 letras
            </div>
          </div>
          <label
            htmlFor="file"
            className="w-fit mr-4 py-2 px-4 rounded border-0 text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-2 cursor-pointer"
          >
            <input
              id="file"
              type="file"
              ref={fileInputRef}
              multiple={false}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />{" "}
            <span>
              Sube una imagen
            </span>
              <FaImage className="inline" />
            <span>-</span>
            <span>toma una foto</span>
            <FaCamera className="inline" />
          </label>
          <blockquote className="text-sm p-2 font-light border-l-4 my-2 bg-neutral-100 text-neutral-600 border-neutral-500 quote">
            Para crear un buen apunte te recomiendo usar el tamaño de 1080*1350
            px en{" "}
            <a
              href="https://canva.com"
              className=" text-blue-500 font-bold"
              target="_blank"
              rel="noreferrer
           "
            >
              Canva
            </a>
          </blockquote>

          {imageBlobUrl && (
            <Image
              src={imageBlobUrl}
              alt="Preview"
              className="mt-4 w-full object-cover rounded"
              width={300}
              height={300}
            />
          )}
          <button
            id="deselecting"
            type="button"
            onClick={removeImage}
            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 text-sm ${
              image ? "block" : "hidden"
            }`}
          >
            Quitar imagen
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
            {isLoading ? "Creando Card..." : "Crear"}
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
