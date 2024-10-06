import { defineAction } from "astro:actions";
import { db, Document } from "astro:db";
import { z } from "astro:schema";

export const server = {
    createDocument: defineAction({
        accept: "json",
        // input: z.object({}),
        handler: async () => {
            const [document] = await db.insert(Document).values({
                id: crypto.randomUUID(),
                document: crypto.randomUUID()
            }).returning();

            return { id: document.id };
          },
    })
}
