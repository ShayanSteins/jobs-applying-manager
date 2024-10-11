<template>
  <div>
    <select :value="value" @input="$emit('input', $event.target.value)">
      <option disabled value="">Choisissez...</option>
      <option v-for="(opt, index) in options" :key="index" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})

const options = ref([
  "Postulation",
  "Entretient RH",
  "Entretient Tech",
  "Autre entretient"
])
</script>

<style scoped>
select {
  height: 24px;
}
</style>