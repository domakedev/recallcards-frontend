/*
  Warnings:

  - Made the column `userId` on table `card_difficulty_per_user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cardId` on table `card_difficulty_per_user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `difficultyId` on table `card_difficulty_per_user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "card_difficulty_per_user" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "cardId" SET NOT NULL,
ALTER COLUMN "difficultyId" SET NOT NULL;
