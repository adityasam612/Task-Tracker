<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import type { Task } from '../types/task';

const emit = defineEmits<{
  (e: 'add-task', task: Task): void;
}>();

const title = ref('');

const handleSubmit = () => {
  if (title.value.trimEnd()) {
    const newTask: Task = {
      id: Date.now(),
      title: title.value,
      completed: false,
    };
    emit('add-task', newTask);
    title.value = '';
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <input
      v-model="title"
      type="text"
      placeholder="Add your new task"
      required
      class="task-input"
    />
    <BaseButton
      label="Add Task"
      type="primary"
      :disabled="!title.trimEnd()"
    />
  </form>
</template>

<style scoped>

</style>
