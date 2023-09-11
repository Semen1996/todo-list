import { useState, useRef, useEffect } from "react";
import todoStore from "../store/todoStore";

const InputTodo = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodo } = todoStore;

  useEffect(() => {
    if(inputRef.current) inputRef.current.focus();
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value)
      addTodo({
        title: value,
        text: "",
        status: "waiting",
      });
    setValue("");
  };

  return (
    <form className="todo-list__add-form" onSubmit={handleSubmit}>
      <input
        className="todo-list__input"
        type="text"
        placeholder="Добавить дело"
        ref={inputRef}
        onChange={handleChange}
        value={value}
        minLength={2}
        required
      />
      <button className="todo-list__add-button" type="submit">
        +
      </button>
    </form>
  );
};

export default InputTodo;
