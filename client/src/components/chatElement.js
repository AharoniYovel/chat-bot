import { LitElement, html } from 'lit';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";



export class ChatElem extends LitElement {


    static get properties() {
        return {
            name: { type: String },
            msg: { type: String },

        };
    }

    constructor() {
        super();
        this.name = 'You';
        this.bot = 'Bot';
        this.msg = '';


        this.username = document.querySelector("username");
        this.output = document.querySelector("output");
        this.message = document.querySelector("message-input");
        this.btn = document.querySelector(".message-submit");


        this.socket = io('http://localhost:3000', { extraHeaders: { "Access-Control-Allow-Origin": "*" } });


        this.socket.on('new connection', console.log);

        this.socket.on("chat", (_data) => {
            this.msg = _data;
        })
    }



    _textAreaVal = (e) => {
        this.socket.emit("chat", e.target.value);
        let newMsg = document.querySelector(".messages-content");
    }

    _clearTxtArea = () => {
        $('#message-input').val("");
    }


    render() {
        const { _textAreaVal, msg, _clearTxtArea } = this;

        return html`

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.min.css">
    <link rel="stylesheet" href="./src/components/chat/chat.css">
    
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script> -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    
    
    <script
        src="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.3/jquery.mCustomScrollbar.concat.min.js">
    </script>
    
    
    <div class="chat">
        <div class="chat-title">
            <h1>Forter Bot</h1>
            <figure class="avatar">
                <img
                    src="https://images.pexels.com/photos/8566462/pexels-photo-8566462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </figure>
        </div>
        <div class="messages">
            <div class="messages-content">You: ${msg}</div>
        </div>
        <div class="message-box">
            <textarea @change="${_textAreaVal}" type="text" class="message-input" placeholder="Type message..."></textarea>
            <button style="cursor:pointer" @click="${_clearTxtArea}" type="submit" class="message-submit">Send</button>
        </div>
    
    </div>
    <div class="bg"></div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>

        `;
    }








}

window.customElements.define('chat-element', ChatElem);