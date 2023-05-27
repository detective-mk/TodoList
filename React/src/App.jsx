import React from "react";
import { useState } from "react";
import "./App.css";
import { Todo } from "./components/Todo";

function App() {
  return (
    <>
      <header>
        <h1>Todo List</h1>
      </header>

      <main className="main">
        <Todo />
      </main>
    </>
  );
}

export default App;
