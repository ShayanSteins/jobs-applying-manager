<template>
  <div>
    <select v-model="selected">
      <option disabled value="">Choisissez...</option>
      <option v-for="(opt, index) in options" :key="index" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>

<script setup>

const selected = defineModel()

const options = [
  "Postulation",
  "Entretient RH",
  "Entretient Tech",
  "Autre entretient"
]
</script>

<style scoped>
select {
  height: 24px;
}
</style>