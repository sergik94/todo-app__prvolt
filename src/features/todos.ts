import { Todo } from '../types/Todo'

type AddTodo = {
  type: 'TODO/add'
  payload: Todo
}

type EditTodo = {
  type: 'TODO/edit'
  payload: Todo
}

type DeleteTodo = {
  type: 'TODO/delete'
  payload: number
}

type Actions = AddTodo | EditTodo | DeleteTodo

const todosReducer = (todos: Todo[] = [], action: Actions): Todo[] => {
  if (action.type === 'TODO/add') {
    return [...todos, action.payload]
  }

  if (action.type === 'TODO/edit') {
    return todos.map((todo) => {
      if (todo.id === action.payload.id) {
        return action.payload
      }

      return todo
    })
  }

  if (action.type === 'TODO/delete') {
    return todos.filter((todo) => todo.id !== action.payload)
  }

  return todos
}

export const actions = {
  add: (todo: Todo): AddTodo => ({ type: 'TODO/add', payload: todo }),
  edit: (todo: Todo): EditTodo => ({ type: 'TODO/edit', payload: todo }),
  delete: (id: number): DeleteTodo => ({ type: 'TODO/delete', payload: id }),
}

export default todosReducer
