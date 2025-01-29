
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="about-container">
    <h1 class="about-title">About My Day</h1>

    <div class="about-content">
      <p class="about-description">
        Achieve success with My Day, with personalized, intelligent suggestions
        to update your daily or weekly to-do list. With both a Microsoft To Do
        mobile and desktop app, it's easy to stay on top of your daily tasks.
      </p>

      <div class="features-list">
        <h2>Key Features:</h2>
        <ul>
          <li>Personalized task management</li>
          <li>Daily and weekly planning</li>
          <li>Smart suggestions</li>
          <li>Cross-platform compatibility</li>
        </ul>
      </div>
    </div>

    <BaseButton
      label="Back to Tasks"
      type="primary"
      @click="navigateToHome"
    />
  </div>
</template>
