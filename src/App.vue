
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import BaseButton from './components/BaseButton.vue';
import type { Task } from './types/task';

</script>

<template>
  <div class="app-container">
    <nav>
      <RouterLink to="/" class="nav-item">Home</RouterLink>
      <RouterLink to="/about" class="nav-item">About</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
