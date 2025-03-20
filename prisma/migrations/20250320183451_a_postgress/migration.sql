-- CreateTable
CREATE TABLE "Juego" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Juego_pkey" PRIMARY KEY ("id")
);
