import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null as { id: number } | null,
  }),
  actions: {
    login(userId: number) {
      this.currentUser = { id: userId };
      localStorage.setItem('userId', userId.toString());
    },
    logout() {
      this.currentUser = null;
      localStorage.removeItem('userId');
    },
  },
});
