/*
  Warnings:

  - Added the required column `user_id` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_feedbacks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "screenshot" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_feedbacks" ("comment", "createdAt", "id", "screenshot", "type") SELECT "comment", "createdAt", "id", "screenshot", "type" FROM "feedbacks";
DROP TABLE "feedbacks";
ALTER TABLE "new_feedbacks" RENAME TO "feedbacks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
