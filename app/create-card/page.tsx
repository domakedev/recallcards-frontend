"use client";
import { createCard } from "@/services/card.services";
import { uploadImage } from "@/services/image.services";
import { Card } from "@/types/Card";
import { set } from "@cloudinary/url-gen/actions/variable";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import { toast } from "react-toastify";

const CreateCard: React.FC = () => {
  const [newCard, setNewCard] = useState<Card>({
    answer: "",
    question: "",
    // @TODO: Cambiar estos valores por los valores reales
    deckId: 1,
    creatorId: 1,
  });
  const [image, setImage] = useState<File>();
  const [disableInputAns, setDisableInputAns] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageBlobUrl, setImageBlobUrl] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const blob = URL.createObjectURL(files[0]);
      setImageBlobUrl(blob);
      setImage(files[0]);
      setDisableInputAns(true);
    } else {
      setDisableInputAns(false);
      setImageBlobUrl("");
      setImage(undefined);
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
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      let imageURL = "";
      let newCardCopy = { ...newCard };
      // Lógica para manejar el envío del formulario

      //Cargar imagen a Cloudinary y obtener la URL
      if (image) {
        //@TODO: añadir 2do argumento: deckName
        setIsLoading(true);
        imageURL = await uploadImage(image);
        //Establecer url en newCard.answer
        newCardCopy = {
          ...newCard,
          answer: imageURL,
        };
      }

      if (newCard.answer === "" && newCard.question === "") {
        toast.error("Si no envías imagen debes enviar una pregunta y respuesta");
        return
      }

      //Enviar newCard al Backend
      const result = await createCard(newCardCopy);
      toast.success(result.message);
      removeImage();
      setNewCard({
        answer: "",
        question: "",
        // @TODO: Cambiar estos valores por los valores reales
        deckId: 1,
        creatorId: 1,
      });
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      // toast.error("Ocurrió un error al crear la carta");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8"
      >
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
            value={newCard.question}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Respuesta puede ser: texto o imagen(url o archivo)
          </label>
          <input
            type="text"
            name="answer"
            onChange={handleChange}
            value={newCard.answer}
            disabled={disableInputAns}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
          />
          <input
            type="file"
            ref={fileInputRef}
            multiple={false}
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out"
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
