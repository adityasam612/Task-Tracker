<template>
  <div class="task-list">
    <transition-group name="task" tag="ul" class="task-transition-group">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <label class="task-label">
          <input 
            type="checkbox" 
            :checked="task.completed" 
            @change="toggleTaskCompletion(task.id)" 
            class="task-checkbox"
          />
          <span :class="{ completed: task.completed }" class="task-title">
            {{ task.title }}
          </span>
        </label>
        <div class="task-actions">
          <button @click="startEditing(task)" class="action-btn edit-btn">
            Edit
          </button>
          <button @click="deleteTask(task.id)" class="action-btn delete-btn">
            Delete
          </button>
        </div>
      </li>
    </transition-group>

    <div v-if="editingTask" class="edit-form">
      <transition-group name="task"  class="task-transition-group">
      <input 
        v-model="editingTask.title" 
        class="edit-input" 
        placeholder="Edit task title"
      />
      <div class="edit-actions">
        <button @click="saveEdit" class="action-btn save-btn">Save</button>
        <button @click="cancelEdit" class="action-btn cancel-btn">Cancel</button>
      </div>
    </transition-group>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  
  setup(props, { emit }) {
    const editingTask = ref(null);

    const toggleTaskCompletion = (taskId) => {
      emit('toggle-complete', taskId);
    };

    const deleteTask = (id) => {
      emit('delete-task', id);
    };

    const startEditing = (task) => {
      editingTask.value = { ...task };
    };

    const saveEdit = () => {
      if (editingTask.value) {
        emit('update-task', editingTask.value);
        editingTask.value = null;
      }
    };

    const cancelEdit = () => {
      editingTask.value = null;
    };

    return {
      editingTask,
      toggleTaskCompletion,
      deleteTask,
      startEditing,
      saveEdit,
      cancelEdit,
    };
  },
};
</script>

<style scoped>
.task-title.completed {
  text-decoration: line-through;
  color: #888;
  padding :0px;
}

.task-list {
  margin: 20px 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.task-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.task-checkbox {
  cursor: pointer;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 5px;
  border: none;
  border-radius: 5px;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.edit-form {
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
}

.edit-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.task-transition-group {
  list-style: none;
  margin: 0;
  padding: 0;
}

.task-enter-active, .task-leave-active {
  transition: all 0.3s ease;
}

.task-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.task-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.task-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.task-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
