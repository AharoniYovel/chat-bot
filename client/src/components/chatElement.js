import { LitElement, html } from 'lit';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export class ChatElem extends LitElement {

    static get properties() {
        return {
            input: { type: String },
            allMsg: { type: Array }
        };
    }

    constructor() {
        super();

        this.input = "";

        this.allMsg = [{ message: "Hey there 😃 , what is your name?" }];

        this.socket = io('http://localhost:3000', { extraHeaders: { "Access-Control-Allow-Origin": "*" } });

        this.socket.on("respAnswer", (_data) => {
            if (_data.status === 200) {
                this.allMsg = [...this.allMsg, _data.botResp];
            }
            else {
                this.allMsg = [...this.allMsg, _data._errAnswer];
            }

            // ! how to scroll the div down? how to use jquery?
            // document.querySelector(".messages-content").scrollIntoView(true);
        })
    }

    render() {

        return html`
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


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

            ${this.allMsg.map((_msg ,i) => 
                i%2===0?

                html`
                      <div class="left-div">

                         <figure class="avatar">
                          <img
                           src="https://images.pexels.com/photos/8566462/pexels-photo-8566462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                        </figure>

                        <div>
                          <main>${_msg.message}</main>
                        </div>
                      </div>
                   `
            :
                   html`
                         <div class="right-div">
                             <i class="fa fa-user" aria-hidden="true"></i>
                               <div>
                                 <main>${_msg.message}</main>
                                </div>
                       </div>
                   `
            )}
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
            this.allMsg = [...this.allMsg, { message: this.input }];
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