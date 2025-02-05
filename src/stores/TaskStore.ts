import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from '../types/task';
import { taskService } from '../services/taskService';

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const isLoading = ref(false);

  const fetchTasks = async () => {
    isLoading.value = true;
    try {
      const fetchedTasks = await taskService.getTasks();
      tasks.value = fetchedTasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const addTask = async (title: string) => {
    try {
      const newTask = await taskService.createTask(title);
      tasks.value.push(newTask);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await taskService.updateTask(task);
      const index = tasks.value.findIndex(t => t.id === task.id);
      if (index !== -1) {
        tasks.value[index] = task;
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      tasks.value = tasks.value.filter(task => task.id !== id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return {
    tasks,
    isLoading,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask
  };
}, {
  persist: true
});
