import { FC, useEffect, useMemo, useState } from "react";
import { Footer, Header, TextArea } from "../components";
import { FaSeedling } from "react-icons/fa6";
import { SubjectCardProps } from "../SubjectCard";
import { SimpleAnswerProps } from "./SimpleCard.types";
import QuillJsCardCreator from "../../QuillJsCardCreator";

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

  const handleQuillChange = (content: string) => {
    setFields((prev) => ({ ...prev, explanation: content }));
  };

  return (
    <div
      className={`mx-1 w-full max-w-5xl rounded-2xl shadow-xl ${className}`}
    >
      <Header
        question={question ?? "-"}
        isEditing={isEditing}
        setQuestion={setQuestion}
      />
      <div className="flex flex-col bg-white p-5 sm:gap-5 rounded-b-2xl">
        <QuillJsCardCreator
          value={
            fields.explanation === ""
              ? answerParsed.explanation
              : fields.explanation
          }
          onChange={handleQuillChange}
          readOnly={!isEditing}
          theme={!isEditing ? "bubble" : "snow"}
        />
      </div>
      {/* <Footer
        subjectName="Simple"
        icon={<FaSeedling className="h-auto w-7" />}
      /> */}
    </div>
  );
};

export default SimpleCard;
