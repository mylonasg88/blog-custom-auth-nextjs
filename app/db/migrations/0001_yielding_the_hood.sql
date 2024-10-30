CREATE TABLE IF NOT EXISTS "dishes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price" text NOT NULL,
	"image" text NOT NULL,
	"isDisabled" boolean NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
