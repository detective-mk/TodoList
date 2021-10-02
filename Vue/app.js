const app = Vue.createApp({
  data() {
    return {
      todos: [],
      todoText: '',
      emptyText: false,
      selected: 'all',
      onlyDone: false,
      onlyUnDone: false,
    }
  },
  created() {
    // 画面描画時にもしlocalStorageにtodoがあったら、それをtodosに渡す。
    const todos = window.localStorage.getItem('todos')

    if (todos) {
      this.todos = JSON.parse(todos)
    }
  },
  computed: {
    // todo-itemコンポーネントを表示させる条件をコントロールしている。filter関数によりtodoのフィルター機能を実装している。
    resultTodos() {
      const onlyDone = this.onlyDone
      const onlyUnDone = this.onlyUnDone
      return this.todos
        .filter(function (todo) {
          if (onlyDone) {
            return todo.done
          }
          if (onlyUnDone) {
            return !todo.done
          }
          return true
        })
    }
  },
  methods: {
    checkText() {
      if (!this.todoText) {
        this.emptyText = true
        return false
      } else {
        this.emptyText = false
      }
    },
    addTodo() {
      this.checkText()
      if (this.emptyText === false) {
        this.todos.unshift({
          text: this.todoText,
          done: false,
        })
        this.saveLocalTodos()
        this.todoText = ''
      }
    },
    completeTodo(index) {
      this.todos[index].done = !this.todos[index].done
      this.saveLocalTodos()
    },
    deleteTodo(index) {
      this.todos.splice(index, 1)
      this.saveLocalTodos()
    },
    editTodo(index, newTodo) {
      this.todos[index].text = newTodo
    },
    filterTodo() {
      switch (this.selected) {
        case 'all':
          this.onlyDone = false
          this.onlyUnDone = false
          break
        case 'completed':
          this.onlyDone = true
          this.onlyUnDone = false
          break
        case 'uncompleted':
          this.onlyDone = false
          this.onlyUnDone = true
          break
      }
    },
    saveLocalTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
  },
})

app.component('todo-item', {
  props: {
    todo: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
    }
  },
  template: '#todo-item',
  data() {
    return {
      isDelete: false,
      editMode: false,
      editTodoText: this.todo.text,
    }
  },
  methods: {
    isComplete(index) {
      this.$emit('complete-todo', index)
    },
    editTodo(index) {
      this.editMode = !this.editMode
      this.$emit('edit-todo', index, this.editTodoText)
    },
    deleteTodo(index) {
      this.isDelete = true
      var that = this
      window.setTimeout(function () {
        that.$emit('delete-todo', index)
      }, 1000)
    }
  },
})

app.mount('#app')