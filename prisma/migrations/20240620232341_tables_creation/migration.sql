-- DropIndex
DROP INDEX "decks_name_key";

-- AlterTable
ALTER TABLE "decks" ADD COLUMN     "creatorId" INTEGER,
ALTER COLUMN "image" DROP NOT NULL;

-- CreateTable
CREATE TABLE "card_difficulty_per_user" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "cardId" INTEGER,
    "difficultyId" INTEGER,
    "last_evaluate" DATE,

    CONSTRAINT "card_difficulty_per_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR,
    "answer" VARCHAR,
    "creatorId" INTEGER,
    "deck" INTEGER,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "difficulty_level" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR NOT NULL,

    CONSTRAINT "difficulty_level_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "decks" ADD CONSTRAINT "decks_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "card_difficulty_per_user" ADD CONSTRAINT "card_difficulty_per_user_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "card_difficulty_per_user" ADD CONSTRAINT "card_difficulty_per_user_difficultyId_fkey" FOREIGN KEY ("difficultyId") REFERENCES "difficulty_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "card_difficulty_per_user" ADD CONSTRAINT "card_difficulty_per_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_deck_fkey" FOREIGN KEY ("deck") REFERENCES "decks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
