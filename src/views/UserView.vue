<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';
import BaseButton from '../components/BaseButton.vue';
import type { Task } from '../types/task';


const router = useRouter();


const navigateTouser = () => {
  router.push('/');
};


const tasks = ref<Task[]>([]);
const filter = ref<'all' | 'completed' | 'incomplete'>('all');


onMounted(() => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
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


</script>

<template>
  <div class="container">
    <div class="header">
      <h1 class="title">User Tasks Overview</h1>

    </div>



    <TaskList
      :tasks="tasks"
      @delete-task="deleteTask"
      @toggle-complete="toggleComplete"
      @update-task="updateTask"
    />
  </div>
</template>

