"use client";
import { useAppSelector } from "@/redux/hooks";
import { createCard } from "@/services/card.services";
import { Card, SubjectType } from "@/types/Card";
import React, { useState, FC, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  EnglishCard,
  SimpleCard,
  SoftwareCard,
} from "../components/Card/SubjetcCard";

const CreateCard: React.FC = () => {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isDeckSelected, setIsDeckSelected] = useState<boolean>(false);

  //Store
  const userStateRedux = useAppSelector((state) => state.user);
  const deckStateRedux = useAppSelector((state) => state.deck);

  useEffect(() => {
    if (userStateRedux.authenticated) {
      setIsAuth(true);
    }
  }, [router, userStateRedux]);

  useEffect(() => {
    if (deckStateRedux.id !== 0) {
      setIsDeckSelected(true);
    }
  }, [deckStateRedux]);

  const [newCard, setNewCard] = useState<Card>({
    question: "",
    answer: "{}",
    deckId: 0,
    creatorId: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subjectType, setSubjectType] = useState<SubjectType>("simple");
  const [resetCard, setResetCard] = useState<boolean>(false);

  useEffect(() => {
    if (
      newCard.creatorId !== userStateRedux.id &&
      newCard.deckId !== deckStateRedux.id
    ) {
      setNewCard({
        ...newCard,
        creatorId: userStateRedux.id,
        deckId: deckStateRedux.id,
      });
    }
  }, [deckStateRedux.id, newCard, userStateRedux.id]);

  if (!isAuth) {
    return <p>Primero inicia sesión</p>;
  }

  if (!isDeckSelected) {
    return <p>Primero selecciona un deck</p>;
  }

  const handleQuestion = (question: string) => {
    setNewCard({ ...newCard, question });
  };

  const handleAnswer = (answer: string) => {
    if (!(answer === newCard.answer)) {
      setNewCard({ ...newCard, answer });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      console.log("🚀 ~ handleSubmit ~ newCard:", newCard);
      console.log("🚀 ~ handleSubmit ~ newCard:", JSON.parse(newCard.answer));
      if (newCard.question === "") {
        toast.warning("Ingresa la pregunta o título");
        setIsLoading(false);
        return;
      }
      if (newCard.answer === "{}") {
        toast.warning("Completa todos los campos de la tarjeta");
        setIsLoading(false);
        return;
      }

      //Enviar newCard al Backend
      const result = await createCard(newCard);
      toast.success(result.message, {
        autoClose: 1000,
      });
      setNewCard({ ...newCard, answer: "{}", question: "" });
      setIsLoading(false);
      setResetCard(true);
      router.push(`/deck-${deckStateRedux?.id}-${deckStateRedux?.deckName}`);
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Ocurrió un error al crear la carta");
    }
  };

  const subjects: SubjectType[] = ["simple", "ingles", "software"];

  return (
    <div className="flex min-h-[calc(100vh-136px)] flex-row flex-wrap items-start justify-center gap-5 bg-gradient-to-r from-blue-500 to-teal-500 pb-4 pt-4 md:items-center">
      <div className="flex w-full max-w-96 flex-col items-center gap-2">
        <SelectSubjectCard
          subjects={subjects}
          setSubjectType={setSubjectType}
          subjectType={subjectType}
        />
        <div className="flex items-center justify-between gap-5">
          <button
            type="submit"
            disabled={
              !isDeckSelected || userStateRedux.id !== deckStateRedux?.creatorId
            }
            className={`focus:shadow-outline transform rounded bg-green-500 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-green-700 focus:outline-none ${
              userStateRedux.id === deckStateRedux?.creatorId && isDeckSelected
                ? ""
                : "cursor-not-allowed bg-gray-500 hover:bg-gray-500"
            } `}
            onClick={handleSubmit}
          >
            {isLoading ? "Creando Card..." : "Crear"}
          </button>
          <button
            type="button"
            className="focus:shadow-outline transform rounded bg-gray-500 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:outline-none"
            onClick={() => {
              router.back();
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
      {subjectType === "ingles" && (
        <EnglishCard
          question={newCard.question}
          setQuestion={handleQuestion}
          answer={newCard.answer}
          setAnswer={handleAnswer}
          isEditing={true}
          resetCard={resetCard}
          setResetCard={setResetCard}
        />
      )}
      {subjectType === "software" && (
        <SoftwareCard
          question={newCard.question}
          setQuestion={handleQuestion}
          answer={newCard.answer}
          setAnswer={handleAnswer}
          isEditing={true}
          resetCard={resetCard}
          setResetCard={setResetCard}
        />
      )}
      {subjectType === "simple" && (
        <SimpleCard
          question={newCard.question}
          setQuestion={handleQuestion}
          answer={newCard.answer}
          setAnswer={handleAnswer}
          isEditing={true}
          resetCard={resetCard}
          setResetCard={setResetCard}
        />
      )}
    </div>
  );
};

export default CreateCard;

interface SelectSubjectCard {
  setSubjectType: (subject: SubjectType) => void;
  subjectType: SubjectType;
  subjects: SubjectType[];
}

const SelectSubjectCard: FC<SelectSubjectCard> = ({
  setSubjectType,
  subjectType,
  subjects,
}) => {
  return (
    <div className="m-2 flex w-fit max-w-sm flex-col gap-3 rounded-lg bg-white px-10 py-5 shadow-xl sm:m-5 sm:p-8">
      <h2 className="text-center text-2xl font-bold text-gray-800">
        Crear Flashcard
      </h2>
      <div className="flex flex-col items-center justify-center gap-1">
        <p>Selecciona un tipo</p>
        <div className="flex flex-row flex-wrap justify-center gap-3">
          {subjects.map((subject, index) => (
            <button
              key={index}
              onClick={() => setSubjectType(subject)}
              className={`rounded bg-blue-300 px-4 py-1 font-bold capitalize text-white hover:bg-blue-800 ${
                subjectType === subject ? "bg-blue-800" : ""
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
