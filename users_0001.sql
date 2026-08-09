BEGIN;
--
-- Create model User
--
CREATE TABLE "users_user" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "first_name" varchar(100) NOT NULL, "last_name" varchar(100) NOT NULL, "email" varchar(254) NOT NULL UNIQUE, "login_code" varchar(6) NOT NULL);
COMMIT;
