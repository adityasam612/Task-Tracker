# Task-Tracker


Let me break this down into simple steps to integrate the JSONPlaceholder API into your Vue 3 Task Tracker project (using TypeScript and Composition API):

**1. First, Understand Your Project Structure:**
Looking at your GitHub repo, you have:
- `src/components/Tasks.vue` (main component)
- `src/composables/useTasks.ts` (data handling)
- You're currently using local mock data

**2. Create an API Helper File:**
Create `src/api/apiClient.ts` to handle API calls using native `fetch`:

```typescript
// Simple API caller using fetch
const baseURL = 'https://jsonplaceholder.typicode.com';

export const apiClient = {
  async get(endpoint: string) {
    const response = await fetch(`${baseURL}${endpoint}`);
    return response.json();
  },
  
  async post(endpoint: string, data: any) {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  async put(endpoint: string, data: any) {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  async delete(endpoint: string) {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'DELETE',
    });
    return response.json();
  }
};
```

**3. Modify useTasks Composable:**
Update `src/composables/useTasks.ts`:

```typescript
import { ref } from 'vue';
import { apiClient } from '../api/apiClient';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  // Add other fields as per JSONPlaceholder structure
}

export default function useTasks() {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      loading.value = true;
      tasks.value = await apiClient.get('/todos?_limit=5');
      error.value = null;
    } catch (err) {
      error.value = 'Failed to fetch tasks';
    } finally {
      loading.value = false;
    }
  };

  // Add new task
  const addTask = async (title: string) => {
    const newTask = {
      title,
      completed: false,
      userId: 1, // Required by JSONPlaceholder
    };
    
    try {
      const createdTask = await apiClient.post('/todos', newTask);
      tasks.value = [createdTask, ...tasks.value];
    } catch (err) {
      error.value = 'Failed to add task';
    }
  };

  // Delete task
  const deleteTask = async (id: number) => {
    try {
      await apiClient.delete(`/todos/${id}`);
      tasks.value = tasks.value.filter(task => task.id !== id);
    } catch (err) {
      error.value = 'Failed to delete task';
    }
  };

  // Toggle reminder (using completed as reminder)
  const toggleReminder = async (id: number) => {
    const task = tasks.value.find(task => task.id === id);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };
    
    try {
      await apiClient.put(`/todos/${id}`, updatedTask);
      tasks.value = tasks.value.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      );
    } catch (err) {
      error.value = 'Failed to update task';
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    deleteTask,
    toggleReminder,
  };
}
```

**4. Update Tasks Component:**
Modify `src/components/Tasks.vue`:

```vue
<script setup lang="ts">
import useTasks from '@/composables/useTasks';
import { onMounted } from 'vue';

const {
  tasks,
  loading,
  error,
  fetchTasks,
  addTask,
  deleteTask,
  toggleReminder
} = useTasks();

// Fetch tasks when component mounts
onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <!-- Keep your existing template but update variable names if needed -->
  <!-- Example: -->
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <!-- Your task list rendering -->
  </div>
</template>
```

**5. Important Notes About JSONPlaceholder:**

1. **No Authentication Needed:** This API doesn't require authentication (that's why it's undefined). For real APIs:
   ```typescript
   // Example of adding auth headers:
   headers: {
     'Authorization': `Bearer ${yourToken}`,
     'Content-Type': 'application/json'
   }
   ```

2. **Data Persistence:** Changes won't persist because it's a fake API. Your POST/PUT requests will return mock responses but won't actually modify the server data.

3. **Data Structure:** The API uses `completed` instead of `reminder`. We're using `completed` as our reminder status.

**6. Step-by-Step Explanation:**

1. **Create API Client:**
   - We created a reusable `apiClient` to handle all HTTP methods
   - Uses native `fetch` instead of Axios
   - Sets base URL and common headers

2. **Modified useTasks:**
   - Replaced local data with API calls
   - Added loading and error states
   - Each operation (add/delete/update) now makes API calls
   - Automatically updates local state after API calls

3. **Component Updates:**
   - Added `onMounted` hook to fetch initial data
   - Added loading/error states display
   - Kept existing template structure but uses API data

**7. Testing Your Implementation:**

1. Run your project:
   ```bash
   npm run dev
   ```

2. You should see 5 tasks loaded from the API
3. Test adding/deleting tasks (remember - changes won't persist)

**8. Error Handling Basics:**

We've added simple error handling. To improve it:
```typescript
// In apiClient.ts
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Then modify each method:
async get(endpoint: string) {
  const response = await fetch(`${baseURL}${endpoint}`);
  return handleResponse(response);
}
```

**9. Final Project Structure:**
```
src/
├─ api/
│  └─ apiClient.ts
├─ composables/
│  └─ useTasks.ts
├─ components/
│  └─ Tasks.vue
```

This structure keeps your code organized and makes future API changes easier. Remember to handle loading states and errors appropriately in your UI!