// DOM Selector
const todoInput = document.querySelector('.todo-input');
const err = document.querySelector('.err');
const todoBtn = document.querySelector('.todo-button');
const filterBtn = document.querySelector('.filter-btn');
const todoList = document.querySelector('.todo-list');

// Eventlistner
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoList.addEventListener('click', editTodo);
filterBtn.addEventListener('change', filterTodo);

// Functions
function addTodo(e) {
  e.preventDefault();
  err.style.display = 'none';
  // 未入力時にtodoが生成されるのを防ぐ
  const todoText = todoInput.value;
  if (!todoText) {
    err.style.display = 'block';
    return;
  }
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  const newTodo = document.createElement('li');
  newTodo.innerText = todoText;
  newTodo.classList.add('todo-item');
  newTodo.setAttribute("data-text", todoText);
  todoDiv.appendChild(newTodo);
  const editInput = document.createElement('input');
  editInput.setAttribute("type", "text");
  editInput.classList.add('edit_input');
  editInput.classList.add('js_edit_input');
  todoDiv.appendChild(editInput);
  // TODOをlocalStorageに格納
  saveLocalTodos(todoInput.value);
  // CompleteBtn
  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = '<i class="fa fa-check"></i>';
  completeBtn.classList.add('complete-btn');
  todoDiv.appendChild(completeBtn);
  // TrashBtn
  const trashBtn = document.createElement('button');
  trashBtn.innerHTML = '<i class="fa fa-trash"></i>';
  trashBtn.classList.add('trash-btn');
  todoDiv.appendChild(trashBtn);
  // Create TodoDiv
  todoList.appendChild(todoDiv);
  // Clear InputText
  todoInput.value = "";
}

function deleteCheck(e) {
  console.log(e);
  const item = e.target;
  // Delete
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }
  // Check Mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function editTodo(e) {
  const item = e.target;
  let beforeText = item.innerText;
  console.log(beforeText);
  if (item.classList[0] === 'todo-item') {
    const editInput = item.nextElementSibling;
    editInput.value = item.innerText;
    editInput.style.display = 'block';
    item.style.display = 'none';
    // フォーカスが外れるとinputを非表示にする
    editInput.addEventListener('blur', function () {
      item.innerText = editInput.value;
      item.setAttribute("data-text", editInput.value);
      editInput.style.display = 'none';
      item.style.display = 'block';

      // localStorageの値を入れ替える
      let todos;
      todos = JSON.parse(localStorage.getItem('todos'));
      console.log(item.innerText);
      todos.splice(todos.indexOf(beforeText), 1, item.innerText);
      localStorage.setItem('todos', JSON.stringify(todos));

    });
  };
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'none';
        } else {
          todo.style.display = 'flex';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos')); // 文字列として格納されているtodosアイテムを解析する(=parse)
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos)); // JSON文字列に変換してlocalStorageにセット
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  console.log(todoIndex);
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    console.log(todo);
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    newTodo.setAttribute("data-text", todo);
    todoDiv.appendChild(newTodo);
    const editInput = document.createElement('input');
    editInput.setAttribute("type", "text");
    editInput.classList.add('edit_input');
    editInput.classList.add('js_edit_input');
    todoDiv.appendChild(editInput);
    // CompleteBtn
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fa fa-check"></i>';
    completeBtn.classList.add('complete-btn');
    todoDiv.appendChild(completeBtn);
    // TrashBtn
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fa fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);
    // Create TodoDiv
    todoList.appendChild(todoDiv);
  });
}