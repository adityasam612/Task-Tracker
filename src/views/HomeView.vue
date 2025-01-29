<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';
import BaseButton from '../components/BaseButton.vue';
import { apiService } from '../services/apiService';
import type { Task } from '../types/task';

const tasks = ref<Task[]>([]);
const isLoading = ref(false);
const error = ref('');

onMounted(async () => {
  try {
    isLoading.value = true;
    tasks.value = await apiService.getTasks();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load tasks';
  } finally {
    isLoading.value = false;
  }
});

const addTask = async (taskData: { title: string }) => {
  try {
    const newTask = await apiService.createTask(taskData.title);
    tasks.value.push(newTask);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to add task';
  }
};

const deleteTask = async (taskId: number) => {
  try {
    await apiService.deleteTask(taskId);
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to delete task';
  }
};

const toggleComplete = async (taskId: number) => {
  try {
    const task = tasks.value.find(t => t.id === taskId);
    if (task) {
      const updatedTask = await apiService.updateTask({
        ...task,
        completed: !task.completed
      });
      Object.assign(task, updatedTask);
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to update task';
  }
};
</script>

<template>
  <div class="container">
    <h1 class="title">Task Tracker</h1>

    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="isLoading">Loading...</div>

    <TaskForm @add-task="addTask" />
    <TaskList
      :tasks="tasks"
      @delete-task="deleteTask"
      @toggle-complete="toggleComplete"
    />
  </div>
</template>
