import markdownit from "markdown-it";

const md = markdownit({
    html: true,
    breaks: true
});

export const markdownToHTML = (value: string, values: Record<string, string>) => {
    // TODO: Evaluate whether to create markdown-it plugin
    const replaced = value.replace(/(\[(\S+)\])(?!\()/g, (_, key) => {
        const value = values[key] ?? String();
        return `<content-editable value="${value}" placeholder="${key}"></content-editable>`;
    });

    // TODO: Evaluate whether to create markdown-it plugin
    const html = md.render(replaced);
    const parsed = new DOMParser().parseFromString(html, "text/html");
    for (const element of parsed.querySelectorAll("h1, h2, h3, p")) {
        const [match, tailwind] = element.textContent?.match(/^([a-z0-9-]+):/) ?? [];
        if (!match) continue;

        element.innerHTML = element.innerHTML.replace(/^([a-z0-9-]+):<br>?/, String());
        element.classList.add(tailwind);
    }

    return new XMLSerializer().serializeToString(parsed);
};

export const updateRender: {
    setValue?: (value: string) => void,
    setValues?: (values: Record<string, string>) => void
} = {};
