import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      return JSON.parse(saved, (key, value) => {
        if (key === 'createdAt') return new Date(value);
        return value;
      });
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => {
    setTodos(prev => [
      {
        ...newTodo,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date(),
      },
      ...prev,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (updatedTodo: Todo) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
  };
};