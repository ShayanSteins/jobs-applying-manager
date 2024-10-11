<template>
  <div class="container">
    <span class="date">{{ formatedDate }} :</span>
    <span class="modif">{{ histo.modif }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ 'histo': Object })

const formatedDate = computed(() => new Date(props.histo.date).toLocaleString())

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