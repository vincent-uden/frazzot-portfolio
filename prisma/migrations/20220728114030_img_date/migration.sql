-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GalleryImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "w" INTEGER NOT NULL,
    "h" INTEGER NOT NULL,
    "thmb_w" INTEGER NOT NULL,
    "thmb_h" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_GalleryImage" ("h", "id", "name", "path", "thmb_h", "thmb_w", "w") SELECT "h", "id", "name", "path", "thmb_h", "thmb_w", "w" FROM "GalleryImage";
DROP TABLE "GalleryImage";
ALTER TABLE "new_GalleryImage" RENAME TO "GalleryImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
