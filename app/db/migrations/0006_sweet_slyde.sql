ALTER TABLE "dishes" DROP COLUMN "id";
ALTER TABLE "dishes" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid();
