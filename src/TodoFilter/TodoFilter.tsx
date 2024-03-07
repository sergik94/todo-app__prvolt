import React from 'react'
import { FilteredBy } from '../types/FilteredBy'

type Props = {
  filteredBy: string
  handleFilteredBy: (event: React.FormEvent<HTMLSelectElement>) => void
}

export const TodoFilter: React.FC<Props> = ({
  filteredBy,
  handleFilteredBy,
}) => 
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={handleFilteredBy}
          value={filteredBy}
        >
          <option value={FilteredBy.ALL}>{FilteredBy.ALL}</option>
          <option value={FilteredBy.ACTIVE}>{FilteredBy.ACTIVE}</option>
          <option value={FilteredBy.COMPLETED}>{FilteredBy.COMPLETED}</option>
        </select>
      </span>
    </p>
  </form>

