<template>
  <tr @click="(e) => { if (e.target.type !== 'checkbox') $emit('open-popin', true, piste) }"
    :class="{ closed: piste.closed }">
    <td>
      <CheckBoxInput labelName v-model="dataChecked" @change="$emit('check', [piste.id, $event])" />
    </td>
    <td>{{ piste.etat }}</td>
    <td>{{ piste.societe }}</td>
    <td>{{ piste.localisation }}</td>
    <td>{{ getNextRdv }}</td>
    <td>{{ piste.interlocuteur }}</td>
  </tr>
</template>

<script setup>
import CheckBoxInput from '../formComponents/CheckboxInput.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  piste: {
    type: Object
  },
  checked: {
    type: Boolean,
    default: false
  }
})

const dataChecked = ref(props.checked)

defineEmits(['open-popin', 'check'])

const getNextRdv = computed(() => {
  // Vérification du format des dates
  props.piste.dates.forEach(d => {
    if (typeof d.date === "string") {
      d.date = new Date(d.date)
    }
  })

  let nextRdv = "Aucun rdv"
  if (undefined !== props.piste.dates && props.piste.dates.length > 0) {
    //Tri des dates par ordre croissant
    props.piste.dates.sort((a, b) => a.date - b.date)

    // Récupère la première date supérieure à la date du jour  
    const newRdvList = props.piste.dates.filter(d => d.date > new Date())

    // Si il y a un rdv à venir
    if (newRdvList.length > 0) {
      let dayOfWeek = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(newRdvList[0].date)
      dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
      return dayOfWeek + " " + newRdvList[0].date.toLocaleString()
    }
  }
  return nextRdv
})
</script>

<style scoped>
:hover {
  text-decoration: underline;
  cursor: pointer;
  background-color: var(--main-lighter-violet);
  color: var(--main-darker-bg-color);
}

.closed {
  text-decoration: line-through;
  background-color: var(--main-lighter-bg-color);
}
</style>