import { auth } from "@/auth";
import { getCardsByUserIdAction } from "@/services/card.actions";
import { redirect } from "next/navigation";

const RandomCardPage = async () => {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/auth/login");
  }

  const cards = await getCardsByUserIdAction(+session.user.id);

  if (cards.length === 0) {
    redirect("/mis-decks");
  }

  const randomCard = cards[Math.floor(Math.random() * cards.length)];

  redirect(`/${randomCard.decks.name.toLowerCase().replace(/\s+/g, '-')}-${randomCard.deckId}/${randomCard.id}`);
};

export default RandomCardPage;