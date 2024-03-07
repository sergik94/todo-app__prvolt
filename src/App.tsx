import React, { useState } from 'react'

import { AddingTodo } from './components/AddingTodo'
import { TodoList } from './components/TodoList'

import './App.scss'
import { TodoFilter } from './TodoFilter'
import { FilteredBy } from './types/FilteredBy'

export const App: React.FC = () => {
  const [filteredBy, selectFilteredBy] = useState(FilteredBy.ALL)

  const handleFilteredBy = (e: React.FormEvent<HTMLSelectElement>): void => {
    const value = e.currentTarget.value as FilteredBy
    selectFilteredBy(value)
  }

  return (
    <>
      <div className="app">
        <div className="app__container _container">
          <h1 className="app__title">Todos</h1>

          <AddingTodo />

          <TodoFilter filteredBy={filteredBy} handleFilteredBy={handleFilteredBy} />
          <TodoList filteredBy={filteredBy} />
        </div>
      </div>
    </>
  )
}
