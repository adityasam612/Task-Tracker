<template>
  <div class="logout-container">
    <div v-if="!isLoggedOut" class="logout-message">
      <p>Logging out...</p>
    </div>
    <div v-else class="logged-out-message">
      <h2>You have been successfully logged out</h2>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedOut = ref(false);

const performLogout = async () => {
  try {

  localStorage.removeItem('token');


    isLoggedOut.value = true;


    setTimeout(() => {
      router.replace('/login');
    }, 1000);

  } catch (error) {
    console.error('Logout error:', error);

    router.replace('/login');
  }
};

onMounted(() => {
  performLogout();
});
</script>
