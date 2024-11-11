<template>
  <div class="container">
    <span class="date">{{ formatedDate }} : </span>
    <span class="modification">{{ historyEntry.modification }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ 'historyEntry': Object })

const formatedDate = computed(() => new Date(props.historyEntry.date).toLocaleString())

</script>

<style scoped>
.container {
  color: var(--main-lighter-bg-color);
  font-size: 0.8em;
}

.date {
  font-weight: bold;
}
</style>