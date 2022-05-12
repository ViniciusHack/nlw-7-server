/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.

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
    CONSTRAINT "feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_feedbacks" ("comment", "createdAt", "id", "screenshot", "type", "user_id") SELECT "comment", "createdAt", "id", "screenshot", "type", "user_id" FROM "feedbacks";
DROP TABLE "feedbacks";
ALTER TABLE "new_feedbacks" RENAME TO "feedbacks";
CREATE TABLE "new_users" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("created_at", "email", "imageURL", "name", "uid") SELECT "created_at", "email", "imageURL", "name", "uid" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
