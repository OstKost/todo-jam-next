import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

export const Todo = ({ todo }) => {
  const { completed, description } = todo?.fields ?? {};
  const { updateTodo, deleteTodo } = useContext(TodosContext);

  const toggleCompleted = () => {
    const updatedTodo = {
      id: todo.id,
      fields: {
        ...todo.fields,
        completed: !completed,
      },
    };
    updateTodo(updatedTodo);
  };

  return (
    <li className='bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4'>
      <input
        type='checkbox'
        name='completed'
        checked={completed}
        className='mr-2 form-checkbox h-5 w-5'
        onChange={toggleCompleted}
      />
      <p className={`flex-1 text-gray-800  ${completed ? 'line-through' : ''}`}>
        {description}
      </p>
      <button
        type='button'
        className='text-sm text-white bg-red-500 hover:bg-red-600 py-1 px-2 rounded'
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </li>
  );
};
