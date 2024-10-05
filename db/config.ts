import { defineDb, defineTable, column } from "astro:db";

const Document = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        name: column.text(),
        markdown: column.text()
    }
});

// https://astro.build/db/config
export default defineDb({
    tables: { Document }
});
