import { auth } from "@/auth";
import { getRandomCardByUserIdAction } from "@/services/card.actions";
import { redirect } from "next/navigation";

const RandomCardPage = async () => {
  const session = await auth();

  if (!session?.user.id) {
    redirect("/auth/login");
  }

  const randomCard = await getRandomCardByUserIdAction(+session.user.id);
  console.log("🚀 ~ RandomCardPage ~ randomCard:", randomCard)

  if (!randomCard) {
    redirect("/mis-decks");
  }

  redirect(`/${randomCard.decks.name.toLowerCase().replace(/\s+/g, '-')}-${randomCard.deckId}/${randomCard.id}`);
};

export default RandomCardPage;