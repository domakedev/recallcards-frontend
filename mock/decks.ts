import ReactInterviewPreviewImage from "@/public/decks/react-entrevista/deck-preview.png"
import InglesVocabularioPreviewImage from "@/public/decks/ingles-vocabulario/deck-preview.png"
import { DeckType } from "@/types/Deck"


const ReactInterviewDeck: DeckType =
{
    deckName: "React Entrevista",
    deckSlug: "react-entrevista",
    deckImage: ReactInterviewPreviewImage,
    deckSize: 100,
}
const EnglishDeck: DeckType =
{
    deckName: "Ingles vocabulario",
    deckSlug: "ingles-vocabulario",
    deckImage: InglesVocabularioPreviewImage,
    deckSize: 32,
}

export const Decks: DeckType[] = [
    ReactInterviewDeck,
    EnglishDeck
] 




