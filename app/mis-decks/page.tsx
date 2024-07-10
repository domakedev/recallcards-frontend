import { auth } from "@/auth";
import { getDecksByUserIdAction } from "@/services/deck.actions";
import DeckGrid from "../components/DeckGrid";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaLayerGroup } from "react-icons/fa";
import CreateButton from "../components/CreateButton";

const MisDecks = async () => {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/auth/login");
  }

  const deckCards = await getDecksByUserIdAction(+session?.user.id);
  return (
    <div>
      <CreateButton showCondition={"userAuth"} route={"/create-deck"}/>
      <DeckGrid decks={deckCards} />
    </div>
  );
};

export default MisDecks;
