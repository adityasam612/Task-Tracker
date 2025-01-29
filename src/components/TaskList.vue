<script setup lang="ts">
import TaskItem from './TaskItem.vue';
import type { Task } from '../types/task';

interface Props {
  tasks: Task[];
}

defineProps<Props>();
const emit = defineEmits<{
  (e: 'update-task', task: Task): void;
  (e: 'delete-task', id: number): void;
  (e: 'toggle-task', id: number): void;
}>();
</script>

<template>
  <div class="task-list">
    <TransitionGroup name="list" tag="div">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @update-task="emit('update-task', $event)"
        @delete-task="emit('delete-task', $event)"
        @toggle-task="emit('toggle-task', $event)"
      />
    </TransitionGroup>
  </div>
</template>
