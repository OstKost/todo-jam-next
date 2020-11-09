import React, { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';

export const TodoForm = () => {
  const [todo, setTodo] = useState('');
  const { addTodo } = useContext(TodosContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(todo);
    setTodo('');
  };

  return (
    <form className='font my-6' onSubmit={handleSubmit}>
      <div className='flex flex-col text-sm mb-2'>
        <label htmlFor='todo' className='font-bold text-gray-800'>
          Todo
        </label>
        <input
          type='text'
          name='todo'
          id='todo'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder='ex. Buy milk'
          className='border border-gray-200 rounded-lg p-2 
          appearance-none focus:outline-none focus:border-gray-500
          transition-colors duration-200'
        />
      </div>
      <button
        type='submit'
        className='w-full rounded text-white bg-blue-500 hover:bg-blue-600 py-2 px-4'
      >
        Save
      </button>
    </form>
  );
};
