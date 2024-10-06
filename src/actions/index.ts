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
    updateDocument: defineAction({
        accept: "json",
        input: z.object({
            id: z.string(),
            name: z.string().optional(),
            markdown: z.string().optional()
        }),
        handler: async ({ id, name, markdown }) => {
            await db.update(Document)
                .set({
                    ...(name && { name }),
                    ...(markdown && { markdown })
                })
                .where(eq(Document.id, id));
        }
    }),
    deleteDocument: defineAction({
        accept: "json",
        input: z.string(),
        handler: async (id) => {
            await db.delete(Document).where(eq(Document.id, id));
        }
    })
}
