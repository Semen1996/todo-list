import todoStore from "../store/todoStore";
interface ITodoItem {
  id: number;
  title: string;
  status: string;
}

const TodoItem: React.FC<ITodoItem> = ({ title, status, id }) => {
  const { deleteTodo, selectTodo } = todoStore;

  function handleDeleteItem() {
    deleteTodo(id);
  }

  function handleSelected() {
    selectTodo(id);
  }

  return (
    <li
      className={`todo-list__item todo-list__item_status_${status}`}
      onClick={handleSelected}
    >
      <p className="todo-list__item-link">{title}</p>
      <button
        className="todo-list__delete-button"
        type="button"
        onClick={handleDeleteItem}
      ></button>
    </li>
  );
};

export default TodoItem;
