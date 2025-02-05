const API_URL = 'https://jsonplaceholder.typicode.com';

interface User {
  id: number;
  email: string;
  name?: string;
}

interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export const apiService = {

  async login(credentials: LoginCredentials): Promise<User> {

    const response = await fetch(`${API_URL}/users?email=${credentials.email}`);
    const users = await response.json();

    if (users.length === 0) {
      throw new Error('User not found');
    }


    const user = users[0];
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'demo-token-' + user.id);

    return user;
  },

  async register(credentials: RegisterCredentials): Promise<User> {

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const user = await response.json();
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'demo-token-' + user.id);

    return user;
  },

  async getTasks(): Promise<Task[]> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await fetch(`${API_URL}/todos?userId=${user.id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    return response.json();
  },

  async createTask(title: string): Promise<Task> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await fetch(`${API_URL}/todos`, {
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
    const response = await fetch(`${API_URL}/todos/${task.id}`, {
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

  async deleteTask(taskId: number): Promise<void> {
    const response = await fetch(`${API_URL}/todos/${taskId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  logout(): void {
    localStorage.removeItem('token');

  },
};
