/*
  Warnings:

  - Added the required column `h` to the `GalleryImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thmb_h` to the `GalleryImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thmb_w` to the `GalleryImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `w` to the `GalleryImage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GalleryImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "w" INTEGER NOT NULL,
    "h" INTEGER NOT NULL,
    "thmb_w" INTEGER NOT NULL,
    "thmb_h" INTEGER NOT NULL
);
INSERT INTO "new_GalleryImage" ("id", "name", "path") SELECT "id", "name", "path" FROM "GalleryImage";
DROP TABLE "GalleryImage";
ALTER TABLE "new_GalleryImage" RENAME TO "GalleryImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
