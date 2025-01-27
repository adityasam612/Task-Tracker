<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';
import BaseButton from '../components/BaseButton.vue';
import type { Task } from '../types/task';

const tasks = ref<Task[]>([]);
const filter = ref<'all' | 'completed' | 'incomplete'>('all');

onMounted(() => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
});

const filteredTasks = computed(() => {
  switch (filter.value) {
    case 'completed':
      return tasks.value.filter(task => task.completed);
    case 'incomplete':
      return tasks.value.filter(task => !task.completed);
    default:
      return tasks.value;
  }
});

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};

const addTask = (taskData: Omit<Task, 'id'>) => {
  const newTask: Task = {
    ...taskData,
    id: Date.now()
  };
  tasks.value.push(newTask);
  saveTasks();
};

const deleteTask = (id: number) => {
  tasks.value = tasks.value.filter(task => task.id !== id);
  saveTasks();
};

const toggleComplete = (taskId: number) => {
  const task = tasks.value.find(task => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
  }
};

const updateTask = (updatedTask: Task) => {
  const index = tasks.value.findIndex(task => task.id === updatedTask.id);
  if (index !== -1) {
    tasks.value[index] = updatedTask;
    saveTasks();
  }
};

const filterTasks = (type: typeof filter.value) => {
  filter.value = type;
};
</script>


<template>
  <div class="container">
    <h1 class="title">Task Tracker</h1>

    <TaskForm @add-task="addTask" />

    <div class="filter-buttons">
      <BaseButton
        label="All"
        :type="filter === 'all' ? 'primary' : 'success'"
        size="small"
        @click="filterTasks('all')"
      />
      <BaseButton
        label="Completed"
        :type="filter === 'completed' ? 'primary' : 'success'"
        size="small"
        @click="filterTasks('completed')"
      />
      <BaseButton
        label="Incomplete"
        :type="filter === 'incomplete' ? 'primary' : 'success'"
        size="small"
        @click="filterTasks('incomplete')"
      />
    </div>

    <TaskList
      :tasks="filteredTasks"
      @delete-task="deleteTask"
      @toggle-complete="toggleComplete"
      @update-task="updateTask"
    />
  </div>
</template>
