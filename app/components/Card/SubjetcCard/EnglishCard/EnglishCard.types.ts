import { SubjectType } from "@/types/Card";

export interface EnglishAnswerProps {
  subjectType?: SubjectType;
  image?: string;
  pronunciation?: string;
  meaning?: string;
  examples?: { index: number; value: string }[];
}

export interface EnglishCardProps {
  isEditing: boolean;
  question?: string;
  answer?: string;
  setQuestion?: (question: string) => void;
  setAnswer?: (answer: string) => void;
  resetCard?: boolean;
  setResetCard?: (resetCard: boolean) => void;
  className?: string;
}
