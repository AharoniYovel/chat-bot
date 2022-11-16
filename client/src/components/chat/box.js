import { LitElement, html } from 'lit';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";



export class BoxElem extends LitElement {







    render() {
        return html`
        
        <div>
            <p>bla bla</p>
            <h3>lalal</h3>
        </div>


`;
    }



}

window.customElements.define('box-element', BoxElem);