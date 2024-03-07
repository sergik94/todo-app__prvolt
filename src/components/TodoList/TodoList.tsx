import React, { useState, useRef, useMemo, useEffect } from 'react'
import cn from 'classnames'
import './TodoList.scss'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { actions as todosActions } from '../../features/todos'
import { Todo } from '../../types/Todo'
import { FilteredBy } from '../../types/FilteredBy'

type Props = {
  filteredBy: FilteredBy
}

export const TodoList: React.FC<Props> = ({ filteredBy }) => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos)
  const [newTitle, setNewTitle] = useState('')
  const [editedTodoId, setEditedTodoId] = useState<number | null>(null)
  const focusedInput = useRef<null | HTMLInputElement>(null)
  const [completedTodosCount, setCompletedTodosCount] = useState(0)

  const filteredTodos = useMemo(() => {
    switch (filteredBy) {
      case FilteredBy.ACTIVE:
        return todos.filter(todo => !todo.completed)

      case FilteredBy.COMPLETED:
        return todos.filter(todo => todo.completed)

      default:
        return todos
    }
  }, [filteredBy, todos])

  function editTodo(editedTode: Todo): void {
    setEditedTodoId(null)
    dispatch(todosActions.edit(editedTode))
  }

  function deleteTodo(id: number): void {
    dispatch(todosActions.delete(id))
  }

  const handleCompletedChange = (todo: Todo): void => {
    setEditedTodoId(todo.id)
    editTodo({ ...todo, completed: !todo.completed })
  }

  const handleEditClick = (id: number, currTitle: string): void => {
    setEditedTodoId(id)
    setNewTitle(currTitle)
    setTimeout(() => focusedInput.current?.focus(), 0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(e.currentTarget.value)
  }

  const handleAcceptNewTitle = (todo: Todo): void => {
    if (todo.title === newTitle || newTitle === '') {
      setEditedTodoId(null)
      return
    }

    editTodo({ ...todo, title: newTitle })
    setNewTitle('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, todo: Todo): void => {
    e.preventDefault()
    handleAcceptNewTitle(todo)
  }

  useEffect(() => {
    const completedTodos = todos.filter(todo => todo.completed)

    setCompletedTodosCount(completedTodos.length)
  }, [todos])

  return (
    <div className="app__todos todos">
      {!todos.length ? 
        <p className="todos__notification">Todos list is empty</p>
        : 
        <table className="todos__table">
          <div className="todos__counter">
            <p>Currant: {todos.length - completedTodosCount}</p>
            <p>Completed: {completedTodosCount}</p>
          </div>
          <thead>
            <tr className="todos__head-row">
              <th>#</th>
              <th> </th>
              <th>Title</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos
              .map((todo, index) => 
                <tr key={todo.id} className="todos__body-row">
                  <td className="todos__index">{index + 1}.</td>
                  <td className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      id={`cb-${todo.id}`}
                      checked={todo.completed}
                      onChange={(): void => handleCompletedChange(todo)}
                    />
                    <label htmlFor={`cb-${todo.id}`} className="check-box" />
                  </td>
                  <td className="todos__title-head" onClick={(): void => console.log(todo.id)}>
                    {editedTodoId === todo.id ? 
                      <form onSubmit={(e): void => handleSubmit(e, todo)}>
                        <input
                          type="text"
                          className="todos__edit-input"
                          value={newTitle}
                          onChange={handleInputChange}
                          ref={focusedInput}
                        />
                      </form>
                      : 
                      <p
                        className={cn('todos__title', {
                          'todos__is-completed': todo.completed
                        })}
                        onClick={(): void => handleCompletedChange(todo)}
                      >
                        {todo.title}
                      </p>
                    }
                  </td>
                  <td className="todos__edit-column">
                    {editedTodoId === todo.id ? 
                      <div className="todos__edit-buttons">
                        <button
                          className="todos__edit-accept button"
                          onClick={(): void => handleAcceptNewTitle(todo)}
                        />
                        <button
                          className="todos__edit-cancel button"
                          onClick={(): void => setEditedTodoId(null)}
                        />
                      </div>
                      : 
                      <button
                        className="todos__edit button"
                        title="Edit"
                        onClick={(): void => handleEditClick(todo.id, todo.title)}
                      />
                    }
                  </td>
                  <td>
                    <button
                      className="todos__remove button"
                      title="Remove"
                      onClick={(): void => deleteTodo(todo.id)}
                    />
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      }
    </div>
  )
}
