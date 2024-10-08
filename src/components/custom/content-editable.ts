export class ContentEditable extends HTMLElement {
    static observedAttributes = ["value", "placeholder"];

    value = String();
    placeholder = String();

    get styles() {
        return `
            :host {
                display: inline-block;
            }

            [contenteditable] {
                outline: none;
                cursor: text;
            }

            [contenteditable]:empty:before {
                content: attr(placeholder);
                color: hsl(var(--placeholder));
            }
        `;
    }

    render() {
        this.shadowRoot!.innerHTML = `
            <style>${this.styles}</style>
            <div placeholder=${this.placeholder} contenteditable="true">${this.value}</div>
        `;
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        this.addEventListener("input", () => {
            this.value = shadowRoot.querySelector("div")?.textContent ?? String();
        });
    }

    attributeChangedCallback(name: string, _: string, value: string) {
        Reflect.set(this, name, value);
        this.render();
    }
}

customElements.define("content-editable", ContentEditable);
