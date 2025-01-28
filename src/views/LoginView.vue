<script setup lang ="ts">
import {ref} from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from '../components/BaseButton.vue';
import { authService } from '../services/authService';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  try {
    error.value = '';
    isLoading.value = true;

    await authService.login({
      email: email.value,
      password: password.value,
    });

    router.push('/');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Login failed';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Login</h1>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="form-input"
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="form-input"
            placeholder="Enter your password"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <BaseButton
          label="Login"
          type="primary"
          :disabled="isLoading"
        />

        <div class="auth-links">
          <router-link to="/register">Don't have an account? Register</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
