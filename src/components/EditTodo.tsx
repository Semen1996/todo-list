import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import todoStore from "../store/todoStore";

type ITodo = {
  id: number;
  title: string;
  text: string;
  status: string;
};

export default observer(() => {
  const { todoSelected, editTodo } = todoStore;
  const [edit, setEdit] = useState(false);
  const [newTodo, setNewTodo] = useState<ITodo>({
    id: todoSelected.id,
    title: todoSelected.title,
    text: todoSelected.text,
    status: todoSelected.status,
  });

  useEffect(() => {
    setEdit(false);
    setNewTodo({
      id: todoSelected.id,
      title: todoSelected.title,
      text: todoSelected.text,
      status: todoSelected.status,
    });
  }, [todoSelected]);

  function handleEdit() {
    setEdit(true);
  }

  const changeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewTodo({ ...newTodo, title: e.target.value });
  };

  const changeText: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setNewTodo({ ...newTodo, text: e.target.value });
  };

  const changeStatus: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setNewTodo({ ...newTodo, status: e.target.value });
  };

  function handleSaveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    editTodo(newTodo);
    setEdit(false);
  }

  return edit ? (
    <form className="todo-edit__form" onSubmit={handleSaveEdit}>
      <input
        className="todo-edit__title"
        type="text"
        defaultValue={todoSelected.title}
        onChange={changeTitle}
        required
      />
      <textarea
        className="todo-edit__text"
        placeholder="Описание дела"
        defaultValue={todoSelected.text}
        onChange={changeText}
      ></textarea>
      <button className="todo-edit__submit" type="submit">
        Сохранить
      </button>
      <select
        className="todo-edit__status-btn"
        defaultValue={todoSelected.status}
        onChange={changeStatus}
      >
        <option value="waiting">Ожидает</option>
        <option value="progress">В процессе</option>
        <option value="done">Выполнено</option>
      </select>
    </form>
  ) : (
    <div className="todo-edit__form">
      <h2 className="todo-edit__title">{todoSelected.title}</h2>
      <p className="todo-edit__text">{todoSelected.text}</p>
      {todoSelected.id !== 0 && (
        <button
          className="todo-edit__submit"
          type="button"
          onClick={handleEdit}
        >
          Редактировать
        </button>
      )}
    </div>
  );
});
