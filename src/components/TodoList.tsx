import { observer } from "mobx-react-lite";
import todoStore from "../store/todoStore";
import TodoItem from "./TodoItem";

export default observer(() => {
  const { todos } = todoStore;

  return (
    <ul className="todo-list__checklist">
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          title={item.title}
          status={item.status}
        />
      ))}
    </ul>
  );
});
