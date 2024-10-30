ALTER TABLE "dishes" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "dishes" ALTER COLUMN "price" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "dishes" ALTER COLUMN "image" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "dishes" ALTER COLUMN "tag" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "dishes" ALTER COLUMN "isDisabled" SET DEFAULT false;