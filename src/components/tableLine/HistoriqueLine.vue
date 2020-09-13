<template>
  <div class="container">
    <span class="date">{{ formatedDate }} :</span>
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
  },
  computed: {
    formatedDate: function () {
      return new Date(this.histo.date).toLocaleString()
    }
  }
}
</script>

<style scoped>
.container{
  color: var(--main-lighter-bg-color);
  font-size: 0.8em;
}
.date {
  font-weight: bold;
}
</style>