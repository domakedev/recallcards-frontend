import { StaticImageData } from "next/image"

export type DeckType = {
    deckName: string,
    deckSlug: string,
    deckImage: StaticImageData,
    deckSize: number
}

export type Deck = {
    name: string,
    image?: string,
    creatorId: number,
    deckSize?: number,
}