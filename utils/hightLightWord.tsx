export const highlightWord = (
  text: string | undefined,
  question: string | undefined,
) => {
  if (!text) return "";
  if (!question) return text;
  // Crea una expresión regular que busque la palabra sin importar mayúsculas o minúsculas
  const regex = new RegExp(question, "gi");
  const parts = text.split(regex); // Divide el texto en partes

  return parts.map((part, index) => (
    <>
      {part}
      {index !== parts.length - 1 && (
        <strong className="uppercase text-blue-500">{question}</strong>
      )}
    </>
  ));
};
