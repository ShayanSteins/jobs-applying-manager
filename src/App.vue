<template>
  <div>
    <header>
      <span>Jobs Applying Manager</span>
    </header>
    <main>
      <button @click="popInDisplayed = true">Nouveau</button>
      <transition name="fade">
        <PopIn v-if="popInDisplayed" @close="popInDisplayed = false" :newItem="newItem"></PopIn>
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
          <ArrayLine v-for="piste in pistes" :key="piste.id" :piste="piste"></ArrayLine>
        </table>
        <div class="notif">Notifications</div>
      </div>
    </main>
  </div>
</template>

<script>
import PopIn from './components/PopIn.vue'
import ArrayLine from './components/ArrayLine.vue'
import { jsonDatas } from '../assets/data.js'

export default {
  name: 'App',
  components: {
    PopIn, ArrayLine
  },
  data () {
    return {
      popInDisplayed: false,
      newItem: true,
      pistes: [],
      newPiste: {}
    }
  },
  mounted () {
    if(localStorage.getItem('pistes')) {
      try {
        this.pistes = JSON.parse(localStorage.getItem('pistes'))
      } catch (e) {
        localStorage.removeItem('pistes')        
      }      
    }
    else {
      this.pistes = jsonDatas
      this.savePistes()
    }
  },
  // watch: {
  //   pites(arr) {
  //     localStorage.pisteCollection = arr;
  //   }
  // },
  methods: {
    getPisteById(id) {
      return this.pistes.find(piste => piste.id === id)
    },
    addPiste() {
      if(!this.newPiste.hasOwnProperty('id')) {
        return
      }
      this.pites.push(this.newPiste)
      this.newPiste = {}
      this.savePistes();
    },
    removePiste(p) {
      this.pistes.splice(p, 1)
      this.savePistes()
    },
    savePistes() {
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
th,
td {
  border: 1px solid black;
}
th {
  height: 30px;
  background: #636363;
}
th,
td {
  padding: 10px;
}
.notif {
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