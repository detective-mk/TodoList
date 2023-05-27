import { TodoList } from "./TodoList";
import { Form } from "./Form";
import { useState } from "react";

const todoItems = [
  {
    id: 1,
    todo: "これは",
    complete: false,
  },
  {
    id: 2,
    todo: "Todo",
    complete: false,
  },
  {
    id: 3,
    todo: "Listです",
    complete: false,
  },
];

export function Todo() {
  const [todos, setTodos] = useState(todoItems);
  const [savedTodos, setSavedTodos] = useState(todos);

  const createTodos = (todos) => {
    setTodos(todos);
    setSavedTodos(todos);
  };

  return (
    <>
      <Form
        todos={todos}
        setTodos={setTodos}
        savedTodos={savedTodos}
        createTodos={createTodos}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        savedTodos={savedTodos}
        createTodos={createTodos}
      />
    </>
  );
}
