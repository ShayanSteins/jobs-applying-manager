<template>
  <div>
    <input 
      type="datetime-local" 
      pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" 
      :value="dateTime" 
      @input="$emit('input', $event.target.value)" />
  </div>
</template>

<script>
export default {
  name: 'DateTimeInput',
  data () {
    return {
      dateTime: ''
    }
  }
}
</script>

<style scoped>
</style>