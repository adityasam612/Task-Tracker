
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';



</script>

<template>
  <div class="app-container">
    <nav>
      <RouterLink to="/" class="nav-item">Home</RouterLink>
      <RouterLink to="/about" class="nav-item">About</RouterLink>
      <router-link to="/user" class="nav-item">User</router-link>
      <RouterLink to="/logout" class="nav-item">logout</RouterLink>

    </nav>
    <RouterView />
  </div>
</template>
