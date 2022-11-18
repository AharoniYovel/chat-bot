import { LitElement, html } from 'lit';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";



export class ChatElem extends LitElement {


    static get properties() {
        return {
            name: { type: String },
            msg: { type: String },
            div: { type: Object },
            numOfmsg: { type: Number }

        };
    }

    constructor() {
        super();
        this.name = 'You';
        this.bot = 'Bot';
        this.numOfmsg = 0;
        this.div;



        this.socket = io('http://localhost:3000', { extraHeaders: { "Access-Control-Allow-Origin": "*" } });


        this.socket.on("respAnswer", (_data) => {
            console.log(_data.botResp || _data._errAnswer);
            this.numOfmsg++;
            // let div = document.querySelector(".messages-content");
            // div.textContent += 'dd';

        })
    }



    _textAreaVal = (e) => {
        this.socket.emit("chat", e.target.value);
    }


    render() {
        const { _textAreaVal, msg, div } = this;

        return html`




<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans">
<link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.min.css">
<link rel="stylesheet" href="./src/components/chat/chat.css">


<!-- ${this.numOfmsg % 2 === 0 ? html`bot:<div>200</div>` : html`you:<div>404</div>`} -->



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
        </div>
    </div>
    <div class="message-box">
        <textarea @change="${_textAreaVal}" type="text" class="message-input" placeholder="Type message..."></textarea>
        <button style="cursor:pointer" type="submit" class="message-submit">Send</button>
    </div>

</div>
<div class="bg"></div>



<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script> -->


        `;
    }




}

window.customElements.define('chat-element', ChatElem);