import { LitElement, html } from 'lit';

class TodoView extends LitElement {

    static get properties() {
        return {
            todos: { type: Array },
            task: { type: String }
        }
    }

    constructor() {
        super();
        this.todos = [];
        this.task = '';
    }

    render() {
        return html`
            <div class="input-layout">
                <input placeholder="task" .value="${this.task}" @change="${this.updateTask}" />
                <button @click="${this.addTodo}">add</button>
            </div>
            
            <div class="todos-list">
                ${this.todos.map(todo => html`
                <div class="todo-item">
                    <div>${todo.task}</div>
                </div>
                `)}
            </div>
            
            `
    }

    updateTask(e) {
        this.task = e.target.value;
    }

    addTodo() {
        if (this.task) {
            this.todos = [...this.todos, { task: this.task, complete: false }];
            this.task = "";
        }
        console.log(this.todos);
    }
}

window.customElements.define('todo-element', TodoView);