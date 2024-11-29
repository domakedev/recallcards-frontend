import React, { FC, useEffect, useMemo, useState } from "react";
import { SubjectCardProps } from "../SubjectCard";
import { Footer, Header, InputText, TextArea } from "../components";
import { FaLaptopCode } from "react-icons/fa";
import QuillJsCardCreator from "../../QuillJsCardCreator";

const SoftwareCard: FC<SubjectCardProps> = ({
  isEditing,
  question,
  answer,
  setAnswer,
  setQuestion,
  setResetCard,
  className,
}) => {
  type SoftwareCard = {
    description: string;
    code: string;
    helpLink: string;
  };
  const answerParsed: SoftwareCard = useMemo(
    () => JSON.parse(answer ?? "{}"),
    [answer],
  );

  const [requirements, setRequirements] = useState({
    description: true,
    code: true,
  });
  const [fields, setFields] = useState<SoftwareCard>({
    description: "",
    code: "",
    helpLink: "",
  });
  console.log("🚀 ~ fields:", fields);

  const setFieldHandler = (field: string, value: string) => {
    setFields((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const setCodeHandler = (content: string) => {
    setFields((prevData) => ({
      ...prevData,
      code: content,
    }));
  };

  useEffect(() => {
    if (isEditing) {
      setRequirements({
        description: fields.description === "",
        code: fields.code === "",
      });
    }
  }, [fields, isEditing]);

  useEffect(() => {
    if (!isEditing) {
      setRequirements({
        description: false,
        code: false,
      });
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing && setAnswer && setResetCard) {
      if (!requirements.description && !requirements.code) {
        setAnswer(JSON.stringify({ ...fields, subjectType: "software" }));
        setResetCard(false);
      } else {
        setAnswer("{}");
      }
    }
  }, [fields, requirements, setAnswer, setResetCard, isEditing]);

  return (
    <div className={`container mx-1 w-full rounded-2xl shadow-xl ${className}`}>
      <Header
        question={question ?? "-"}
        isEditing={isEditing}
        setQuestion={setQuestion}
      />
      <div className="flex flex-col gap-5 bg-white p-5 sm:gap-5">
        <TextArea
          field="description"
          title="Descripción"
          isEditing={isEditing}
          value={fields.description}
          valueChange={setFieldHandler}
          required={requirements.description}
          answeredValue={answerParsed.description}
        />
        <QuillJsCardCreator
          value={fields.code === "" ? answerParsed.code : fields.code}
          onChange={setCodeHandler}
          readOnly={!isEditing}
          theme={!isEditing ? "bubble" : "snow"}
        />
        <InputText
          field="helpLink"
          title="Link de apoyo"
          isEditing={isEditing}
          value={fields.helpLink}
          valueChange={setFieldHandler}
          required={false}
          answeredValue={answerParsed.helpLink}
        />
      </div>

      <Footer
        subjectName="Software"
        icon={<FaLaptopCode />}
      />
    </div>
  );
};

export default SoftwareCard;
