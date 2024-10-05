import { db, Document } from "astro:db";

export default async function() {
  await db.insert(Document).values([
    { id: "1", name: "Test-1", markdown: "Value-1" },
    { id: "2", name: "Test-2", markdown: "Value-2" },
  ]);
}
