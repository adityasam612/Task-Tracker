<template>
  <form @submit.prevent="handleSubmit">
    <input 
      v-model="title" 
      type="text" 
      placeholder="Add a new task" 
      required 
    />
    <button type="submit">Add Task</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',  
    };
  },
  methods: {
    handleSubmit() {
      if (this.title.trim()) {
        const newTask = {
          id: Date.now(), 
          title: this.title,
          completed: false,  
        };
        this.$emit('add-task', newTask); 
        this.title = '';  
      }
    },
  },
};
</script>

<style>
form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
