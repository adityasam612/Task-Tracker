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

const editingTask = ref<Task | null>(null);
const editTitle = ref('');

const startEditing = (task: Task) => {
  editingTask.value = task;
  editTitle.value = task.title;
};

const saveEdit = () => {
  if (editingTask.value && editTitle.value.trim()) {
    emit('update-task', {
      ...editingTask.value,
      title: editTitle.value
    });
    editingTask.value = null;
  }
};

const cancelEdit = () => {
  editingTask.value = null;
  editTitle.value = '';
};
</script>

<template>
  <div class="task-list">
    <transition-group name="task" tag="ul" class="task-transition-group">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle-completed="(task) => emit('toggle-complete', task.id)"
        @edit-task="startEditing"
        @delete-task="(task) => emit('delete-task', task.id)"
      />
    </transition-group>

    <div v-if="editingTask" class="edit-form">
      <input
        v-model="editTitle"
        class="edit-input"
        placeholder="Edit task title"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
      />
      <div class="edit-actions">
        <BaseButton
          label="Save"
          type="success"
          size="small"
          @click="saveEdit"
        />
        <BaseButton
          label="Cancel"
          type="danger"
          size="small"
          @click="cancelEdit"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
