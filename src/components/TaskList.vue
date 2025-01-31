<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';
import TaskItem from './TaskItem.vue';
import type { Task } from '../types/task';

interface Props {
  tasks: Task[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'toggle-complete', id: number): void;
  (e: 'delete-task', id: number): void;
  (e: 'update-task', task: Task): void;
}>();
</script>

<template>
  <div class="task-list">
    <transition-group name="task" tag="ul" class="task-transition-group">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle-completed="() => emit('toggle-complete', task.id)"
        @update-task="emit('update-task', $event)"
        @delete-task="() => emit('delete-task', task.id)"
      />
    </transition-group>
  </div>
</template>
