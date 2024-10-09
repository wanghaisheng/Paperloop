import { defineDb, defineTable, column } from "astro:db";

const Document = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        name: column.text({ default: String() }),
        markdown: column.text({ default: String() }),
        version: column.number({ optional: true }),
        document: column.text(),
        updated: column.date(),
        user: column.text()
    }
});

// https://astro.build/db/config
export default defineDb({
    tables: { Document }
});
