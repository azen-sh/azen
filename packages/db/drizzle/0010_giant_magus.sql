DROP INDEX "ux_api_usage_unique";--> statement-breakpoint
ALTER TABLE "apikey" ADD COLUMN "organization_id" text;--> statement-breakpoint
ALTER TABLE "api_usage" ADD COLUMN "organization_id" text;--> statement-breakpoint
ALTER TABLE "EmbeddingJob" ADD COLUMN "organization_id" text;--> statement-breakpoint
ALTER TABLE "Memory" ADD COLUMN "organization_id" text;--> statement-breakpoint
ALTER TABLE "apikey" ADD CONSTRAINT "apikey_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_usage" ADD CONSTRAINT "api_usage_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "EmbeddingJob" ADD CONSTRAINT "EmbeddingJob_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Memory" ADD CONSTRAINT "Memory_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "apikey_organizationId_idx" ON "apikey" USING btree ("organization_id");--> statement-breakpoint
CREATE UNIQUE INDEX "ux_api_usage_unique" ON "api_usage" USING btree ("organization_id","api_key_id","date","route_group");