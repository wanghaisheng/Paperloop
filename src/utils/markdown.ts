import markdownit from "markdown-it";
import anchor from "markdown-it-anchor";
import frontmatter from "markdown-it-front-matter";
import { parse } from "yaml";

const md = markdownit({
    html: true,
    breaks: true
})
    .use(anchor)
    .use(frontmatter, (data: string) => parsedFrontmatter = parse(data));

export let parsedFrontmatter = {};
export const markdownToHTML = (value: string, values: Record<string, string>) => {
    // TODO: Evaluate whether to create markdown-it plugin
    const replaced = value.replace(/\[(\S+)\](?!\()/g, (_, key) => {
        const value = values[key] ?? String();
        return `<content-editable value="${value}" placeholder="${key}"></content-editable>`;
    });

    // TODO: Evaluate whether to create markdown-it plugin
    const html = md.render(replaced);
    const parsed = new DOMParser().parseFromString(html, "text/html");
    for (const element of parsed.getElementsByTagName("p")) {
        const [matches] = element.textContent?.match(/^(([a-z0-9-]+):)+/) ?? [];
        for (const match of matches?.split(":").filter(Boolean) ?? []) {
            element.innerHTML = element.innerHTML.replace(/^([a-z0-9-]+):(<br>)?/, String());
            element.classList.add(match.replace("img-", "prose-img:"));
        }
    }

    return {
        frontmatter: parsedFrontmatter,
        html: new XMLSerializer().serializeToString(parsed)
    };
};

export const updateRender: {
    setValue?: (value: string) => void,
    setValues?: (values: Record<string, string>) => void
} = {};
