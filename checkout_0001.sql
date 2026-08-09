BEGIN;
--
-- Create model Checkout
--
CREATE TABLE "checkout_checkout" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "email" varchar(254) NOT NULL, "phone" varchar(15) NOT NULL, "shipping_address" text NOT NULL, "created_at" datetime NOT NULL);
COMMIT;
