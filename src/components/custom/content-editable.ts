class ContentEditable extends HTMLElement {
    static observedAttributes = ["placeholder"];

    private renderRoot: ShadowRoot;
    private placeholder = String();

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
                color: var(--placeholder-color);
            }
        `;
    }

    render() {
        this.renderRoot.innerHTML = `
            <style>${this.styles}</style>
            <div placeholder=${this.placeholder} contenteditable="true"></div>
        `;
    }

    constructor() {
        super();
        this.renderRoot = this.attachShadow({ mode: "open" });
    }

    attributeChangedCallback(name: string, _: string, value: string) {
        Reflect.set(this, name, value);
        this.render();
    }
}

customElements.define("content-editable", ContentEditable);
