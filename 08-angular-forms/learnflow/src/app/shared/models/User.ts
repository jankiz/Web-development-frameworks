import { Task } from "./Task";

export interface User {
    name: {
      firstname: string;
      lastname: string;
    };
    email: string;
    password: string;
    tasks: Task[];
    completed_tasks: Task[];
  }