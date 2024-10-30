ALTER TABLE "dishes" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "dishes" ADD COLUMN "disabledAt" timestamp;--> statement-breakpoint
ALTER TABLE "dishes" ADD COLUMN "deletedAt" timestamp;