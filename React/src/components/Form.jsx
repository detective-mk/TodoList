import { useState } from "react";

export function Form({ todos, setTodos, savedTodos, createTodos }) {
  const [input, setInput] = useState("");
  const [empty, setEmpty] = useState(false);

  const changeHandler = (e) => {
    setInput(e.target.value);

    if (e.target.value === "") {
      setEmpty(true);
    }
  };

  const addTodo = (e, taskName) => {
    e.preventDefault();

    if (taskName === "") {
      setEmpty(true);

      return;
    }

    setEmpty(false);

    const todoObject = {
      id: Math.floor(Math.random() * 1e5),
      todo: taskName,
      complete: false,
    };

    const newTodos = [...todos, todoObject];
    createTodos(newTodos);

    setInput("");
  };

  const filterTodo = (e) => {
    const val = e.target.value;
    console.log(savedTodos);

    switch (val) {
      case "all":
        setTodos(savedTodos);
        break;
      case "completed":
        const completedTodos = savedTodos.filter((todo) => {
          return todo.complete === true;
        });

        setTodos(completedTodos);
        break;
      case "uncompleted":
        const uncompletedTodos = savedTodos.filter((todo) => {
          return todo.complete === false;
        });

        setTodos(uncompletedTodos);
        break;
      default:
        throw new Error("error");
    }
  };

  return (
    <form className="form">
      <div className="inputWrapper">
        <input
          type="text"
          className="todo-input"
          value={input}
          onChange={changeHandler}
        />
        <button className="todo-button" onClick={(e) => addTodo(e, input)}>
          <i className="fa fa-plus-square"></i>
        </button>
        {empty && <div className="err">todoが入力されていません</div>}
      </div>
      <div className="select">
        <select name="todos" className="filter-btn" onChange={filterTodo}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
}
