import { auth } from "@/auth";
import { getDecksByUserIdAction } from "@/services/deck.actions";
import DeckGrid from "../components/DeckGrid";
import { redirect } from "next/navigation";

const MisDecks = async () => {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/auth/login");
  }

  const deckCards = await getDecksByUserIdAction(+session?.user.id);
  return (
    <div>
      <DeckGrid decks={deckCards} />
    </div>
  );
};

export default MisDecks;
