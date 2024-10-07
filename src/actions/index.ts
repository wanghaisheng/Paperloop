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
                .set({ name, markdown })
                .where(eq(Document.id, id));
        }
    }),
    publishDocument: defineAction({
        accept: "json",
        input: z.string(),
        handler: async (id) => {
            const [current] = await db.select().from(Document).where(eq(Document.id, id));
            const versions = await db.select().from(Document).where(eq(Document.document, current.document));

            // TODO: Evaluate whether to get max version number with query
            const version = Math.max(...versions.map(entry => entry.version ?? 0), 0) + 1;
            await db.update(Document).set({ version }).where(eq(Document.id, id));
        }
    }),
    deleteDocument: defineAction({
        accept: "json",
        input: z.string(),
        handler: async (id) => {
            const [deleted] = await db.delete(Document).where(eq(Document.id, id)).returning();
            const remaining = await db.select().from(Document).where(eq(Document.document, deleted.document));
            return remaining.length ? `/docs/versions/${deleted.document}` : "/docs";
        }
    }),
    deleteDocuments: defineAction({
        accept: "json",
        input: z.string(),
        handler: async (document) => {
            await db.delete(Document).where(eq(Document.document, document));
            return "/docs";
        }
    })
}
