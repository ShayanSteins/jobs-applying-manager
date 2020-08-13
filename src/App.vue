<template>
  <div>
    <button>Nouveau</button>
    <PopIn></PopIn>
  </div>
</template>

<script>
import PopIn from './components/PopIn.vue'

export default {
  name: 'App',
  components: {
    PopIn
  }
}
</script>

<style>
body {
  font: 1.2em Helvetica, Arial, sans-serif;
  margin: 20px;
  padding: 0;
}
</style>