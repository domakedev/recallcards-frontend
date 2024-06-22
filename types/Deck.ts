import { StaticImageData } from "next/image"

export type DeckType = {
    deckName: string,
    deckSlug: string,
    deckImage: StaticImageData,
    deckSize: number
}

export type Deck = {
    id?: number,
    name: string,
    image?: string,
    creatorId: number,
    deckSize?: number,
}

export type DeckDB = {
    id: number,
    name: string,
    image?: string,
    creatorId: number,
    deckSize?: number,
}