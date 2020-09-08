<template>
  <div>
    <div class="addDateContainer">
      <label>Ajouter un rdv :</label>
      <SelectInput v-model="newDateType"></SelectInput>
      <DateTimeInput v-model="newDateTime"></DateTimeInput>
      <button @click="addDate" title="Ajouter">+</button>
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
        <DateLine v-for="date in dates" :key="date.date" :dateLine="date" @remove="removeDate"></DateLine>
      </table>
    </div>
  </div>
</template>

<script>
import SelectInput from "./SelectInput.vue"
import DateTimeInput from "./DateTimeInput.vue"
import DateLine from "./DateLine.vue"
// import createUUID from "../common.js"

export default {
  name: 'DatesManager',
  components: {
    SelectInput, DateTimeInput, DateLine
  },
  data() {
    return {
      newDateType: '',
      newDateTime: '',
      dates: []
    }
  },
  methods: {
    addDate() {
      this.dates.push({
        id: this.createUUID(),
        type: this.newDateType,
        date: this.newDateTime,
        retour: false
      })
      this.newDateTime = ''
      this.newDateType = ''
    },
    removeDate (idToRemove) {
      this.dates = this.dates.filter(date => {
        return date.id !== idToRemove
      })
    },
    createUUID() {
      // http://www.ietf.org/rfc/rfc4122.txt
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = '-'

      var uuid = s.join('')
      return 'Id' + uuid
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
  color: #575757;
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
}
</style>