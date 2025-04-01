export interface Task {
    id: number;
    name: string;
    completed: boolean;
    priority: 'High' | 'Medium' | 'Low';
    dueDate: Date;
    description?: string;
  }