import { FC, useEffect, useMemo, useState } from "react";
import { Footer, Header, TextArea } from "../components";
import { FaSeedling } from "react-icons/fa6";
import { SubjectCardProps } from "../SubjectCard";
import { SimpleAnswerProps } from "./SimpleCard.types";

const SimpleCard: FC<SubjectCardProps> = ({
  isEditing,
  answer,
  question,
  setQuestion,
  setAnswer,
  resetCard,
  setResetCard,
  className,
}) => {
  const [fields, setFields] = useState({ explanation: "" });
  const answerParsed: SimpleAnswerProps = useMemo(
    () => JSON.parse(answer || "{}"),
    [answer],
  );

  useEffect(() => {
    if (resetCard) setFields({ explanation: "" });
  }, [resetCard]);

  useEffect(() => {
    if (isEditing && setAnswer && setResetCard) {
      const explanationRequired = fields.explanation === "";
      setAnswer(
        JSON.stringify(
          explanationRequired ? {} : { ...fields, subjectType: "simple" },
        ),
      );
      setResetCard(false);
    }
  }, [fields, isEditing, setAnswer, setResetCard]);

  const handleFieldChange = (field: string, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className={`mx-1 w-full max-w-[500px] rounded-2xl shadow-xl ${className}`}
    >
      <Header
        question={question ?? "-"}
        isEditing={isEditing}
        setQuestion={setQuestion}
      />
      <div className="flex flex-col bg-white p-5 py-10 sm:gap-5">
        <TextArea
          title="Explicación"
          field="explanation"
          titleColor="text-gray-600"
          required={isEditing && fields.explanation === ""}
          isEditing={isEditing}
          value={fields.explanation}
          valueChange={handleFieldChange}
          question={question}
          answeredValue={answerParsed.explanation}
        />
      </div>
      <Footer
        subjectName="Simple"
        icon={<FaSeedling className="h-auto w-7" />}
      />
    </div>
  );
};

export default SimpleCard;
