<script setup lang="ts">
import BaseButton from './BaseButton.vue';
import type { Task } from '../types/task';

interface Props {
  task: Task;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'toggle-completed', task: Task): void;
  (e: 'edit-task', task: Task): void;
  (e: 'delete-task', task: Task): void;
}>();
</script>

<template>
  <li class="task-item">
    <div class="task-content">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="() => emit('toggle-completed', task)"
        class="task-checkbox"
      />
      <span :class="{ completed: task.completed }" class="task-title">
        {{ task.title }}
      </span>
    </div>
    <div class="task-actions">
      <BaseButton
        label="Edit"
        type="success"
        size="small"
        @click="() => emit('edit-task', task)"
      />
      <BaseButton
        label="Delete"
        type="danger"
        size="small"
        @click="() => emit('delete-task', task)"
      />
    </div>
  </li>
</template>

<style scoped>

</style>
