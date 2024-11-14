<template>
  <tr @click="(e) => { if (e.target.type !== 'checkbox') $emit('open-popin', true, opportunity) }"
    :class="{ closed: opportunity.closed }">
    <td>
      <CheckBoxInput labelName="" v-model:checked="opportunity.isSelected" />
    </td>
    <td>{{ opportunity.state }}</td>
    <td>{{ opportunity.company }}</td>
    <td>{{ opportunity.location }}</td>
    <td>{{ getNextRdv }}</td>
    <td>{{ opportunity.contact }}</td>
  </tr>
</template>

<script setup>
import CheckBoxInput from '../formComponents/CheckboxInput.vue'
import { computed, ref } from 'vue'

const props = defineProps({
  opportunity: {
    type: Object
  }
})

const currentOpportunity = ref(props.opportunity)

defineEmits(['open-popin', 'check'])

const getNextRdv = computed(() => {
  // Vérification du format des dates
  props.opportunity.dates.forEach(d => {
    if (typeof d.date === "string") {
      d.date = new Date(d.date)
    }
  })

  let nextRdv = "Aucun rdv"
  if (undefined !== props.opportunity.dates && props.opportunity.dates.length > 0) {
    //Tri des dates par ordre croissant
    props.opportunity.dates.sort((a, b) => a.date - b.date)

    // Récupère la première date supérieure à la date du jour  
    const newRdvList = props.opportunity.dates.filter(d => d.date > new Date())

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