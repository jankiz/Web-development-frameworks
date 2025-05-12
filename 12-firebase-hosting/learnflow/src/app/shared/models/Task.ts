export interface Task {
  id: string;
  name: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  description?: string;     
}