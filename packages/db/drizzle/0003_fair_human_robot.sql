ALTER TABLE "api_usage" DROP CONSTRAINT "api_usage_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "api_usage" ADD COLUMN "memory_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "api_usage" ADD COLUMN "search_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "api_usage" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "api_usage" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
CREATE UNIQUE INDEX "ux_api_usage_unique" ON "api_usage" USING btree ("user_id","api_key_id","date","route_group");