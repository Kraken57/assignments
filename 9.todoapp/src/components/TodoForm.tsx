import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import { Todo } from '../types/todo';
import { Select } from './Select';

interface TodoFormProps {
  onAdd: (todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-12"
      onSubmit={handleSubmit}
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-3xl blur-xl" />
        <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl" />
      </div>

      <div className="relative backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
            Create New Task
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 text-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400/50 focus:border-transparent dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            />
          </div>
          
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (optional)"
              className="w-full px-4 py-3 text-sm bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-400/50 focus:border-transparent dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none transition-all"
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <Select
              value={priority}
              onChange={(value) => setPriority(value as Todo['priority'])}
              options={[
                { value: 'low', label: 'Low Priority' },
                { value: 'medium', label: 'Medium Priority' },
                { value: 'high', label: 'High Priority' },
              ]}
            />

            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all"
            >
              <Plus size={20} />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </div>
    </motion.form>
  );
};