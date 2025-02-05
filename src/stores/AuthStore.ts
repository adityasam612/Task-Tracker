
import { defineStore } from 'pinia';

interface User {
  id: number;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null
  }),

  actions: {
    setUser(user: User | null) {
      this.user = user;
    },

    setToken(token: string | null) {
      this.token = token;
    },

    logout() {
      this.user = null;
      this.token = null;
    }
  },

  persist: true
});
