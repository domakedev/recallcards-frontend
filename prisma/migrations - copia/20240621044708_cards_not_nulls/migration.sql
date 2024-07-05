/*
  Warnings:

  - You are about to drop the column `deck` on the `cards` table. All the data in the column will be lost.
  - Added the required column `deckId` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Made the column `answer` on table `cards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `creatorId` on table `cards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `creatorId` on table `decks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_deck_fkey";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "deck",
ADD COLUMN     "deckId" INTEGER NOT NULL,
ALTER COLUMN "answer" SET NOT NULL,
ALTER COLUMN "creatorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "decks" ALTER COLUMN "creatorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_deck_fkey" FOREIGN KEY ("deckId") REFERENCES "decks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
