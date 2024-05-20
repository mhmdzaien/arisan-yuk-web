<template>
    <button type="button" :disabled="isLoading" @click="onClick">
        <div v-if="isLoading" class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only"></span>
        </div>
        <slot></slot>
    </button>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue';

const isLoading: Ref<boolean> = ref(false)

const emit = defineEmits<{
    (e: "click", toggleLoading: Function): void;
}>();

const toggleLoading = () => {
    isLoading.value = !isLoading.value;
};

const onClick = () => {
    emit("click", toggleLoading);
};
</script>