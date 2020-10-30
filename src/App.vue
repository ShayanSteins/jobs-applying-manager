<template>
  <div>
    <header class="shadow">
      <span>Jobs Applying Manager</span>
    </header>
    <main>
      <button @click="openPopin(true)">Nouveau</button>
      <button
        class="deleteButton"
        @click="removePiste"
        :disabled="deleteButtonDisabled === 0"
      >Supprimer</button>
      <transition name="fade">
        <PopIn
          v-if="popInDisplayed"
          :isNewItem="isNewItem"
          :pisteToModify="pisteToModify"
          @close="closePopin"
          @delete="removePiste"
          @check="checkedPiste"
          @save="savePiste"
          :listTechno="technologiesList"
        ></PopIn>
      </transition>
      <div class="boardContent">
        <table class="shadow">
          <thead>
            <th></th>
            <th>Etat</th>
            <th>Société</th>
            <th>Localisation</th>
            <th>Prochain rdv</th>
            <th>Interlocuteur</th>
          </thead>
          <tr v-if="!pistes.size">
            <td
              colspan="6"
            >Vous n'avez aucune piste pour le moment... Il est temps de parcourir les sites d'annonces</td>
          </tr>
          <PisteLine
            v-for="[id, piste] in pistes"
            :key="id"
            :piste="piste"
            @open-popin="openPopin"
            @check="checkedPiste"
          ></PisteLine>
        </table>
        <div class="notif">Notifications</div>
      </div>
    </main>
  </div>
</template>

<script>
import PopIn from './components/PopIn.vue'
import PisteLine from './components/tableLine/PisteLine.vue'
import { jsonDatas } from '../assets/data.js'

export default {
  name: 'App',
  components: {
    PopIn, PisteLine
  },
  data() {
    return {
      popInDisplayed: false,
      isNewItem: true,
      pisteToModify: undefined,
      idsToDelete: new Set(),
      pistes: new Map(),
      deleteButtonDisabled: 0
    }
  },
  computed: {
    technologiesList: function () {
      const list = new Set()
      for (const [key, val] of this.pistes) {
        for (const techno of val.technos.split(', ')) {
          list.add(techno)
        }
      }
      return list
    }
  },
  beforeMount() {
    const storage = localStorage.getItem('pistes')
    if (storage !== null && storage !== undefined) {
      try {
        this.pistes = new Map(JSON.parse(storage))
        this.calculateState()
      } catch (e) {
        localStorage.removeItem('pistes')
        console.error(e.message)
      }
    }
    else {
      jsonDatas.forEach(item => this.pistes.set(item.id, item))
      this.calculateState()
      this.saveAllPistes()
    }
  },
  methods: {
    openPopin(isNewItem, piste) {
      this.isNewItem = isNewItem
      if (!isNewItem) {
        this.pisteToModify = Object.assign({}, piste)
      }
      this.popInDisplayed = true
    },
    closePopin() {
      this.pisteToModify = undefined
      this.popInDisplayed = false
    },
    savePiste(pisteFromPopin) {
      // Ajout - MAJ d'une piste dans la liste
      if (!pisteFromPopin.hasOwnProperty('id')) {
        return
      }
      this.pistes.set(pisteFromPopin.id, pisteFromPopin)
      this.calculateState()
      this.closePopin()
      this.saveAllPistes()
      this._computedWatchers['technologiesList'].run() 
    },
    checkedPiste(data) {
      // Gestion des checkbox du tableau
      const [id, bool] = data
      if (bool)
        this.idsToDelete.add(id)
      else
        this.idsToDelete.delete(id)
      this.deleteButtonDisabled = this.idsToDelete.size
    },
    removePiste(p) {
      if (p !== undefined && !(p instanceof MouseEvent)) 
        this.idsToDelete = new Set([p.id])
      this.idsToDelete.forEach(id => this.pistes.delete(id))

      this.idsToDelete = new Set()
      this.closePopin()
      this.saveAllPistes()
      this.deleteButtonDisabled = this.idsToDelete.size
    },
    saveAllPistes() {
      // Mise à jour du localStorage
      const parsedPistes = JSON.stringify(Array.from(this.pistes))
      localStorage.setItem('pistes', parsedPistes)
    },
    calculateState() {
      // Gestion de l'état d'une piste (Nouvelle, Postulée, En attente, Fermée, ...)
      for (let [id, p] of this.pistes) {
        if (p.closed) {
          p.etat = 'Fermée'
        }
        else if (undefined !== p.dates && p.dates.length > 0) {
          // récupère la dernière date insérée
          let lastDate = p.dates[p.dates.length - 1]
          // Si c'est une date de postulation et qu'elle est inférieure à la date du jour : Etat = Postulée
          if (lastDate.type === 'Postulation' && new Date(lastDate.date) < new Date()) p.etat = 'Postulée'
          // Si la date d'entretient n'est pas encore passée
          else if (new Date(lastDate.date) > new Date()) p.etat = 'En attente d\'entretient'
          // Si la date d'entretient est passée et que l'on n'a pas eu de retour
          else if (new Date(lastDate.date) < new Date() && !lastDate.retour) p.etat = 'En attente de retour'  
          else p.etat = 'Terminée'
        }
      }
    }
  }
}
</script>

