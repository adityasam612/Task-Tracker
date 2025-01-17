
<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';

interface Task {
  id: number;
  text: string;
  day: string;
  reminder: boolean;
}


const props = defineProps<{
  task: Task;
}>();


const emit = defineEmits<{
  (e: 'delete-task', id: number): void;
  (e: 'toggle-reminder', id: number): void;
}>();


const deleteTask = () => {
  emit('delete-task', props.task.id);
};

const toggleReminder = () => {
  emit('toggle-reminder', props.task.id);
};
</script>

<template>
  <div :class="['task', { reminder: task.reminder }]">
    <h3>
      {{ task.text }}
      <BaseButton
        label="Delete"
        type="danger"
        size="small"
        @click="deleteTask"
      />
    </h3>
    <p>{{ task.day }}</p>
    <BaseButton
      :label="task.reminder ? 'Remove Reminder' : 'Set Reminder'"
      type="primary"
      size="small"
      @click="toggleReminder"
    />
  </div>
</template>