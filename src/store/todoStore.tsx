import { makeAutoObservable } from "mobx";

interface ITodoAdd {
  title: string;
  text: string;
  status: string;
}

interface ITodo extends ITodoAdd {
  readonly id: number;
}

type ITodos = ITodo[];

class TodoStore {
  todos: ITodos = [];
  todoSelected: ITodo = {
    id: 0,
    title: "Добавьте первую задачу",
    text: "",
    status: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  addTodo = (todo: ITodoAdd) => {
    let id: number = 0;
    while (1) {
      const idNew = Math.floor(Math.random() * 1e6);
      const isUnique = !this.todos.some((item) => item.id === idNew);
      if (isUnique) {
        id = idNew;
        break;
      }
    }

    const newTodo: ITodo = { ...todo, id };
    this.todos.push(newTodo);
  };

  deleteTodo = (idTodo: number) => {
    this.todos = this.todos.filter((item) => {
      if (item.id === idTodo) {
        if (this.todoSelected.id === idTodo) {
          this.todoSelected = {
            id: 0,
            title: "Добавьте задачу",
            text: "",
            status: "",
          };
        }
        return false;
      }
      return true;
    });
  };

  selectTodo = (idTodo: number) => {
    this.todoSelected =
      this.todos.find((item) => item.id === idTodo) || this.todoSelected;
  };

  findTodo = (idTodo: number) => {
    const todo = this.todos.find((item) => item.id !== idTodo);
    return todo;
  };

  editTodo = (todo: ITodo) => {
    this.todoSelected = todo;
    this.todos = this.todos.map((item) => {
      if (item.id === todo.id) {
        item = todo;
      }
      return item;
    });
  };
}

export default new TodoStore();
