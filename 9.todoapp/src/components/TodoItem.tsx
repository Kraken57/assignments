import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Edit } from 'lucide-react';
import { Todo } from '../types/todo';
import { format } from 'date-fns';
import { clsx } from 'clsx';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-3 hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={() => onToggle(todo.id)}
            className={clsx(
              'w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors',
              todo.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
            )}
          >
            {todo.completed && <Check size={14} className="text-white" />}
          </button>
          
          <div className="flex-1">
            <h3
              className={clsx(
                'text-lg font-medium transition-colors dark:text-white',
                todo.completed && 'text-gray-400 dark:text-gray-500 line-through'
              )}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                {todo.description}
              </p>
            )}
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {format(todo.createdAt, 'MMM d, yyyy')}
              </span>
              <span
                className={clsx(
                  'text-xs px-2 py-1 rounded-lg',
                  priorityColors[todo.priority]
                )}
              >
                {todo.priority}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/50 transition-colors"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};