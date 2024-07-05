-- CreateTable
CREATE TABLE "decks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "image" VARCHAR NOT NULL,

    CONSTRAINT "decks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "decks_name_key" ON "decks"("name");
