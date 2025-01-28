<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from '../components/BaseButton.vue';
import { authService } from '../services/authService';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');
const isLoading = ref(false);

const isPasswordMatch = computed(() => {
  return password.value === confirmPassword.value;
});

const handleRegister = async () => {
  if (!isPasswordMatch.value) {
    error.value = 'Passwords do not match';
    return;
  }

  try {
    error.value = '';
    isLoading.value = true;

    await authService.register({
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    router.push('/');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Registration failed';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Register</h1>

      <form @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            class="form-input"
            placeholder="Enter your name"
          />
        </div>

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

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            class="form-input"
            placeholder="Confirm your password"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <BaseButton
          label="Register"
          type="primary"
          :disabled="isLoading || !isPasswordMatch"
        />

        <div class="auth-links">
          <router-link to="/login">Already have an account? Login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
