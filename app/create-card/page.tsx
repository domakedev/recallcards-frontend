"use client";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";

const CreateCard: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileURL = URL.createObjectURL(files[0]);
      setImage(fileURL);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
    console.log({ title, image });
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
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Titulo (Opcional)
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Imagen (url o archivo)
          </label>
          <input
            type="text"
            name="image"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-3"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {image && (
            <Image
              src={image}
              alt="Preview"
              className="mt-4 w-full object-cover rounded"
              width={300}
              height={300}
            />
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-150 ease-in-out"
          >
            Crear
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
