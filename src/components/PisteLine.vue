<template>
  <tr :data-idPiste="piste.id">
    <td>{{ piste.etat }}</td>
    <td @click="popInDisplayed = true" class="linkCell">{{ piste.societe }}</td>
    <td>{{ piste.localisation }}</td>
    <td>{{ getNextRdv }}</td>
    <td>{{ piste.interlocuteur }}</td>
  </tr>
</template>

<script>
export default {
  name: 'PisteLine',
  props: {
    piste: {
      type: Object
    }
  },
  computed: {
    getNextRdv () {
      const rdvList = this.piste.dates
      let nextRdv = "Aucun rdv"
      if (undefined !== rdvList && rdvList.length > 0) {
        const newRdvList = rdvList.sort((a,b) => b.date - a.date)      
        return "DATE" // Vérifier à partir de quelle date on est supérieur à la date du jour, et la récupérer
      }
      return nextRdv
    }
  },
  method () {

  }
}
</script>

<style scoped>
.linkCell {
  color: rgb(136 73 255);
}
.linkCell:hover {
  text-decoration: underline;
  filter: brightness(1.5);
  cursor: pointer;
}
</style>