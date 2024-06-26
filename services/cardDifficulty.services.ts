const cardsURL = "/api/cardDifficulty"

export const getCardDifficulty = async (params: { userId: number; cardId: number }) => {
    try {
        const result = await fetch(`${cardsURL}`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
        });
        const data = await result.json();
        console.log("🚀 ~ getCardDifficulty ~ data:", data)
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const createCardDifficulty = async (params: { userId: number; cardId: number; difficultyId: number }) => {
    try {
        const result = await fetch(`${cardsURL}/create`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
        });
        const data = await result.json();
        console.log("🚀 ~ createCardDifficulty ~ data:", data)
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const updateCardDifficulty = async (params: { id: number; difficultyId: number }) => {
    try {
        const result = await fetch(`${cardsURL}`, {
        method: "PATCH",
        body: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
        });
        const data = await result.json();
        console.log("🚀 ~ updateCardDifficulty ~ data:", data)
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}