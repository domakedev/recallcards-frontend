import React from "react";
import DeckPreview from "./components/DeckPreview";
import NavBar from "./components/NavBar";

const page = () => {
  return (
    <div>
      <NavBar title="Decks" goBack={false}/>
      <div className="flex gap-7 flex-wrap justify-center">
        <DeckPreview
          src="https://media.es.wired.com/photos/6501e7429fa9000811a95fe8/16:9/w_2560%2Cc_limit/Adobe%2520Firefly.jpeg"
          deckName="Deck 1"
          deckSize={14}
        />
        <DeckPreview
          src="https://media.es.wired.com/photos/6501e7429fa9000811a95fe8/16:9/w_2560%2Cc_limit/Adobe%2520Firefly.jpeg"
          deckName="Deck 1"
          deckSize={14}
        />
        <DeckPreview
          src="https://media.es.wired.com/photos/6501e7429fa9000811a95fe8/16:9/w_2560%2Cc_limit/Adobe%2520Firefly.jpeg"
          deckName="Deck 1"
          deckSize={14}
        />
        <DeckPreview
          src="https://media.es.wired.com/photos/6501e7429fa9000811a95fe8/16:9/w_2560%2Cc_limit/Adobe%2520Firefly.jpeg"
          deckName="Deck 1"
          deckSize={14}
        />
      </div>
    </div>
  );
};

export default page;