<style>
:root {
  --main-bg-color: rgb(43, 43, 43);
  --main-darker-bg-color: rgb(20, 20, 20);
  --main-lighter-bg-color: rgb(87, 87, 87);
  --main-text-color: rgb(248, 248, 248);
  --main-violet: rgb(76, 53, 147);
  --main-lighter-violet: rgb(175, 147, 235);
  --main-red: rgb(161, 27, 27);
  --shadow-element: 3px 5px 12px rgb(21 21 21 / 78%);
}
body {
  font: 1.2em Helvetica, Arial, sans-serif;
  color: var(--main-text-color);
  padding: 0;
  margin: 0;
  background-color: var(--main-bg-color);
}
header {
  width: 100%;
  padding: 0.5em 0;
  text-align: center;
  font-size: 2em;
  background-color: var(--main-violet);
}
main {
  padding: 20px;
}

button {
  font-size: 1em;
  background: var(--main-violet);
  color: var(--main-text-color);
  border: none;
  padding: 10px 15px;
}
button.deleteButton {
  background-color: var(--main-red);
}
button:hover {
  cursor: pointer;
  filter: brightness(1.2);
}
button:disabled {
  filter: opacity(0.5);
}
button:focus {
  outline: none;
}

.boardContent {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
table {
  margin: 20px 20px 0 0;
  border-collapse: collapse;
  flex-grow: 3;
  color: var(--main-bg-color);
}
tr:nth-child(even) {
  background-color: rgb(191 191 191);
}
tr:nth-child(odd) {
  background-color: rgb(217 217 217);
}
th {
  font-weight: lighter;
  height: 30px;
  background: var(--main-darker-bg-color);
  color: var(--main-lighter-violet);
}
th,
td {
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}

.notif {
  display: none;
  flex-grow: 1;
  border: 1px solid grey;
  border-radius: 10% 25%;
  text-align: center;
  background-color: #2d2a38;
}

.shadow {
  box-shadow: var(--shadow-element);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.wrapper {
  display: flex;
}
.wrapper > * {
  line-height: 1;
}

.genericInput {
  flex: 1 1 auto;
}

.genericInput:focus {
  border: 2px solid rgb(234, 166, 12);
  outline: auto 1px rgb(234, 166, 12);
}

.genericLabel {
  background: var(--main-lighter-bg-color);
  min-width: 115px;
}

.genericLabel,
.genericInput {
  margin: 0;
  padding: 10px;
}

@media screen and (max-width: 900px){
  
}
</style>