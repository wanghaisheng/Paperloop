import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("value-placeholder")
export class ValuePlaceholder extends LitElement {
    @property({ type: String })
    placeholder = String();

    static styles = css`
        input {
            line-height: inherit;
            font-style: inherit;
            font-size: inherit;
            color: inherit;
            border: unset;
            outline: unset;
            padding: unset;
        }
    `;

    render() {
        return html`
            <input placeholder=${this.placeholder} />
        `;
    }
}
