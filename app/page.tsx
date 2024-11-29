export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getDecksAction } from "@/services/deck.actions";
import DeckGrid from "./components/DeckGrid";
import ActiveRecallHero from "./components/ActiveRecallHero";

const page = async () => {
  const decks = await getDecksAction();

  return (
    <div className="mx-auto max-w-5xl">
      <ActiveRecallHero />

      <h1 className="mt-16 text-center text-2xl font-semibold text-gray-800">
        📚 Decks de la comunidad 👨‍🎓👩‍🎓
      </h1>

      <DeckGrid decks={decks} />
    </div>
  );
};

export default page;
