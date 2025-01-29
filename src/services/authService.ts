// src/services/authService.ts

interface User {
  id: number;
  email: string;
  name?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // For demo purposes, using users endpoint
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${credentials.email}`);

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const users = await response.json();

      if (users.length === 0) {
        throw new Error('User not found');
      }

      // Simulate successful login
      const user = users[0];
      const token = `demo-token-${user.id}`;

      // Store auth data
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      return { user, token };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      // Simulate registration with JSONPlaceholder
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          // Don't send real password in demo
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const user = await response.json();
      const token = `demo-token-${user.id}`;

      // Store auth data
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      return { user, token };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Registration failed');
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};
