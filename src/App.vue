<template>
  <div class="container">
    <h1 class="title">Task Tracker</h1>
    
    <TaskForm @add-task="addTask" />
    
    <div class="filter-buttons">
      <button 
        @click="filterTasks('all')"
        :class="{ active: filter === 'all' }"
      >
        All
      </button>
      <button 
        @click="filterTasks('completed')"
        :class="{ active: filter === 'completed' }"
      >
        Completed
      </button>
      <button 
        @click="filterTasks('incomplete')"
        :class="{ active: filter === 'incomplete' }"
      >
        Incomplete
      </button>
    </div>

    <TaskList 
      :tasks="filteredTasks" 
      @delete-task="deleteTask" 
      @toggle-complete="toggleComplete"
      @update-task="updateTask"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';

export default {
  components: { TaskForm, TaskList },
  
  setup() {
    const tasks = ref([]);
    const filter = ref('all');

    // Load tasks from localStorage
    onMounted(() => {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        tasks.value = JSON.parse(savedTasks);
      }
    });

    // Filter tasks based on completion status
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

    // Add new task
    const addTask = (task) => {
      tasks.value.push({
        ...task,
        completed: false,
        id: Date.now()
      });
      saveTasks();
    };

    // Delete task
    const deleteTask = (id) => {
      tasks.value = tasks.value.filter(task => task.id !== id);
      saveTasks();
    };

    // Toggle task completion
    const toggleComplete = (taskId) => {
      const task = tasks.value.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
        saveTasks();
      }
    };

    // Update task
    const updateTask = (updatedTask) => {
      const index = tasks.value.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        tasks.value[index] = updatedTask;
        saveTasks();
      }
    };

    // Set filter type
    const filterTasks = (type) => {
      filter.value = type;
    };

    return {
      filter,
      filteredTasks,
      addTask,
      deleteTask,
      toggleComplete,
      updateTask,
      filterTasks,
    };
  },
};
</script>

<style scoped>

.title {
  background-color: #f4f4f4; 
  border-radius: 5px;
}

 
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.filter-buttons {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.filter-buttons button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
}

.filter-buttons button.active {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}
</style>
