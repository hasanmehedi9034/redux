import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchTodos from '../redux/todos/thunk/fetchTodos';
import Todo from './Todo'

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const { status, colors } = useSelector(state => state.filters);

  useEffect(() => {
    dispatch(fetchTodos)
  }, [dispatch])

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
