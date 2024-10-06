import { db, Document } from "astro:db";

export default async function() {
  await db.insert(Document).values([
    { id: "1", name: "Test-1", markdown: "", document: "1" },
    { id: "2", name: "Test-2", markdown: "# Überschrift\n## Unterschrift\n### Überschrift\nEin **Text**.\nHallo [Vorname] [Nachna]", version: 1, document: "2" },
    { id: "3", name: "Test-2", markdown: "# Überschrift\n## Unterschrift\n### Überschrift\nEin **Text**.\nHallo [Vorname] [Nachnam]", version: 2, document: "2" },
    { id: "4", name: "Test-2", markdown: "# Überschrift\n## Unterschrift\n### Überschrift\nEin **Text**.\nHallo [Vorname] [Nachname]", document: "2" },
  ]);
}
