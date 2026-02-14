DROP INDEX "ux_api_usage_unique";--> statement-breakpoint
ALTER TABLE "api_usage" ADD CONSTRAINT "api_usage_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "ux_api_usage_unique" ON "api_usage" USING btree ("organization_id","user_id","api_key_id","date","route_group");