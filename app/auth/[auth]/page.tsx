"use client";

import { useAuthForm } from "@/app/hooks/useForm";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const router = useRouter();
  const params = useParams();

  const auth = params.auth;
  const isLogin = auth === "login";

  if (auth !== "login" && auth !== "register") {
    router.push("/auth/login");
  }

  const { form, inputHandler, loginUser, registerUser } = useAuthForm();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-md p-8 space-y-6 bg-gray-100 shadow-md rounded-md w-4/5">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          {isLogin ? "Inicia sesión" : "Regístrate"}
        </h2>
        {!isLogin && (
          <p className="text-center text-gray-600">
            Regístrate para saber qué apunte de estudio se te hace difícil y
            mostrártelo antes.
          </p>
        )}
        <form
          onSubmit={isLogin ? loginUser : registerUser}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={inputHandler}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={inputHandler}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 mt-4 font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700"
            >
              {isLogin ? "Inicia sesión" : "Regístrate"}
            </button>
            <p className="mt-4">
              {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
              <Link
                href={isLogin ? "/auth/register" : "/auth/login"}
                className="text-blue-500 hover:underline ml-3"
              >
                {isLogin ? "Crearme una cuenta" : "Iniciar sesión"}
              </Link>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AuthPage;
