<template>
  <tr @click="(e) => { if(e.target.type !== 'checkbox') $emit('open-popin', piste) }">
    <td>
      <CheckBoxInput labelName v-model="checked" @change="$emit('check', [piste.id, checked])"></CheckBoxInput>
    </td>
    <td>{{ piste.etat }}</td>
    <td>{{ piste.societe }}</td>
    <td>{{ piste.localisation }}</td>
    <td>{{ getNextRdv }}</td>
    <td>{{ piste.interlocuteur }}</td>
  </tr>
</template>

<script>
import CheckBoxInput from "../formComponents/CheckboxInput.vue"

export default {
  name: 'PisteLine',
  components: {
    CheckBoxInput
  },
  model: {
    prop: 'checked',
    event: 'check'
  },
  props: {
    piste: {
      type: Object
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getNextRdv() {
      // Vérification du format des dates
      this.piste.dates.forEach(d => {
        if (typeof d.date === "string") {
          d.date = new Date(d.date)
        }
      })

      let nextRdv = "Aucun rdv"
      if (undefined !== this.piste.dates && this.piste.dates.length > 0) {
        //Tri des dates par ordre croissant
        this.piste.dates.sort((a, b) => a.date - b.date)

        // Récupère la première date supérieure à la date du jour  
        const newRdvList = this.piste.dates.filter(d => d.date > new Date())

        // Si il y a un rdv à venir
        if (newRdvList.length > 0) {
          let dayOfWeek = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(newRdvList[0].date)
          dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
          return dayOfWeek + " " + newRdvList[0].date.toLocaleString()
        }
      }
      return nextRdv
    }
  }
}
</script>

<style scoped>
:hover {
  text-decoration: underline;
  cursor: pointer;
  background-color: var(--main-lighter-violet);
  color: var(--main-darker-bg-color);
}
</style>