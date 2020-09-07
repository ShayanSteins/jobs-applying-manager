<template>
  <div class="container">
    <span class="date">{{ histo.date }} :</span>
    <span class="modif">{{ histo.modif }}</span>
  </div>
</template>

<script>

export default {
  name: 'HistoriqueLine',
  props: {
    histo: {
      type: Object
    }
  }
}
</script>

<style scoped>
.container{
  color: #828181;
  font-size: 0.9em;
}
.date {
  font-weight: bold;
}
</style>