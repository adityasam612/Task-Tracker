
import { defineStore } from 'pinia';
import { ref } from 'vue';

type User = {
  id: string;

};

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null);

  const login = (user: User) => {
    currentUser.value = user;
  };

  const logout = () => {
    currentUser.value = null;
  };

  return { currentUser, login, logout };
});
