<template>
  <div>
    <header class="shadow">
      <span>Jobs Applying Manager</span>
    </header>
    <main>
      <button @click="popInDisplayed = true, isNewItem = true">Nouveau</button>
      <button class="deleteButton" @click="removePiste" :disabled="{ disabled: idsToDelete.length === 0 }">Supprimer</button>
      <transition name="fade">
        <PopIn
          v-if="popInDisplayed"
          :isNewItem="isNewItem"
          :pisteToModify="pisteToModify"
          v-model="newPiste"
          @close="popInDisplayed = false, pisteToModify = undefined"
          @delete="removePiste"
          @check="checkedPiste"
          @save="savePiste"
          @update="updatePiste"
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
          <PisteLine v-for="[id, piste] in pistes" :key="id" :piste="piste" @open-popin="openPopin"></PisteLine>
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
      idsToDelete: [],
      pistes: new Map(),
      newPiste: {}
    }
  },
  beforeMount() {
    const storage = localStorage.getItem('pistes')
    if (storage !== null && storage !== undefined) {
      try {
        this.pistes = new Map(JSON.parse(storage))
      } catch (e) {
        localStorage.removeItem('pistes')
        console.error(e.message)
      }
    }
    else {
      jsonDatas.forEach(item => this.pistes.set(item.id, item))
      this.saveAllPistes()
    }
  },
  methods: {
    openPopin(piste) {
      this.isNewItem = false
      this.pisteToModify = piste
      this.popInDisplayed = true
    },
    savePiste(isNewOne, pisteFromPopin) {
      if (!pisteFromPopin.hasOwnProperty('id')) {
        return
      }

      this.pistes.set(pisteFromPopin.id, pisteFromPopin)

      this.newPiste = {}
      this.popInDisplayed = false
      this.saveAllPistes();
    },
    updatePiste(watchedPiste) {
      this.newPiste = watchedPiste
    },
    checkedPiste(id, bool) {
      console.log(`Before : ${this.idsToDelete}`)
      if (bool)
        this.idsToDelete.push(id)
      else
        this.idsToDelete.slice(id, 1)
      console.log(`After : ${this.idsToDelete}`)
    },
    removePiste(p) {
      if (p !== undefined)
        this.idsToDelete = [p.id]

      this.idsToDelete.forEach(id => this.pistes.delete(id))

      this.idsToDelete = []
      this.popInDisplayed = false
      this.saveAllPistes()
    },
    saveAllPistes() {
      const parsedPistes = JSON.stringify(Array.from(this.pistes))
      localStorage.setItem('pistes', parsedPistes)
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
  --shadow-element: 3px 5px 12px rgb(21, 21, 21 / 78%);
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
</style>