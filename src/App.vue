<template>
  <div>
    <header>
      <span>Jobs Applying Manager</span>
    </header>
    <main>
      <button @click="popInDisplayed = true">Nouveau</button>
      <transition name="fade">
        <PopIn
          v-if="popInDisplayed"
          :isNewItem="isNewItem"
          :pisteToModify="pisteToModify"
          v-model="newPiste"
          @close="popInDisplayed = false"
          @save="savePiste"
          @update="updatePiste"
        ></PopIn>
      </transition>
      <div class="boardContent">
        <table>
          <thead>
            <th>Etat</th>
            <th>Société</th>
            <th>Localisation</th>
            <th>Prochain rdv</th>
            <th>Interlocuteur</th>
          </thead>
          <tr v-if="!pistes.length">
            <td
              colspan="5"
            >Vous n'avez aucune piste pour le moment... Il est temps de parcourir les sites d'annonces</td>
          </tr>
          <PisteLine v-for="piste in pistes" :key="piste.id" :piste="piste" @open-popin="openPopin"></PisteLine>
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
      pisteToModify: {},
      pistes: [],
      newPiste: {}
    }
  },
  mounted() {
    if (localStorage.getItem('pistes')) {
      try {
        this.pistes = JSON.parse(localStorage.getItem('pistes'))
      } catch (e) {
        localStorage.removeItem('pistes')
      }
    }
    else {
      this.pistes = jsonDatas
      this.saveAllPistes()
    }
  },
  methods: {
    getPisteById(id) {
      return this.pistes.find(piste => piste.id === id)
    },
    openPopin(piste) {
      this.isNewItem = false
      this.pisteToModify = piste
      this.popInDisplayed = true
    },
    savePiste(isNewOne) {
      if (!this.newPiste.hasOwnProperty('id')) {
        return
      }

      if (isNewOne) {
        this.pistes.push(this.newPiste)
      }
      else {
        const idx = this.pistes.find(p => p.id === this.newPiste.id)
        if (idx !== undefined) {
          this.pistes[idx] = this.newPiste
        }
      }

      this.newPiste = {}
      this.popInDisplayed = false
      this.saveAllPistes();
    },
    updatePiste(watchedPiste) {
      this.newPiste = watchedPiste
    },
    removePiste(p) {
      this.pistes.splice(p, 1)
      this.saveAllPistes()
    },
    saveAllPistes() {
      const parsedPistes = JSON.stringify(this.pistes)
      localStorage.setItem('pistes', parsedPistes)
    }
  }
}
</script>

<style>
body {
  font: 1.2em Helvetica, Arial, sans-serif;
  color: #f8f8f8;
  padding: 0;
  margin: 0;
  background-color: #2b2b2b;
}
header {
  width: 100%;
  padding: 0.5em 0;
  text-align: center;
  font-size: 2em;
  background-color: #4c3593;
  box-shadow: 0px 5px 10px rgb(21 21 21 / 78%);
}
main {
  padding: 20px;
}
button {
  font-size: 1em;
  background: rgb(39 140 84);
  color: #f8f8f8;
  border: none;
  padding: 10px 15px;
}
button:hover {
  cursor: pointer;
  filter: brightness(1.2);
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
}
table,
td {
  border: 1px solid #636363;
}
th {
  height: 30px;
  background: #636363;
  border-right: 1px solid#f8f8f8;
}
th:last-of-type {
  border-right: none;
}
th,
td {
  padding: 10px;
}
.notif {
  display: none;
  flex-grow: 1;
  border: 1px solid grey;
  border-radius: 10% 25%;
  text-align: center;
  background-color: #2d2a38;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>