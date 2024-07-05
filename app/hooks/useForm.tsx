import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/userSlice";
import { User } from "@/types/User";
import { signIn, useSession } from "next-auth/react";
import Error from "next/error";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import AuthErrorPage from "../auth/error/page";

export const useAuthForm = () => {
  const [form, setForm] = useState<User>({
    email: "",
    password: "",
  });
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const [credentialsError, seCredentialsErrort] = useState<boolean>(false);
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);

  const router = useRouter();
  const userState = useAppSelector((state) => {
    console.log("🚀 ~ useAuthForm ~ state:", state.user);
    return state.user;
  });
  const dispatch = useAppDispatch();
  const session = useSession();

  // useEffect(() => {
  //   if (session.status === "authenticated") {
  //     const user = {
  //       id: Number(session.data.user.id),
  //       email: session.data.user.email!,
  //       authenticated: true,
  //     };
  //     // setUserNextAuth(user);
  //     setUserAuthenticated(true)
  //     dispatch(setUser(user));
  //   }
  // }, [dispatch, session]);

  // useEffect(() => {
  //   if (userAuthenticated) {
  //     setRegisterLoading(false);
  //     window.location.replace("/");
  //   }
  // }, [userAuthenticated])

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
        dispatch(setUser({ id, email, authenticated: true }));
        toast.success(answer.message, {
          autoClose: 1000,
        });
        //visit the prev link
        router.back();
        // router.push("/");
      } else if (!answer.ok) {
        toast.error(answer.message, {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Algo falló al loguear al usuario");
    }
  };
  const loginUserNextAuthCredentials = async (
    e?: React.FormEvent<HTMLFormElement>
  ) => {
    e && e.preventDefault();
    try {
      setRegisterLoading(true);
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      console.log("🚀 ~ useAuthForm ~ result?.error || !result:", result);
      if (result?.error || !result) {
        toast.error("Algo falló al loguear al usuario");
        setRegisterLoading(false);
      } else if (!result.error) {
        // toast.success("Usuario logueado correctamente");
        window.location.replace("/");
      }
    } catch (error) {
      console.log("🚀 ~ useAuthForm ~ error:", error);
      toast.error("Algo falló al loguear al usuario");
    }
  };

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setRegisterLoading(true);

      console.log("🚀 ~ registerUser ~ form:", form);
      const result = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const answer = await result.json();
      // answer.ok ? toast.success(answer.message) : toast.error(answer.message);
      !answer.ok && toast.error(answer.message);
      if (answer.ok) {
        loginUserNextAuthCredentials();
      }
      setRegisterLoading(false);
    } catch (error) {
      toast.error("Algo falló al registrar el usuario");
    }
  };

  return {
    form,
    inputHandler,
    loginUser,
    loginUserNextAuthCredentials,
    registerUser,
    registerLoading,
  };
};
