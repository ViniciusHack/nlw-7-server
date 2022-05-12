-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_feedbacks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "screenshot" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_feedbacks" ("comment", "id", "screenshot", "type") SELECT "comment", "id", "screenshot", "type" FROM "feedbacks";
DROP TABLE "feedbacks";
ALTER TABLE "new_feedbacks" RENAME TO "feedbacks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
