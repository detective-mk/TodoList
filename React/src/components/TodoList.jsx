export function TodoList({ todos, createTodos, setTodos }) {
  const deleteTodo = (e, id) => {
    const todoElm = e.target.closest(".todo");
    todoElm.classList.add("fall");
    todoElm.addEventListener("transitionend", () => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      createTodos(newTodos);
    });
  };

  const completeTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });

    createTodos(newTodos);
  };

  return (
    <>
      <div className="todo-container">
        <ul className="todo-list">
          {todos.map((todo) => {
            return (
              <div
                className={"todo " + (todo.complete ? "completed" : "")}
                key={todo.id}
              >
                <li className="todo-item">{todo.todo}</li>
                <input type="text" className="edit_input" />
                <button
                  className="complete-btn"
                  onClick={() => completeTodo(todo.id)}
                >
                  <i className="fa fa-check"></i>
                </button>
                <button
                  className="trash-btn"
                  onClick={(e) => deleteTodo(e, todo.id)}
                >
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
