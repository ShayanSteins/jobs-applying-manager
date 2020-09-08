<template>
  <tr>
    <td>{{ dateLine.type }}</td>
    <td>{{ formatedDate }}</td>
    <td>      
      <CheckboxInput labelName="" v-model="dateLine.retour"></CheckboxInput>
    </td>
    <td>
      <button @click="$emit('remove', dateLine.id)" title="Supprimer">-</button>
    </td>
  </tr>
</template>

<script>
import CheckboxInput from "./CheckboxInput.vue"

export default {
  name: 'DateLine',
  components: {
    CheckboxInput
  },
  props: {
    dateLine: {
      type: Object
    }
  },
  computed: {
    formatedDate: function () {
      return new Date(this.dateLine.date).toLocaleString()
    }
  }
}
</script>

<style scoped>
td {
  color: #575757;
  font-size: 0.8em;
  text-align: center;
  vertical-align: middle;
}
button {
  padding: revert;
}
</style>