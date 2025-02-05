interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface TaskEmits {
  (e: 'toggle-complete', id: number): void;
  (e: 'delete-task', id: number): void;
  (e: 'update-task', task: Task): void;
  (e: 'add-task', task: Task): void;
}
