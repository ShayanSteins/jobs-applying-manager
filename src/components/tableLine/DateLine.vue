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
import CheckboxInput from "../formComponents/CheckboxInput.vue"

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
  font-size: 0.8em;
  color: var(--main-bg-color);
}
button {
  padding: revert;
}
</style>