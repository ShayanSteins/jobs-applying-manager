<template>
  <div>
    <div class="addDateContainer">
      <label>Add a meeting :</label>
      <SelectInput v-model="newDateType"></SelectInput>
      <DateTimeInput v-model="newDateTime"></DateTimeInput>
      <button type="button" @click="addDate" title="Add a meeting">+</button>
    </div>
    <div class="dateTableContainer">
      <table>
        <thead>
          <th>Type</th>
          <th>Date & time</th>
          <th>Answer</th>
          <th></th>
        </thead>
        <tr v-if="!dates.length">
          <td colspan="4">No meeting planned.</td>
        </tr>
        <DateLine v-for="date in dates" :key="date.date.toISOString()" :dateLine="date" @remove="removeDate"></DateLine>
      </table>
    </div>
  </div>
</template>

<script setup>
import { generateUUID } from "../common.js"
import SelectInput from "./formComponents/SelectInput.vue"
import DateTimeInput from "./formComponents/DateTimeInput.vue"
import DateLine from "./tableLine/DateLine.vue"
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  value: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['change'])

const newDateTime = ref('')
const newDateType = ref('')
const dates = ref([])

onMounted(() => {
  dates.value = props.value
})

watch(dates, () => emit('change', dates))

function addDate() {
  if (newDateType.value !== null && newDateType.value !== '' && newDateTime.value !== null && newDateTime.value !== '') {
    dates.value.push({
      id: generateUUID(),
      type: newDateType.value,
      date: new Date(newDateTime.value),
      answer: false
    })
    newDateTime.value = ''
    newDateType.value = ''
  }
}
function removeDate(idToRemove) {
  dates.value = dates.value.filter(date => {
    return date.id !== idToRemove
  })
}
</script>

<style scoped>
.addDateContainer {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.dateTableContainer {
  margin-top: 7px;
}

.addDateContainer>* {
  margin-right: 10px;
}

button {
  padding: revert;
}

label,
td {
  color: var(--main-bg-color);
  font-size: 0.8em;
}

table {
  margin: 0;
  width: 100%;
}

th {
  font-size: 0.8em;
  padding: 2px;
  min-width: 7px;
  background-color: var(--main-lighter-bg-color);
  color: var(--main-text-color);
}
</style>