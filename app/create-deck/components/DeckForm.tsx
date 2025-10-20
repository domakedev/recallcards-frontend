import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { FaCamera, FaImage } from "react-icons/fa6";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "react-toastify";
import { Deck } from "@/types/Deck";
import { uploadImage } from "@/services/image.services";
import { createDeck } from "@/services/deck.services";
import { setDeck as setDeckRedux } from "@/redux/deckSlice";
import { nameToSlug } from "@/utils/nameToSlug";
import { useRouter } from "next/navigation";

interface DeckFormProps {
  deck: Deck;
  setDeck: React.Dispatch<React.SetStateAction<Deck>>;
  isAuth: boolean;
}

const DeckForm: FC<DeckFormProps> = ({ deck, setDeck, isAuth }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const [imageBlobUrl, setImageBlobUrl] = useState<string>("");
  const [image, setImage] = useState<File>();

  useEffect(() => {
    if (image && !image?.type.includes("image")) {
      toast.error("Solo puedes subir imágenes");
      setImage(undefined);
      setImageBlobUrl("");
    }
  }, [image]);

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      return;
    }
    const blob = URL.createObjectURL(file);
    setImageBlobUrl(blob);
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (deck.name.length < 4) {
      toast.error("Escribe un nombre de mínimo 4 caracteres.");
      return;
    }
    if (deck.name.length > 35) {
      toast.error("Escribe un nombre de máximo 35 caracteres.");
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
        `/deck-${result.newDeck.id}-${nameToSlug(result.newDeck.name)}`,
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeck({ ...deck, [name]: value });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6"
    >
      <div className="-space-y-px rounded-md">
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
              className={`border-gray-350 relative w-full appearance-none rounded-md border px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm ${
                !isAuth ? "cursor-not-allowed" : ""
              } ${
                deck.name.length > 35
                  ? "focus:border-red-500 focus:ring-red-500"
                  : "focus:border-indigo-500 focus:ring-indigo-500"
              }`}
              placeholder="Nombre del Deck"
            />
            <div
              className={`absolute bottom-8 right-1 rounded-lg bg-gray-800 p-1 text-right text-xs ${
                deck.name.length > 35
                  ? "bg-red-500 text-white"
                  : "text-gray-400"
              }`}
            >
              {deck.name.length}/35
            </div>
          </label>
        </div>
        {isAuth && (
          <div>
            <label
              htmlFor="image"
              className="mr-4 mt-5 flex w-fit cursor-pointer items-center gap-2 rounded border-0 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
            >
              <input
                type="file"
                name="image"
                accept="image/*"
                id="image"
                multiple={false}
                onChange={fileChangeHandler}
                className="hidden"
              />
              <span className="text-black">Portada del Deck:</span>
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
                className="mt-4 aspect-square w-full rounded object-cover"
                width={350}
                height={350}
              />
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!isAuth}
        className={`${isLoading && "rainbow-animation"} ${!isAuth ? "cursor-not-allowed bg-gray-600 text-white" : "bg-indigo-600"} relative flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
      >
        {isAuth
          ? isLoading
            ? "Creando Deck "
            : "Crear Deck"
          : "Debes iniciar sesión primero."}
      </button>
    </form>
  );
};

export default DeckForm;
