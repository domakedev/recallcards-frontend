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

const CreateCard: React.FC = () => {
  const [newCard, setNewCard] = useState<Card>({
    answer: "",
    question: "",
    // @TODO: Cambiar estos valores por los valores reales
    deckId: 0,
    creatorId: 0,
  });
  const [image, setImage] = useState<File>();
  const [images, setImages] = useState<FileList>();
  const [disableInputAns, setDisableInputAns] = useState<boolean>(false);
  const [disableTitle, setDisableTitle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [thereIsDeck, setThereIsDeck] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageBlobUrl, setImageBlobUrl] = useState<string>("");
  const [userId, setUserId] = useState<number>();
  const [deckState, setDeckState] = useState<DeckDB>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
    } else {
      setDisableInputAns(false);
      setImageBlobUrl("");
      setImage(undefined);
    }
    if (files && files.length > 1) {
      setImages(files);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  const removeImage = () => {
    setImage(undefined);
    setImageBlobUrl("");
    setImageUrl("");
    setDisableInputAns(false);
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
      if (!image) {
        if (!images || images.length === 0) {
          toast.error("Debes enviar al menos 1 imagen");
          return;
        } else if (images) {
        }
      }

      //Cargar imagen a Cloudinary y obtener la URL
      if (image) {
        //@TODO: añadir 2do argumento: deckId
        setIsLoading(true);
        imageURL = await uploadImage(image, String(deckState?.id));
        //Establecer url en newCard.answer
        newCardCopy = {
          ...newCard,
          answer: imageURL,
        };

        //Enviar newCard al Backend
        const result = await createCard(newCardCopy);
        toast.success(result.message);
        removeImage();
        setNewCard({
          answer: "",
          question: "",
          // @TODO: Cambiar estos valores por los valores reales
          deckId: 0,
          creatorId: 0,
        });
        setIsLoading(false);
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
        toast.success("Cards creadas con éxito");
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      // toast.error("Ocurrió un error al crear la carta");
    }
  };

  useEffect(() => {
    if (images && images.length > 1) {
      setDisableTitle(true);
      setNewCard({ ...newCard, question: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen -mb-16 pb-16">
      <NavBar
        title={`${userStateRedux.id!==deckState?.creatorId ? "No tienes permisos para crear cartas en este deck":"🌲⛅🌲"}`}
        goBack
      />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8"
      >
        <p className=" text-md text-gray-400">Deck: {deckState?.name}</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Crea una Card</h2>
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Titulo/Pregunta (Opcional)
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
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {/* Respuesta puede ser: texto o imagen(url o archivo) */}
            Respuesta: imagen(es)
          </label>
          {/* <input
            type="text"
            name="answer"
            onChange={handleChange}
            value={newCard.answer}
            disabled={disableInputAns}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
          /> */}
          <input
            type="file"
            ref={fileInputRef}
            multiple={true}
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

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
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 text-sm"
          >
            Quitar imagen
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            // disabled={!thereIsDeck || userId!==deckState?.creatorId}
            disabled={userId !== deckState?.creatorId || !thereIsDeck || !isAdmin}
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
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCard;
