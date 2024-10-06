import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("content-editable")
export class ContentEditable extends LitElement {
    @property({ type: String })
    placeholder = String();

    static styles = css`
        :host {
            display: inline-block;
        }

        [contenteditable] {
            outline: none;
            cursor: text;
        }

        [contenteditable]:empty:before {
            content: attr(placeholder);
            color: silver;
        }
    `;

    render() {
        return html`
            <div placeholder=${this.placeholder} contenteditable="true"></div>
        `;
    }
}
