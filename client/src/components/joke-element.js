import { LitElement, html } from 'lit';

export class JokeElement extends LitElement {
    //just like porps in reactjs
    static get properties() {
        return {
            fish: { type: Boolean },
            swis: { type: Boolean },
            pasta: { type: Boolean },

            blockFish: { type: Boolean },
            blockSwis: { type: Boolean },
            blockPasta: { type: Boolean },
        };
    }


    constructor() {
        super();
        this.fish = false;
        this.swis = false;
        this.pasta = false;

        this.blockFish=false;
        this.blockSwis=false;
        this.blockPasta=false;
    }






    render() {
        return html`
       
        <div style="display:${this.blockFish?"none":"block"}">
            <h1 style="color:red">WHAT DO YOU CALL A FISH WEARING A BOW TIE?</h1>
            <button @click="${() => this.fish = !this.fish}">?</button>
            <h1 style="display:${this.fish?"block":"none"}">SOPHISTICATED</h1>
            <button style="display:${this.fish?"block":"none"}"  @click="${()=>{this.blockSwis=!this.blockSwis; this.blockFish=!this.blockFish}  }">next</button>
        </div>

        <div style="display:${!this.blockSwis?"none":"block"}">
            <h1 style="color:red">WHAT'S THE BEST THING ABOUT SWITZERLAND?</h1>
            <button @click="${() => this.swis = !this.swis}">?</button>
            <h1 style="display:${this.swis?"block":"none"}">I DONT KNOW... BUT THE FLAG IS A BIG PLUS</h1>
            <button style="display:${this.swis?"block":"none"}"  @click="${()=> {this.blockPasta=!this.blockPasta; this.blockSwis=!this.blockSwis}}">next</button>
        </div>
        
        <div style="display:${!this.blockPasta?"none":"block"}">
            <h1 style="color:red">WHAT DO YOU CALL A FAKE NOODLE?</h1>
            <button @click="${() => this.pasta = !this.pasta}">?</button>
            <h1 style="display:${this.pasta?"block":"none"}">AN IMPASTA</h1>
            <button style="display:${this.pasta?"block":"none"}"  @click="${()=> { this.blockPasta=!this.blockPasta}}">bye</button>
        </div>
       
`;
    }

}

window.customElements.define('joke-element', JokeElement);