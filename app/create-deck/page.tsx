/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import { Deck } from "@/types/Deck";
import { toast } from "react-toastify";
import { createDeck } from "@/services/deck.services";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/services/image.services";
import Image from "next/image";
import { nameToSlug } from "@/utils/nameToSlug";
import { setDeck as setDeckRedux } from "@/redux/deckSlice";
import { FaCamera, FaImage } from "react-icons/fa";

const page = () => {
  const router = useRouter();
  const [deck, setDeck] = useState<Deck>({
    name: "",
    image: "",
    creatorId: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [title, setTitle] = useState("Crea un nuevo Deck");
  const userState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [imageBlobUrl, setImageBlobUrl] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  // const userState = {
  //   authenticated: true,
  //   id: 1,
  // };

  useEffect(() => {
    if (!userState.authenticated) {
      setIsAuth(false);
      toast.error("Para crear un deck regístrate o inicia sesión.");
    }
    if (userState.authenticated) {
      setDeck({ ...deck, creatorId: userState.id });
      setIsAuth(true);
      setIsAdmin(userState.roles.includes("admin"));
    }
  }, [userState]);

  useEffect(() => {
    if (image && !image?.type.includes("image")) {
      toast.error("Solo puedes subir imágenes");
      setImage(undefined);
      setImageBlobUrl("");
    }
  }, [image]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeck({ ...deck, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (deck.name.length < 4) {
      toast.error("Escribe un nombre de mínimo 4 caracteres.");
      return;
    }
    if (deck.name.length > 15) {
      toast.error("Escribe un nombre de máximo 15 caracteres.");
      return;
    }
    if (!image) {
      toast.error("Añade una imagen para tu deck.");
      return;
    }
    if (deck.id === 0) {
      return;
    }
    if (!image?.type.includes("image")) {
      toast.error("Solo puedes subir imágenes");
      return;
    }
    setIsLoading(true);
    const imageResult = await uploadImage(image);
    const newDeck = { ...deck, image: imageResult };
    const result = await createDeck(newDeck);
    if (result.ok) {
      setIsLoading(false);
      setTitle("¡Creado! ¿Uno más?");
      toast.success("Deck Creado", {
        //speed
        autoClose: 1000,
      });
      setDeck({ name: "", image: "", creatorId: 0 });
      const newDeck = {
        id: result.newDeck.id,
        deckName: result.newDeck.name,
        deckImage: result.newDeck.image,
        creatorId: result.newDeck.creatorId,
      };
      dispatch(setDeckRedux(newDeck));
      router.push(
        `/deck-${result.newDeck.id}-${nameToSlug(result.newDeck.name)}`
      );
    }
  };

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      return;
    }
    const blob = URL.createObjectURL(file);
    setImageBlobUrl(blob);
    setImage(file);
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Usa un nombre <strong>claro</strong> para el <strong>tema</strong>{" "}
            de tu deck y luego dentro del Deck podrás subir/crear tus apuntes o
            Cards, es ¡gratis!😁
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label
                htmlFor="name"
                className="relative"
              >
                <input
                  type="text"
                  disabled={!isAuth}
                  id="name"
                  name="name"
                  value={deck.name}
                  onChange={handleChange}
                  required
                  className={`appearance-none rounded-none relative w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm ${
                    !isAuth ? "cursor-not-allowed" : ""
                  } ${
                    deck.name.length > 15
                      ? "focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-indigo-500 focus:border-indigo-500"
                  }`}
                  placeholder="Nombre del Deck o tema"
                />
                <div
                  className={`absolute bottom-8 right-1 bg-gray-800 text-right text-xs rounded-lg p-1  ${
                    deck.name.length > 15
                      ? "text-white bg-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {deck.name.length}/15
                </div>
              </label>
            </div>
            <div>
              {/* <label
                htmlFor="image"
                className="sr-only"
              >
                Deck Image URL. 
              </label>
              <input
                type="text"
                disabled={!isAuth}
                id="image"
                name="image"
                value={deck.image}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  !isAuth ? "cursor-not-allowed" : ""
                }`}
                placeholder="Deck Image[1:1] URL"
              /> */}
              <label
                htmlFor="image"
                // className="  cursor-pointer flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                className="w-fit mr-4 py-2 px-4 mt-5 rounded border-0 text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  id="image"
                  multiple={false}
                  onChange={fileChangeHandler}
                  // className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  className="hidden"
                />{" "}
                <span className="text-black">Portada del Deck</span>
                <span className="">Imagen</span>
                <FaImage className="inline" />
                <span>o</span>
                <span>Foto</span>
                <FaCamera className="inline" />
              </label>
              {imageBlobUrl && (
                <Image
                  src={imageBlobUrl}
                  alt="Preview"
                  className="mt-4 w-full object-cover rounded"
                  width={300}
                  height={300}
                />
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!isAuth}
              className={`${
                isLoading ? "rainbow-animation" : ""
              } group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                !isAuth ? "cursor-not-allowed bg-gray-600 " : ""
              }`}
            >
              {isAuth
                ? isLoading
                  ? "Creando Deck "
                  : "Crear Deck"
                : "Debes iniciar sesión primero."}
            </button>
          </div>
        </form>
        {isAuth ? null : (
          <>
            <button
              onClick={() => router.push("/auth/login")}
              disabled={isAuth}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 my-4`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => router.push("/auth/register")}
              disabled={isAuth}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 my-4`}
            >
              Registrarme
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
