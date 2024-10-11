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

<script setup>
import CheckboxInput from '../formComponents/CheckboxInput.vue'
import { computed } from 'vue'

const props = defineProps({ 'dateLine': Object })

const formatedDate = computed(() => {
  return new Date(props.dateLine.date).toLocaleString()
})
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