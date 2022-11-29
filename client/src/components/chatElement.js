import { LitElement, html } from 'lit';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
export class ChatElem extends LitElement {

    static get properties() {
        return {
            input: { type: String },
            allMsg: { type: Array },
            talking: { type: String },
        };
    }

    constructor() {
        super();

        this.input = "";

        this.writeFirstAns = false;
        this.writeSecondtAns = false;

        this.allMsg = [{ message: "Hey there 😃 , ask me questions!" }];

        this.socket = io('http://localhost:3000', { extraHeaders: { "Access-Control-Allow-Origin": "*" } });

        this.socket.on("respAnswers", (_data) => {
            console.log(_data);
            if (_data.status === 200) {
                this.allMsg = [...this.allMsg, { message: `The answers for you question is: \n  1:${_data.message[0]}\n & 2:${_data.message[1]}` }]
            } 
            else {
                this.allMsg = [...this.allMsg, { message: "I am drunk and can't answer your question" }];
            }
        })
        
        this.socket.on("doesntKnow", (_data) => {
            if (_data.message) {
                this.allMsg = [...this.allMsg, { message: _data.message }];
                this.writeFirstAns=true;
            }
             else {
                this.allMsg = [...this.allMsg, { message: "I am drunk and can't answer your question" }];
            }
        })

        this.socket.on("okFirstAns",(_ok)=>{
            this.allMsg=[...this.allMsg, { message:_ok } ];
        })

        this.socket.on("okSecondAns",(_ok)=>{
            this.allMsg=[...this.allMsg, { message:_ok } ];
        })
    }

    render() {
            return html `
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
            
                i % 2 === 0 ?

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



    <div class="message-box">
        <input .value="${this.input}" @change="${this.updateClientInput}" class="message-input"
            placeholder="Type message..." @keyup=${this.pressEnter}/>
        <button style="cursor:pointer" @click="${this.addInput}" class="message-submit">Send</button>
    </div>
    
</div>
<div class="bg"></div>

        `;
    }

    pressEnter(e) {
        if (e.key === "Enter") {
            this.addInput();
        }
    }

    updateClientInput(e) {
        this.input = e.target.value;
    }
    
    addInput() {
        if (this.input) {
            this.allMsg = [...this.allMsg, { message: this.input }];
            this.socket.emit(this.writeFirstAns? "reciveFirstAns" :this.writeSecondtAns? "reciveSecondAns" : "chat", {question: this.input});

           if (this.writeSecondtAns) {
             this.writeSecondtAns=false;
           }

            if (this.writeFirstAns) {
                this.writeFirstAns=false;
                this.writeSecondtAns=true;
            }
            

            this.input = "";
        }
    }
 
}

window.customElements.define('chat-element', ChatElem);
