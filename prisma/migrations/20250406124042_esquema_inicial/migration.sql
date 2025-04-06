-- CreateEnum
CREATE TYPE "ROL" AS ENUM ('USUARIO', 'ADMINISTRADOR');

-- CreateTable
CREATE TABLE "Juego" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companies" TEXT NOT NULL,
    "genres" TEXT NOT NULL,

    CONSTRAINT "Juego_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "correo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "ROL" NOT NULL DEFAULT 'USUARIO',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("correo")
);
