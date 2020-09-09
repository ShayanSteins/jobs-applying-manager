<template>
  <tr>
    <td>{{ piste.etat }}</td>
    <td @click="$emit('open-popin', piste)" class="linkCell">{{ piste.societe }}</td>
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
      // Vérification du format des dates
      this.piste.dates.forEach(d => {
        if(typeof d.date === "string") {
          d.date = new Date(d.date)
        }
      });
      
      let nextRdv = "Aucun rdv"
      if (undefined !== this.piste.dates && this.piste.dates.length > 0) {
        //Tri des dates par ordre croissant
        this.piste.dates.sort((a,b) => a.date - b.date)   

        // Récupère la première date supérieure à la date du jour  
        const newRdvList = this.piste.dates.filter(d => d.date > new Date())

        // Si il y a un rdv à venir
        if(newRdvList.length > 0){
          let dayOfWeek = new Intl.DateTimeFormat('fr-FR', {weekday: 'long'}).format(newRdvList[0].date)
          dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
          return dayOfWeek + " " + newRdvList[0].date.toLocaleString()
        }
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