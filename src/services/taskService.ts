// src/services/taskService.ts
import type { Task } from '../types/task';

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const tasks = await response.json();
    return tasks.map((task: any) => ({
      id: task.id,
      title: task.title,
      completed: task.completed
    }));
  },

  async createTask(title: string): Promise<Task> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
        title,
        completed: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    return response.json();
  },

  async updateTask(task: Task): Promise<Task> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    return response.json();
  },

  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  }
};
