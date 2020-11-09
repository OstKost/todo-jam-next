import { createContext, useState } from 'react';

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    try {
      const res = await fetch('/api/getTodos');
      const latestTodos = await res.json();
      setTodos(latestTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (description) => {
    try {
      const res = await fetch('/api/createTodo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      const newTodo = await res.json();
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (todo) => {
    try {
      const res = await fetch('/api/updateTodo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      });
      setTodos((prevTodos) => {
        const todos = [...prevTodos];
        const index = todos.findIndex(({ id }) => id === todo.id);
        todos.splice(index, 1, todo);
        return todos;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch('/api/deleteTodo', {
        method: 'Delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
