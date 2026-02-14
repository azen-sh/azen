import { auth } from "@/app/lib/auth";
import { db, schema, eq } from "db";

const { apikey } = schema;

export async function GET(req: Request) {
    const session = await auth.api.getSession({ headers: req.headers });
  
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
  
    const organizationId = session.session.activeOrganizationId;
    if (!organizationId) {
      return new Response("No active organization", { status: 400 });
    }
  
    const keys = await db
      .select({
        id: apikey.id,
        name: apikey.name,
        start: apikey.start,
        createdAt: apikey.createdAt,
        expiresAt: apikey.expiresAt,
      })
      .from(apikey)
      .where(eq(apikey.organizationId, organizationId))
      .orderBy(apikey.createdAt);
  
    return Response.json(keys);
  }

export async function POST(req: Request) {
    const session = await auth.api.getSession({
        headers: req.headers,
    });

    if(!session?.user) {
        return new Response("Unauthorized", { status: 401 });
    };

    const userId = session.user.id;
    const organizationId = session.session.activeOrganizationId;

    if(!organizationId) {
        return new Response("No active organization", { status: 400 });
    };

    const res = await auth.api.createApiKey({
        body: {
            name: `console-${new Date().toISOString().slice(0, 10)}`,
            userId: userId,
            prefix: "az_",
            expiresIn: 60 * 60 * 24 * 365,
            metadata: {
              organizationId,
            },
        },
    });

    await db
        .update(apikey)
        .set({ organizationId })
        .where(eq(apikey.id, res.id));
    
    return Response.json({
        id: res.id,
        key: res.key,
    });
};