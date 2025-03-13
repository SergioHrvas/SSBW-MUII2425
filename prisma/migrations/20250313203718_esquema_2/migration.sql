/*
  Warnings:

  - You are about to drop the column `descripción` on the `Juego` table. All the data in the column will be lost.
  - Added the required column `descripcion` to the `Juego` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Juego" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "score" INTEGER NOT NULL
);
INSERT INTO "new_Juego" ("id", "img", "name", "score") SELECT "id", "img", "name", "score" FROM "Juego";
DROP TABLE "Juego";
ALTER TABLE "new_Juego" RENAME TO "Juego";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
