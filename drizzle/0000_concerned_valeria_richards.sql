CREATE TABLE IF NOT EXISTS "AdminPassword" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"hash" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "BlogLikes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"fingerprint" text NOT NULL,
	"blogPost" text NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "GalleryImage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"path" text NOT NULL,
	"w" integer NOT NULL,
	"h" integer NOT NULL,
	"thmb_w" integer NOT NULL,
	"thmb_h" integer NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"categoryId" uuid,
	"url" text,
	"urlExpires" timestamp (3) DEFAULT now() NOT NULL,
	"urlLg" text,
	"urlLgExpires" timestamp (3) DEFAULT now() NOT NULL,
	"displayIndex" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ImageCategory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SessionToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp (3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "AdminPassword_name_key" ON "AdminPassword" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ImageCategory_name_key" ON "ImageCategory" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "SessionToken_token_key" ON "SessionToken" ("token");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "GalleryImage" ADD CONSTRAINT "GalleryImage_categoryId_ImageCategory_id_fk" FOREIGN KEY ("categoryId") REFERENCES "ImageCategory"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
