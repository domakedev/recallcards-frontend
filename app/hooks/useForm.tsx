import { User } from "@/types/User";
import Error from "next/error";
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
    console.log("🚀 ~ sendUserData ~ form:", form);
    const result = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const answer = await result.json();
    answer.ok ? toast.success("Usuario logeado") : toast.error(answer.message);
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("🚀 ~ sendUserData ~ form:", form);
    const result = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const answer = await result.json();
    answer.ok
      ? toast.success("Usuario registrado")
      : toast.error(answer.message);
  };

  return { form, inputHandler, loginUser, registerUser };
};
