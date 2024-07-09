import { deleteCardAction } from "@/services/card.actions";
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
      const result = await deleteCardAction(userId, cardId, cardImage);
      if (result?.ok === true) {
        toast.success(result.message);
        router.push("/mis-decks");
        // router.back();
      }
      if (result?.ok === false) {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error al eliminar la carta");
    }
  };
  return (
    <button
      className="md:fixed top-24 right-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded flex items-center gap-2 transition-colors duration-150 ease-in-out m-2 mx-auto"
      type="button"
      onClick={deleteCard}
    >
      Eliminar Card <AiOutlineDelete />
    </button>
  );
};

export default DeleteCardButton;
