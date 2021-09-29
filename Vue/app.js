const app = Vue.createApp({
  data() {
    return {
      todos: [],
      todoText: '',
      emptyText: false,
      selected: 'all',
    }
  },
  created() {
    // もしlocalStorageにtodoがあったら、それをtodosに渡す。
    if (localStorage.getItem('todos') === null) {
      this.todos = []
    } else {
      let localStorageTodos = []
      localStorageTodos = JSON.parse(localStorage.getItem('todos'))
      for (todo of localStorageTodos) {
        this.todos.push(todo)
      }
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
        this.todos.unshift(this.todoText)
        this.saveLocalTodos()
        this.todoText = ''
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1)
      this.saveLocalTodos()
    },
    editTodo(index, newTodo) {
      this.todos.splice(index, 1, newTodo)
    },
    filterTodo() {
      var that = this
      this.todos.forEach(function (todo) {

      })
      switch (this.selected) {
        case 'all':
          console.log(this.selected)
          if (this.complete) {
            console.log('読み取れています！')
          }
          break
        case 'completed':
          // 子コンポーネントのdataがcomplete: trueのものだけを表示したい。JSのfilterが使えそう？子コンポーネントの状態completeを親に知らせる必要がある。
          console.log(this.selected)
          break
        case 'uncompleted':
          console.log(this.selected)
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
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    }
  },
  template: '#todo-item',
  data() {
    return {
      complete: false,
      isDelete: false,
      editMode: false,
      editTodoText: this.todo,
    }
  },
  computed: {
    contactComplete() {
      this.complete
    }
  },
  methods: {
    isComplete() {
      this.complete = !this.complete
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

/*************************
残タスク
************************/
// タスク削除:アニメーション完了後→削除ができない→済
// editモードの実装→済
// filterの実装
// タスクをlocalStorageに保存する処理→済