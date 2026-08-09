BEGIN;
--
-- Remove field email from checkout
--
ALTER TABLE "checkout_checkout" DROP COLUMN "email";
--
-- Add field user to checkout
--
ALTER TABLE "checkout_checkout" ADD COLUMN "user_id" bigint NULL REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX "checkout_checkout_user_id_8b2fe298" ON "checkout_checkout" ("user_id");
COMMIT;
