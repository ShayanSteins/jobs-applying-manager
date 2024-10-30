<template>
  <div>
    <input type="datetime-local" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" v-model="dateTime" />
  </div>
</template>

<script setup>
const dateTime = defineModel()
</script>
