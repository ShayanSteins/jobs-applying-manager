<template>
  <div>
    <input type="datetime-local" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" :value="value"
      @input="$emit('input', $event.target.value)" />
  </div>
</template>

<script setup>
const props = defineProps({ 'value': String })
</script>

<style scoped></style>