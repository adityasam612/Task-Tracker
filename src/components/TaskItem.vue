<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';
import type { Task } from '../types/task';

interface Props {
  task: Task;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'toggle-completed', task: Task): void;
  (e: 'update-task', task: Task): void;
  (e: 'delete-task', task: Task): void;
}>();

const isEditing = ref(false);
const editTitle = ref(props.task.title);

const startEditing = () => {
  isEditing.value = true;
  editTitle.value = props.task.title;
};

const saveEdit = () => {
  if (editTitle.value.trim()) {
    emit('update-task', { ...props.task, title: editTitle.value.trim() });
    isEditing.value = false;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  editTitle.value = props.task.title;
};
</script>

<template>
  <li class="task-item">

    <div v-if="!isEditing" class="task-content">
      <div class="task-main">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="() => emit('toggle-completed', task)"
          class="task-checkbox"
        />
        <span :class="{ 'task-title': true, completed: task.completed }">
          {{ task.title }}
        </span>
      </div>
      <div class="task-actions">
        <BaseButton
          label="Edit"
          type="primary"
          size="small"
          @click="startEditing"
        />
        <BaseButton
          label="Delete"
          type="danger"
          size="small"
          @click="() => emit('delete-task', task)"
        />
      </div>
    </div>


    <div v-else class="task-edit">
      <input
        v-model="editTitle"
        class="edit-input"
        placeholder="Edit task title"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
        ref="editInput"
        autofocus
      />
      <div class="task-actions">
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
  </li>
</template>
