# Task-Tracker

Let me help you integrate the JSONPlaceholder API into your Task Tracker project in a beginner-friendly way. We'll use the native `fetch` API (no axios) and TypeScript.

**Step 1: Understand the API Structure**
The provided API (https://jsonplaceholder.typicode.com/guide/) offers fake endpoints for:
- GET /posts (Get all posts)
- POST /posts (Create new post)
- PUT /posts/:id (Update post)
- DELETE /posts/:id (Delete post)

**Note:** This API doesn't require authentication, so we don't need to handle auth headers. All changes are fake and won't persist on the server.

**Step 2: Create an API Service File**
Create a new file `src/services/api.ts` for all API operations:

```typescript
// Define interface for Task structure (modify according to your needs)
export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId?: number;
}

const API_URL = 'https://jsonplaceholder.typicode.com/todos'; // Using todos endpoint for task tracking

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

// Create new task
export const addTask = async (task: Omit<Task, 'id'>): Promise<Task | null> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to add task');
    return await response.json();
  } catch (error) {
    console.error('Error adding task:', error);
    return null;
  }
};

// Update existing task
export const updateTask = async (task: Task): Promise<Task | null> => {
  try {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return await response.json();
  } catch (error) {
    console.error('Error updating task:', error);
    return null;
  }
};

// Delete task
export const deleteTask = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};
```

**Step 3: Modify Your Components to Use API**
Example for fetching tasks in your component:

```typescript
import { getTasks } from '../services/api';

// In your component (e.g., TaskList.tsx)
const fetchTasks = async () => {
  const tasks = await getTasks();
  // Update your state with these tasks
  setTasks(tasks);
};

// Call on component mount
useEffect(() => {
  fetchTasks();
}, []);
```

**Step 4: Handle Task Creation**
Example for adding a task:

```typescript
import { addTask } from '../services/api';

const handleSubmit = async (taskData: { title: string }) => {
  const newTask = await addTask({
    title: taskData.title,
    completed: false,
    userId: 1, // Default user ID
  });
  
  if (newTask) {
    // Add to local state or refresh list
    setTasks([...tasks, newTask]);
  }
};
```

**Step 5: Handle Updates & Deletes**
For updating a task:

```typescript
import { updateTask } from '../services/api';

const toggleReminder = async (id: number) => {
  const taskToUpdate = tasks.find(task => task.id === id);
  if (taskToUpdate) {
    const updatedTask = await updateTask({
      ...taskToUpdate,
      completed: !taskToUpdate.completed,
    });
    if (updatedTask) {
      // Update local state
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    }
  }
};
```

For deleting a task:

```typescript
import { deleteTask } from '../services/api';

const handleDelete = async (id: number) => {
  const success = await deleteTask(id);
  if (success) {
    // Remove from local state
    setTasks(tasks.filter(task => task.id !== id));
  }
};
```

**Important Notes:**
1. **Mock Data:** This API doesn't actually save your data. It will always return fake responses.
2. **Type Safety:** We defined a `Task` interface to match the API response structure
3. **Error Handling:** Each function has basic error handling using try/catch
4. **No Authentication Needed:** This API doesn't require any authentication headers

**If You Need to Add Authentication Later:**
For APIs requiring authentication, you would typically:
1. Add an authorization header
2. Include a token (usually JWT)

Example modification for authenticated APIs:

```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${yourAuthToken}`
},
```

**Testing Your Implementation:**
1. Check network tab in browser devtools to see API calls
2. Use console.log statements to verify responses
3. Handle loading states and error messages in your UI

**Troubleshooting Common Issues:**
- CORS errors: Ensure the API supports browser requests
- Network errors: Check internet connection
- 404 errors: Verify endpoint URLs
- Type errors: Ensure your interfaces match the API response format

This implementation provides a clean separation between your UI components and API logic. Remember that with JSONPlaceholder, all changes are simulated - you won't see persistent changes across page reloads.