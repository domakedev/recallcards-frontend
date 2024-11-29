import { FC, useEffect, useMemo, useState } from "react";
import { EnglishAnswerProps, EnglishCardProps } from "./EnglishCard.types";
import Image from "next/image";
import React from "react";
import { Footer, Header, TextArea } from "../components";
import { FaLanguage } from "react-icons/fa6";
import { highlightWord } from "@/utils/hightLightWord";
import InputText from "../components/InputText";

const EnglishCard: FC<EnglishCardProps> = ({
  isEditing,
  answer,
  question,
  setQuestion,
  setAnswer,
  resetCard,
  setResetCard,
  className,
}) => {
  const initialExamples = useMemo(
    () => [
      { index: 0, value: "" },
      { index: 1, value: "" },
      { index: 2, value: "" },
    ],
    [],
  );

  const [fields, setFields] = useState({
    image: "",
    pronunciation: "",
    meaning: "",
    examples: initialExamples,
  });

  const [requirements, setRequirements] = useState({
    pronunciationRequired: true,
    meaningRequired: true,
    examplesRequired: true,
  });

  const answerParsed: EnglishAnswerProps = useMemo(
    () => JSON.parse(answer || "{}"),
    [answer],
  );
  console.log("🚀 ~ answerParsed:", answerParsed);

  // Check and update requirement flags
  useEffect(() => {
    setRequirements({
      pronunciationRequired: fields.pronunciation === "",
      meaningRequired: fields.meaning === "",
      examplesRequired: fields.examples.every((ex) => ex.value === ""),
    });
  }, [fields]);

  // Update answer data
  useEffect(() => {
    if (isEditing && setAnswer && setResetCard) {
      if (
        !requirements.pronunciationRequired &&
        !requirements.meaningRequired &&
        !requirements.examplesRequired
      ) {
        setAnswer(JSON.stringify({ ...fields, subjectType: "ingles" }));
        setResetCard(false);
      } else {
        setAnswer("{}");
      }
    }
  }, [fields, requirements, setAnswer, setResetCard, isEditing]);

  // Reset card
  useEffect(() => {
    if (resetCard) {
      setFields({
        image: "",
        pronunciation: "",
        meaning: "",
        examples: initialExamples,
      });
    }
  }, [initialExamples, resetCard]);

  useEffect(() => {
    if (!isEditing) {
      setRequirements({
        pronunciationRequired: false,
        meaningRequired: false,
        examplesRequired: false,
      });
    }
  }, [isEditing]);

  const handleFieldChange = (field: string, value: string | any[]) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className={`mx-1 w-full max-w-[500px] rounded-2xl shadow-xl ${className}}`}
    >
      <Header
        question={question ?? "-"}
        isEditing={isEditing}
        setQuestion={setQuestion}
      />
      <div className="flex flex-col gap-5 bg-white p-5 sm:gap-5">
        <div className="flex flex-row items-center justify-between gap-2 sm:flex-row">
          <InputText
            title="Pronunciación"
            isEditing={isEditing}
            value={fields.pronunciation}
            field="pronunciation"
            valueChange={handleFieldChange}
            required={requirements.pronunciationRequired}
            answeredValue={answerParsed.pronunciation}
            inputColor="text-blue-600"
          />
          <div className="relative flex flex-col items-end gap-1">
            {isEditing && (
              <>
                <Image
                  src={
                    fields.image ||
                    "https://g-gem00kfgnge.vusercontent.net/placeholder.svg"
                  }
                  alt="Imagen descriptiva"
                  width={200}
                  height={200}
                  quality={100}
                  className="h-20 max-w-full rounded object-contain sm:h-28"
                />
                <input
                  type="text"
                  value={fields.image}
                  onChange={(e) => handleFieldChange("image", e.target.value)}
                  className="w-full rounded-md px-2 py-1"
                  placeholder="Pega un link de imagen"
                />
              </>
            )}
            {answerParsed.image && answerParsed.image !== "" && !isEditing && (
              <Image
                src={answerParsed.image}
                alt="Imagen descriptiva"
                width={200}
                height={200}
                quality={100}
                className="h-20 max-w-full rounded object-contain sm:h-28"
              />
            )}
          </div>
        </div>

        <TextArea
          title="Significado"
          field="meaning"
          titleColor="text-green-600"
          required={requirements.meaningRequired}
          isEditing={isEditing}
          value={fields.meaning}
          valueChange={handleFieldChange}
          question={question}
          answeredValue={answerParsed.meaning}
        />

        <div>
          <p className="text-base font-bold text-orange-600 sm:text-lg">
            Ejemplos
            {requirements.examplesRequired && (
              <span className="ml-2 text-xs text-red-500">
                Requerido al menos 1
              </span>
            )}
          </p>
          <div className="flex flex-col gap-1">
            {isEditing
              ? fields.examples.map((example, index) => (
                  <input
                    key={example.index}
                    type="text"
                    value={example.value}
                    onChange={(e) => {
                      const newExamples = [...fields.examples];
                      newExamples[index].value = e.target.value;
                      handleFieldChange("examples", newExamples);
                    }}
                    className="rounded-md px-2 py-1"
                  />
                ))
              : answerParsed.examples?.map(
                  (example, index) =>
                    example.value !== "" && (
                      <li
                        key={example.index}
                        className="text-sm sm:text-base"
                      >
                        {highlightWord(example.value, question)}
                      </li>
                    ),
                )}
          </div>
        </div>
      </div>
      <Footer
        subjectName="Inglés"
        icon={<FaLanguage className="h-auto w-7" />}
      />
    </div>
  );
};

export default EnglishCard;
