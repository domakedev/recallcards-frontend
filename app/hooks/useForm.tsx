import { User } from "@/types/User";
import Error from "next/error";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

export const useAuthForm = () => {
  
  const [form, setForm] = useState<User>({
    email: "",
    password: "",
  });

  useEffect(() => {
    return () => {};
  }, []);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(
      "🚀 ~ inputHandler ~ [e.target.name]: e.target.value:",
      [e.target.name],
      e.target.value
    );
  };

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("🚀 ~ sendUserData ~ form:", form);

      const result = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const answer = await result.json();
      console.log("🚀 ~ loginUser ~ answer:", answer);
      if (answer.ok) {
        toast.success(answer.message);
      } else if (!answer.ok) {
        toast.error(answer.message);
      }
      // answer.ok ? toast.success("Usuario logeado") : toast.error(answer.message);
    } catch (error) {
      toast.error("Algo falló al loguear al usuario");
    }
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const answer = await result.json();
      answer.ok ? toast.success(answer.message) : toast.error(answer.message);
    } catch (error) {
      toast.error("Algo falló al registrar el usuario");
    }
  };

  return { form, inputHandler, loginUser, registerUser };
};
