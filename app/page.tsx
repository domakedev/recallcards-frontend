export const dynamic = "force-dynamic";
export const revalidate = 0;

import NavBar from "./components/NavBar";
import CreateButton from "./components/CreateButton";
import { getDecksAction } from "@/services/deck.actions";
import DeckGrid from "./components/DeckGrid";

const page = async () => {
  const decks = await getDecksAction();
  console.log("🚀 ~ page ~ decks:", "✅Construido");

  return (
    <div>
      <NavBar
        title="Decks"
        goBack={false}
      />
      <div className="mx-auto">
        <CreateButton
          showCondition={"userAuth"}
          route={"/create-deck"}
        />
      </div>
      <DeckGrid decks={decks} />
    </div>
  );
};

export default page;
