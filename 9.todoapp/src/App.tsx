import  { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Command } from "lucide-react";
import { TodoItem } from "./components/TodoItem";
import { TodoForm } from "./components/TodoForm";
import { EditModal } from "./components/EditModal";
import { Background } from "./components/Background";
import { ThemeToggle } from "./components/ThemeToggle";
import { Todo } from "./types/todo";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const completedTodos = todos.filter((todo) => todo.completed);
  const incompleteTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <Background />
      <ThemeToggle />

      <div className="max-w-4xl mx-auto px-4 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 mb-4 rounded-2xl bg-gray-900/5 dark:bg-white/5 backdrop-blur-lg">
            <Command size={20} className="text-gray-800 dark:text-gray-200" />
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-4">
            Task Master
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            A beautiful and powerful todo application for managing your tasks
            with style
          </p>
        </motion.div>

        <TodoForm onAdd={addTodo} />

        <div className="space-y-8 relative">
          <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-purple-50/50 dark:from-purple-900/20 to-transparent rounded-3xl blur-2xl" />

          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              Active Tasks ({incompleteTodos.length})
            </h2>
            <AnimatePresence>
              {incompleteTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={setEditingTodo}
                />
              ))}
            </AnimatePresence>
          </section>

          {completedTodos.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <CheckCircle2 size={24} className="text-green-500 mr-2" />
                Completed ({completedTodos.length})
              </h2>
              <AnimatePresence>
                {completedTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={setEditingTodo}
                  />
                ))}
              </AnimatePresence>
            </section>
          )}
        </div>

        <EditModal
          todo={editingTodo}
          onClose={() => setEditingTodo(null)}
          onSave={editTodo}
        />
      </div>
    </div>
  );
}

export default App;
