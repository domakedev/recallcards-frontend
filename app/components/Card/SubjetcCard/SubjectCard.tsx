import React from "react";
import EnglishCard from "./EnglishCard/EnglishCard";
import SoftwareCard from "./SoftwareCard/SoftwareCard";
import SimpleCard from "./SimpleCard/SimpleCard";

export interface SubjectCardProps {
  isEditing: boolean;
  question?: string;
  answer?: string;
  setQuestion?: (question: string) => void;
  setAnswer?: (answer: string) => void;
  resetCard?: boolean;
  setResetCard?: (resetCard: boolean) => void;
  className?: string;
}

const SubjectCard = ({
  answer,
  question,
}: {
  answer: string;
  question: string;
}) => {
  const answerParsed = JSON.parse(answer);
  if (answerParsed.subjectType === "ingles") {
    return (
      <EnglishCard
        answer={answer}
        isEditing={false}
        question={question}
      />
    );
  }
  if (answerParsed.subjectType === "software") {
    return (
      <SoftwareCard
        answer={answer}
        isEditing={false}
        question={question}
        className="mb-32 mt-12"
      />
    );
  }
  if (answerParsed.subjectType === "simple") {
    return (
      <SimpleCard
        answer={answer}
        isEditing={false}
        question={question}
        className="mb-32 mt-12"
      />
    );
  }
};

export default SubjectCard;
