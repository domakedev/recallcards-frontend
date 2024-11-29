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
  FC,
} from "react";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import { CgCamera } from "react-icons/cg";
import { FaCamera, FaImage } from "react-icons/fa";
import { useRouter } from "next/navigation";
import QuillJsCardCreator from "../components/Card/QuillJsCardCreator";

type SubjectTypes = "Ingles" | "Software";

const CreateCard: React.FC = () => {
  const [newCard, setNewCard] = useState<Card>({
    answer: "",
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
  const [contentQuillJs, setContentQuillJs] = useState<string>("");
  const [subjectType, setSubjectType] = useState<SubjectTypes>("Ingles");

  const router = useRouter();

  //Store
  const userStateRedux = useAppSelector((state) => state.user);
  const deckStateRedux = useAppSelector((state) => state.deck);

  useEffect(() => {
    setNewCard({ ...newCard, answer: contentQuillJs });
  }, [contentQuillJs]);

  useEffect(() => {
    if (image && !image?.type.includes("image")) {
      toast.error("Solo puedes subir imágenes");
      setImage(undefined);
      setImageBlobUrl("");
      setDisableAnswerText(false);
    }
  }, [image]);

  useEffect(() => {
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
    e.preventDefault();
    if (newCard.deckId === 0 || newCard.creatorId === 0) {
      toast.error("Primero selecciona un deck | Inicia sesión");
      return;
    }
    if (newCard.answer === "" && !image) {
      toast.error("No puedes dejar la respuesta vacía");
      return;
    }
    if (image && !image?.type.includes("image")) {
      toast.error("Solo puedes subir imágenes");
      return;
    }
    try {
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
        router.push(`/deck-${deckState?.id}-${deckState?.name}`);
      } else {
        //Enviar newCard al Backend
        const result = await createCard(newCard);
        toast.success(result.message, {
          autoClose: 1000,
        });
        removeImage();
        setNewCard({ ...newCard, answer: "", question: "" });
        setIsLoading(false);
        router.push(`/deck-${deckState?.id}-${deckState?.name}`);
      }
    } catch (error: any) {
      toast.error(error.message);
      // toast.error("Ocurrió un error al crear la carta");
    }
  };

  const countLetters = (text: string) => {
    return text.length;
  };

  const subjects: SubjectTypes[] = ["Ingles", "Software"];

  return (
    <div className="flex flex-row flex-wrap items-center bg-gradient-to-r from-blue-500 to-teal-500 pb-16 pt-4">
      {/* <NavBar
        title={`${
          userStateRedux.id !== deckState?.creatorId
            ? "No tienes permisos para crear cartas en este deck"
            : "🌲Tienes permiso⛅🌲"
        }`}
        goBack={false}
      /> */}
      <form
        onSubmit={handleSubmit}
        className="m-2 w-full max-w-lg rounded-lg bg-white p-6 shadow-xl sm:m-5 sm:p-8"
      >
        <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:justify-center">
          <p className="sm:text-md w-fit text-sm text-gray-400">
            ✍️ Crea tu apunte
          </p>
          <p className="sm:text-md w-fit text-sm text-gray-400">🧐 Estúdialo</p>
          <p className="sm:text-md w-fit text-sm text-gray-400">
            📲 Y registra tu progreso
          </p>
          <p className="sm:text-md w-full text-center text-sm font-bold text-gray-500">
            Con la técnica active recall recordaras para... <br /> ¡Siempre!⚡
          </p>
        </div>
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Crea una Card</h2>
        <div className="">
          <p>✅ Selecciona un tipo:</p>
          {subjects.map((subject, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSubjectType(subject)}
              className={`focus:shadow-outline my-2 mb-3 mr-3 mt-1 transform rounded bg-blue-300 px-4 py-1 font-bold text-white transition duration-150 ease-in-out hover:bg-blue-800 focus:outline-none ${
                subjectType === subject ? "bg-blue-800" : ""
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
        <div className="mb-4">
          <label
            htmlFor="question"
            className="mb-2 block text-sm font-bold text-gray-700"
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
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 flex flex-col gap-1 text-sm font-bold text-gray-700">
            {/* Respuesta puede ser: texto o imagen(url o archivo) */}
            <span>✅ Respuesta</span>
            <span className="text-sm font-light">
              Por ahora solo se admite 1 opción: Texto o Imagen
            </span>
          </label>
          <textarea
            maxLength={400}
            // type="text"
            name="answer"
            onChange={handleChange}
            value={newCard.answer}
            disabled={disableAnswerText}
            className={`focus:shadow-outline relative w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
              disableAnswerText && "line-through"
            } h-[150px]`}
            placeholder="Escribe tu respuesta"
          ></textarea>
          {!disableAnswerText && (
            <>
              {/* <blockquote className="text-sm p-2 font-light border-l-4 my-2 bg-neutral-100 text-neutral-600 border-neutral-500 quote">
                Para devs: Puedes copiar código con formato de Visual Studio
                Code con: <code>CTRL + SHIFT + p</code>
              </blockquote> */}
              <QuillJsCardCreator
                onChange={setContentQuillJs}
                value={contentQuillJs}
              />
            </>
          )}
          {/* <div className="w-full flex justify-end">
            <div
              className={
                "bg-gray-700 rounded-xl text-white w-fit mt-0 mb-2 self-end px-2 py-1 text-xs "
              }
            >
              {countLetters(newCard.answer)} /400 letras
            </div>
          </div> */}
          <label
            htmlFor="file"
            className="mr-4 mt-5 flex w-fit cursor-pointer items-center gap-2 rounded border-0 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
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
            <span>O sube una imagen</span>
            <FaImage className="inline" />
            <span>-</span>
            <span>toma una foto</span>
            <FaCamera className="inline" />
          </label>
          <blockquote className="quote my-2 flex items-center border-l-4 border-neutral-500 bg-neutral-100 p-2 text-sm font-light text-neutral-600">
            En imagen te recomiendo usar un formato rectangular tipo Card:{" "}
            <span className="text-3xl">🎴</span>
          </blockquote>

          {imageBlobUrl && (
            <Image
              src={imageBlobUrl}
              alt="Preview"
              className="mt-4 w-full rounded object-cover"
              width={300}
              height={300}
            />
          )}
          <button
            id="deselecting"
            type="button"
            onClick={removeImage}
            className={`focus:shadow-outline mt-4 rounded bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 focus:outline-none ${
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
            className={`focus:shadow-outline transform rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none ${
              userId === deckState?.creatorId && thereIsDeck
                ? ""
                : "cursor-not-allowed bg-gray-500 hover:bg-gray-500"
            }`}
          >
            {isLoading ? "Creando Card..." : "Crear"}
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
      <EnglishCard
        question={newCard.question}
        answer={undefined}
      />
    </div>
  );
};

export default CreateCard;

interface EnglishCardProps {
  question?: string;
  answer?: EnglishAnswerProps;
}

interface EnglishAnswerProps {
  type: string;
  image: string;
  pronunciation: string;
  meaning: string;
  examples: string[];
}

const EnglishCard: FC<EnglishCardProps> = ({ answer, question }) => {
  return (
    <div className="mx-2 w-full max-w-lg rounded-2xl bg-white shadow-xl">
      <div className="rounded-t-lg bg-blue-500 p-3 sm:p-5">
        <h1 className="mx-auto w-10/12 rounded-xl bg-gray-700 p-2 text-center text-white sm:p-4 sm:text-xl">
          {question ?? "Escribe tu pregunta o título"}
        </h1>
      </div>
      <div className="flex flex-col gap-3 p-5 sm:gap-8">
        <div className="flex justify-between">
          <div className="">
            <p className="text-base font-bold text-blue-600 sm:text-lg">
              Pronunciación
            </p>
            <p className="text-sm sm:text-base">{answer?.pronunciation}</p>
          </div>
          {answer?.image && (
            <Image
              src={answer.image}
              alt="Preview"
              width={1000}
              height={1000}
              quality={100}
              className="h-20 w-20 rounded object-cover sm:h-28 sm:w-28"
            />
          )}
        </div>
        <div className="">
          <p className="text-base font-bold text-green-600 sm:text-lg">
            Significado
          </p>
          <p className="text-sm sm:text-base">{answer?.meaning}</p>
        </div>
        <div className="">
          <p className="text-base font-bold text-orange-600 sm:text-lg">
            Ejemplos
          </p>
          <ul className="ml-5 list-disc">
            {answer?.examples.map((example, index) => (
              <li
                key={index}
                className="text-sm sm:text-base"
              >
                {example}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-1 rounded-b-lg bg-blue-500 p-2 sm:flex-nowrap sm:gap-5 sm:p-5">
        <div className="rounded-xl bg-gray-800 p-2 sm:p-3">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlfflIaYdVuhEMbs1DXU4DRSr0BJqk19-Crw&s"
            alt="Preview"
            width={100}
            height={100}
            className="w-10 rounded object-cover sm:w-20"
          />
          <p className="mt-2 rounded-md bg-blue-600 p-1 text-center text-xs text-white sm:px-2 sm:text-base">
            Ingles
          </p>
        </div>
        <div className="flex w-fit items-center justify-center rounded-xl bg-gray-800 p-1 text-2xl text-white sm:p-3">
          <span className="mr-1 text-base font-bold text-red-500 sm:text-2xl">
            {"<"}
          </span>
          <p className="text-base font-bold sm:text-2xl">DoMakeDev.com</p>
          <span className="text-base font-bold text-blue-500 sm:text-2xl">
            /
          </span>
          <span className="ml-1 text-base font-bold text-yellow-500 sm:text-2xl">
            {">"}
          </span>
        </div>
        <Image
          src="https://www.domakedev.com/icon.jpg?9847d6b629f0f82b"
          alt="Preview"
          width={100}
          height={100}
          quality={100}
          className="w-10 sm:w-20"
        />
      </div>
    </div>
  );
};
