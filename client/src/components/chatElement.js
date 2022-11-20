import { LitElement, html } from 'lit';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export class ChatElem extends LitElement {

    static get properties() {
        return {
            clientMessages: { type: Array },
            input: { type: String },
            botMessages: { type: Array },
        };
    }

    constructor() {
        super();

        this.clientMessages = [];
        this.input = "";
        this.botMessages = [{ message: "Hey there 😃 , what is your name?" }];

        this.socket = io('http://localhost:3000', { extraHeaders: { "Access-Control-Allow-Origin": "*" } });

        this.socket.on("respAnswer", (_data) => {
            if (_data.status === 200) {
                this.botMessages = [...this.botMessages, _data.botResp];
            }
            else {
                this.botMessages = [...this.botMessages, _data._errAnswer];
            }

            // ! how to scroll the div down? how to use jquery?
            // document.querySelector(".messages-content").scrollIntoView(true);
        })
    }

    render() {
        return html`

<link rel="stylesheet" href="./src/components/chat/chat.css">

<div class="chat">
    <div class="chat-title">
        <h1>Forter Bot</h1>
        <figure class="avatar">
            <img
                src="https://images.pexels.com/photos/8566462/pexels-photo-8566462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        </figure>
    </div>
    <div class="messages">

        <div class="messages-content">

            <div class="left-div">
                ${this.botMessages.map(_msg => html`
                <div>
                    <p>Bot:</p>
                    <main>${_msg.message}</main>
                </div>
                `)}
            </div>

            <div class="right-div">
                ${this.clientMessages.map(_msg => html`
                <div>
                    <p>You:</p>
                    <main>${_msg.message}</main>
                </div>
                `)}
            </div>

        </div>

    </div>

    <div class="message-box" @keyup=${this.pressEnter}>
        <input .value="${this.input}" @change="${this.updateClientInput}" class="message-input"
            placeholder="Type message..." />
        <button style="cursor:pointer" @click="${this.addInput}" class="message-submit">Send</button>
    </div>

</div>
<div class="bg"></div>
        `;
    }

    pressEnter(e) {
        if (e.key === 13) {
            this.addInput();
        }
    }

    updateClientInput(e) {
        this.input = e.target.value;
        this.socket.emit("chat", e.target.value);
    }

    addInput() {
        if (this.input) {
            this.clientMessages = [...this.clientMessages, { message: this.input }];
            this.input = "";
        }
    }

    scroll() {
        let leftScroll = document.querySelector('.left-div')
        let rightScroll = document.querySelector('.right-div')
        leftScroll.scrollTop = scrollMsg.scrollHeight;
        rightScroll.scrollTop = scrollMsg.scrollHeight;
    }

}

window.customElements.define('chat-element', ChatElem);