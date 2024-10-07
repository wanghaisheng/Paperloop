import { db, Document } from "astro:db";

export default async function() {
  await db.insert(Document).values([
    { id: "1", name: "Test-1", markdown: "", document: "1" },
    { id: "2", name: "Test-2", markdown: "# Überschrift\n## Unterschrift\n### Überschrift\nEin **Text**.\nHallo [Vorname] [Nachna]", version: 1, document: "2" },
    { id: "3", name: "Test-2", markdown: "# Überschrift\n## Unterschrift\n### Überschrift\nEin **Text**.\nHallo [Vorname] [Nachnam]", version: 2, document: "2" },
    { id: "4", name: "Test-2", markdown: "# Überschrift\n## Unterschrift\n### Überschrift\nEin **Text**.\nHallo [Vorname] [Nachname]", document: "2" },
    { id: "5", name: "Deckblatt: Vertrag", markdown: "text-right:**OpenEDC Health UG**\nLeonard Greulich\nMeppener Str. 11a\n48155 Münster\n\n**[Unternehmen]**\n[Vorname] [Nachname]\n[Straße] [Nummer]\n[PLZ] [Stadt]\n\ntext-right:**[Datum]**\n\n### Softwaremietvertrag\n\nSehr geehrt[er] [Anrede] [Vorname] [Nachname],\n\nvielen Dank für Ihr Vertrauen ...\n\n| Produkt | Menge | Preis |\n|---|---|---|\n| Softwarelizenz mit Hosting in der Telekom Cloud | [Menge] | [Preis] |\n| Support und Einrichtung | [Menge] | [Preis] |", document: "3" }
  ]);
}
