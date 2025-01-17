<script setup lang="ts">

interface ButtonProps {
  label: string;
  type?: 'primary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}


const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'medium',
  disabled: false
});


const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();


const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<template>
  <button
    :class="['btn', `btn-${type}`, `btn-${size}`]"
    :disabled="disabled"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>