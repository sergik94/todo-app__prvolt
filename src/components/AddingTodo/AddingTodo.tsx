import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { actions as todosActions } from '../../features/todos'
import { Todo } from '../../types/Todo'
import './AddingTodo.scss'

const MAX_CHARACTER = 100

export const AddingTodo: React.FC = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos)
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [error, setError] = useState('')

  function addNewTodo(todo: Omit<Todo, 'id'>): void {
    const id = (todos.at(-1)?.id || 0) + 1

    dispatch(todosActions.add({ ...todo, id }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value

    if (value.length > MAX_CHARACTER) {
      setNewTodoTitle(value.slice(0, MAX_CHARACTER))

      return
    }
  
    setNewTodoTitle(value)

    setError('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setError('')

    if (newTodoTitle.trim() === '') {
      setError("Todo title can't be empty")

      return
    }

    const userIds = todos.map((todo) => todo.userId)
    const maxId = Math.max(...userIds)

    const newTodo = {
      userId: maxId + 1,
      title: newTodoTitle,
      completed: false,
    }

    addNewTodo(newTodo)
    setNewTodoTitle('')
  }

  return (
    <form className="app__adding-todo adding-todo" onSubmit={handleSubmit}>
      {error && <p className="adding-todo__error">{error}</p>}

      <p className="adding-todo__char-counter">{`${newTodoTitle.length} / ${MAX_CHARACTER}`}</p>

      <input
        className="adding-todo__input"
        type="text"
        placeholder="Enter new todo title"
        value={newTodoTitle}
        onChange={handleInputChange}
      />
      <button
        className="adding-todo__button button"
        type="submit"
      >
        Add todo
      </button>
    </form>
  )
}
