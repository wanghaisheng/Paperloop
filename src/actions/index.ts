import { defineAction } from "astro:actions";
import { db, eq, Document } from "astro:db";
import { z } from "astro:schema";

export const server = {
    createDocument: defineAction({
        accept: "json",
        handler: async () => {
            const [document] = await db.insert(Document).values({
                id: crypto.randomUUID(),
                document: crypto.randomUUID()
            }).returning();

            return { id: document.id };
          },
    }),
    setName: defineAction({
        accept: "json",
        input: z.object({
            id: z.string(),
            name: z.string()
        }),
        handler: async (data) => {
            await db.update(Document)
                .set({ name: data.name })
                .where(eq(Document.id, data.id));
        }
    })
}
