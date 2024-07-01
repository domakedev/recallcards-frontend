import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/userSlice";
import { User } from "@/types/User";
import Error from "next/error";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
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

  const router = useRouter();
  const state = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const answer = await result.json();
      if (answer.ok) {
        //Subir a Redux
        const { id, email, roles } = answer.user;
        dispatch(setUser({ id, email, authenticated: true, roles }));
        toast.success(answer.message,{
          autoClose: 1000,
        });
        //visit the prev link
         router.back()
        // router.push("/");
      } else if (!answer.ok) {
        toast.error(answer.message,{
          autoClose: 1000,
          
        });
      }      
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
