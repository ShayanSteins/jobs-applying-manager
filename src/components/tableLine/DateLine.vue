<template>
  <tr>
    <td>{{ dateLine.type }}</td>
    <td>{{ formatedDate }}</td>
    <td>
      <CheckboxInput labelName="" v-model:checked="dateLine.answer" ></CheckboxInput>
    </td>
    <td>
      <button @click="$emit('remove', dateLine.id)" title="Remove">-</button>
    </td>
  </tr>
</template>

<script setup>
import CheckboxInput from '../formComponents/CheckboxInput.vue'
import { computed, ref } from 'vue'

defineEmits(['remove'])

const props = defineProps({ 'dateLine': Object })

// const answered = ref(props.dateLine.answer)

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