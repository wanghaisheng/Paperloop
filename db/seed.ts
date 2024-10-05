import { db, Document } from "astro:db";

export default async function() {
  await db.insert(Document).values([
    { id: "1", name: "Test-1", markdown: "" },
    { id: "2", name: "Test-2", markdown: "# Überschrift\n## Unterschrift\n### Überschrift\nEin **Text**." },
  ]);
}
