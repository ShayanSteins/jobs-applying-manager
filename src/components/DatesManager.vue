<template>
  <div>
    <div class="addDateContainer">
      <label>Ajouter un rdv :</label>
      <SelectInput v-model="newDateType"></SelectInput>
      <DateTimeInput v-model="newDateTime"></DateTimeInput>
      <button type="button" @click="addDate" title="Ajouter un rdv">+</button>
    </div>
    <div class="dateTableContainer">
      <table>
        <thead>
          <th>Type</th>
          <th>Date & heure</th>
          <th>Retour</th>
          <th></th>
        </thead>
        <tr v-if="!dates.length">
          <td colspan="4">Aucun rendez-vous programmé.</td>
        </tr>
        <DateLine v-for="date in dates" :key="date.date.toISOString()" :dateLine="date" @remove="removeDate"></DateLine>
      </table>
    </div>
  </div>
</template>

<script>
import SelectInput from "./formComponents/SelectInput.vue"
import DateTimeInput from "./formComponents/DateTimeInput.vue"
import DateLine from "./tableLine/DateLine.vue"
import {createUUID} from "../common.js"

export default {
  name: 'DatesManager',
  components: {
    SelectInput, DateTimeInput, DateLine
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      newDateType: '',
      newDateTime: '',
      dates: []
    }
  },
  mounted() {
    this.dates = this.value
  },
  watch: {
    dates: {
      handler: function () {       
        this.$emit('change', this.dates)
      },
      deep: true
    }
  },
  methods: {
    addDate() {
      if(this.newDateType !== null && this.newDateType !== '' && this.newDateTime !== null && this.newDateTime !== '') {
        this.dates.push({
          id: createUUID(),
          type: this.newDateType,
          date: new Date(this.newDateTime),
          retour: false
        })
        this.newDateTime = ''
        this.newDateType = ''
      }
    },
    removeDate (idToRemove) {
      this.dates = this.dates.filter(date => {
        return date.id !== idToRemove
      })
    }
  }
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
.addDateContainer > * {
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