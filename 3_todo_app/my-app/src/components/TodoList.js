import React from 'react'
import { useSelector } from 'react-redux'
import Todo from './Todo'

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  const { status, colors } = useSelector(state => state.filters);

  const filterByStatus = (todo) => {
    switch (status) {
      case 'Complete':
        return todo.completed
      case 'Incomplete':
        return !todo.completed
      default:
        return true;
    }
  }

  const filterByColor = todo => {
    if (colors.length > 0) {
      return colors.includes(todo?.color)
    }
    return true;
  }

  return (
    <div
      className="mt-2 text-gray-700 text-sm max-h-[300px] overflow-y-auto"
    >
      {
        todos
          .filter(filterByStatus)
          .filter(filterByColor)
          .map((todo) => <Todo key={todo.id} todo={todo} />)
      }

    </div>
  )
}
