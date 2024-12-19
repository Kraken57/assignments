export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    priority: 'low' | 'medium' | 'high';
    description?: string;
  }