ALTER TABLE "Memory" RENAME COLUMN "content" TO "encrypted_content";--> statement-breakpoint
ALTER TABLE "Memory" ADD COLUMN "iv" text;--> statement-breakpoint
ALTER TABLE "Memory" ADD COLUMN "tag" text;