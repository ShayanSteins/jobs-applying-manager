<template>
  <div>
    <select :value="selected" @input="$emit('input', $event.target.value)">
      <option disabled value="">Choisissez...</option>
      <option v-for="(opt, index) in options" :key="index" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    selected: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      options: [
        "Postulation",
        "Entretient RH",
        "Entretient Tech",
        "Autre entretient"
      ]
    }
  }
}
</script>

<style scoped>
select {
  height: 24px;
}
</style>