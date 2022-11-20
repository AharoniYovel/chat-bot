import { LitElement, html } from 'lit';
import style from './demo-element.css.js';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

import { repeat } from "lit/directives/repeat.js";
import { createRef } from 'lit/directives/ref.js';

const dataAr = [{
  id: 1, value: "first",
  id: 2, value: "second",
}];


export class DemoElement extends LitElement {
  //just like porps in reactjs
  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       * @type {string}
       */
      name: { type: String },

      /**
       * The number of times the button has been clicked.
       * @type {number} 
       */
      count: { type: Number },


      messages: { type: Array }

    };
  }

  inputRef = createRef();

  constructor() {
    super();

    this.dataAr = dataAr;

    this.name;
    this.content;


    this.count = 0;
    this.socket = io('http://localhost:3000', { extraHeaders: { "Access-Control-Allow-Origin": "*" } });
    this.socket.on('new connection', console.log);
    this.socket.on("chat", this.handleMessage)

    this.messages = [{ msg: "hi" }]
  }

  static styles = [style];

  onButtonClick() {
    this.count++;
  }

  handleMessage(msg) {
    console.log("Hello from client" + msg)
  }

  onChangeName(e) {
    this.content = e.target.value;
  }


  sendMsg() {

    this.messages.push({ msg: this.content });

    // let str = "";
    // this.messages.map(msg => {
    //   str += html`<p>${msg.name}:${msg.content}</p>`
    // })
    // return str;

    // this.renderMessages();
    console.log(this.messages);
  }

  render() {


    const { count } = this;

    return html`
      <div>Hi, this is a demo element!</div>
      <div>Like this, you can render reactive properties: ${name}</div>
      <div>And like this, you can listen to events:</div>
      <!-- <button @click="${this.onButtonClick}">Number of clicks: ${count}</button> -->
      
      
      <input id="name" @change="${this.onChangeName}">
      <hr>
      <button type="submit" @click="${this.sendMsg}">Click message</button>

      
      
      <!-- <button type="submit" @click="${this.addItem}">Click me to send message</button> -->
      <!-- <div>${repeat(this.messages, (message) => html`<p>${message.msg}</p>`)}</div> -->
      <!-- <p>${this.messages}</p> -->
      

`;
  }

}

window.customElements.define('demo-element', DemoElement);