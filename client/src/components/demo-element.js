import { LitElement, html } from 'lit';
import style from './demo-element.css.js';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

import { repeat } from "lit/directives/repeat.js";

const data = [{
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


      data: { type: Array }

    };
  }

  constructor() {
    super();

    this.data = data;

    this.name = 'david';
    this.content = "";
    this.count = 0;
    this.socket = io('http://localhost:3000', { extraHeaders: { "Access-Control-Allow-Origin": "*" } });
    this.socket.on('new connection', console.log);
    this.socket.on("chat", this.handleMessage)

    this.messages = [{
      name: "ness",
      content: "hello"
    }]
  }


  addItem() {
    console.log(data);
    const nextId = this.data[this.data.length - 1].id + 1;
    this.data = [
      ...this.data,
      {
        id: nextId,
        value: this.content,
      },
    ];
  }





  static styles = [style];

  onButtonClick() {
    this.count++;
  }

  handleMessage(msg) {
    console.log("Hello from client" + msg)
  }

  onChangeContent(e) {
    this.content = e.target.value
  }

  onChangeName(e) {
    this.name = e.target.value
  }

  sendMsg() {
    // this.socket.emit("chat", "This is message from ness")
    this.messages.push({
      name: this.name,
      content: this.content
    })
    this.renderMessages()
  }

  renderMessages() {
    let str = ""
    this.messages.forEach(msg => {
      str += `<p>${msg.name}:${msg.content}</p>`
    })
    return str;
  }

  render() {
    const { name, count } = this;
    return html`
      <div>Hi, this is a demo element!</div>
      <div>Like this, you can render reactive properties: ${name}</div>
      <div>And like this, you can listen to events:</div>
      <!-- <button @click="${this.onButtonClick}">Number of clicks: ${count}</button> -->
      <input id="name" @change="${this.onChangeName}">
      <input id="content" @change="${this.onChangeContent}">
      <button type="submit" @click="${this.addItem}">Click me to send message</button>
      <div>${repeat(this.messages, (msg) => html`<p>${msg.name}:${msg.content}</p>`)}</div>
    `;
  }
}

window.customElements.define('demo-element', DemoElement);