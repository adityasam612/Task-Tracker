import { defineStore } from 'pinia'

export interface Task {
  id: number
  title: string
  // other fields as needed
}

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    addTask(task: Task) {
      // Push the new task into the tasks array
      this.tasks.push(task)
    },
  },
})
