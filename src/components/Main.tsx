import EditTodo from "./EditTodo";
import InputTodo from "./InputTodo";
import TodoList from "./TodoList";

const Main = () => {
  return (
    <main className="content">
      <section className="todo-list">
        <InputTodo />
        <TodoList />
      </section>
      <section className="todo-edit">
        <EditTodo />
      </section>
    </main>
  );
};

export default Main;
