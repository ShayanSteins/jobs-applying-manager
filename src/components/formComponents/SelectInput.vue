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
  "Application",
  "HR interview",
  "Tech interview",
  "Other interview"
]
</script>

<style scoped>
select {
  height: 24px;
}
</style>