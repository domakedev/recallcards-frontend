import { deleteCardHandler } from "@/services/card.actions";
import { useRouter } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

interface DeleteCardButtonProps {
  userId: number;
  cardId: number;
  cardImage: string;
}

const DeleteCardButton = ({
  userId,
  cardId,
  cardImage,
}: DeleteCardButtonProps) => {
  const router = useRouter();
  const deleteCard = async () => {
    try {
      const result = await deleteCardHandler(userId, cardId, cardImage);
      toast.success(result);
      router.push("/");
    } catch (error) {
      toast.error("Error al eliminar la carta");
    }
  };
  return (
    <button
      className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded flex items-center gap-2 transition-colors duration-150 ease-in-out m-2"
      type="button"
      onClick={deleteCard}
    >
      Eliminar <AiOutlineDelete />
    </button>
  );
};

export default DeleteCardButton;
