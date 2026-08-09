BEGIN;
--
-- Add field created_at to user
--
CREATE TABLE "new__users_user" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "created_at" datetime NULL, "first_name" varchar(100) NOT NULL, "last_name" varchar(100) NOT NULL, "email" varchar(254) NOT NULL UNIQUE, "login_code" varchar(6) NOT NULL);
INSERT INTO "new__users_user" ("id", "first_name", "last_name", "email", "login_code", "created_at") SELECT "id", "first_name", "last_name", "email", "login_code", '2026-08-09 07:16:09.533110' FROM "users_user";
DROP TABLE "users_user";
ALTER TABLE "new__users_user" RENAME TO "users_user";
COMMIT;
