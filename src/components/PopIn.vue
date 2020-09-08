<template>
  <div class="shadow">
    <div class="popin" :id="piste.id">
      <h1 v-if="newItem">Création de la piste</h1>
      <h1 v-else>Détails de la piste</h1>
      <div class="wholePiste">
        <div class="left">
          <TextInput inputType="text" labelName="Société" v-model="piste.societe"></TextInput>
          <TextInput inputType="text" labelName="Technologies" v-model="piste.technos"></TextInput>
          <TextInput inputType="url" labelName="Liens" v-model="piste.liens"></TextInput>
          <DatesManager v-model="piste.dates"></DatesManager>
        </div>
        <div class="right">
          <TextInput inputType="text" labelName="Etat" isDisabled v-model="piste.etat"></TextInput>
          <TextInput inputType="text" labelName="Interlocuteur" v-model="piste.interlocuteur"></TextInput>
          <TextInput inputType="text" labelName="Localisation" v-model="piste.localisation"></TextInput>
          <CheckboxInput v-if="newItem" labelName="Fermée" v-model="piste.closed"></CheckboxInput>
        </div>
      </div>
      <div class="middle">
        <TextInput inputType="textarea" labelName="Notes" v-model="piste.notes"></TextInput>
      </div>
      <div class="histContainer" v-if="piste.historique.length">
        <h2>Historique</h2>
        <div class="histSubContainer">
          <HistoriqueLine v-for="histo in piste.historique" :key="histo.date" :histo="histo"></HistoriqueLine>
        </div>
      </div>
      <div class="buttonContainer">
        <button v-if="newItem" @click="addPiste">Enregistrer</button>
        <button v-else @click="modifyPiste">Mettre à jour</button>
        <button @click="$emit('close')">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
import DatesManager from './DatesManager.vue'
import TextInput from './TextInput.vue'
import CheckboxInput from './CheckboxInput.vue'
import HistoriqueLine from './HistoriqueLine.vue'

export default {
  name: 'PopIn',
  components: {
    DatesManager, TextInput, CheckboxInput, HistoriqueLine
  },
  props: {
    newItem: {
      type: Boolean
    }
  },
  data() {
    return {
      pistes: [],
      piste: {
        id: "",
        etat: "",
        societe: "",
        interlocuteur: "",
        localisation: "",
        technos: "",
        liens: "",
        notes: "",
        historique: [],
        closed: "",
        dates: []
      }
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
      this.savePistes()
    }
    if (this.newItem)
      this.piste.etat = "Nouvelle"
  },
  methods: {
    addPiste() {
      this.piste.id = this.createUUID()
      this.piste.historique.push({
        date: new Date,
        modif: "Création de la piste " + this.piste.id
      })
      console.log(this.piste)
      this.pistes.push(this.piste)
      this.piste = {
        id: "",
        etat: "",
        societe: "",
        interlocuteur: "",
        localisation: "",
        technos: "",
        liens: "",
        notes: "",
        historique: [],
        closed: "",
        dates: []
      }
      this.savePistes()
      this.$emit('close')
    },
    modifyPiste() {
      //TODO
    },
    savePistes() {
      const parsedPistes = JSON.stringify(this.pistes)
      localStorage.setItem('pistes', parsedPistes)
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
.shadow {
  background: rgb(121 121 121 / 52%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1999;
  overflow: auto;
}
.popin {
  margin: 50px;
  background: #f8f8f8;
  border: none;
  border-radius: 7px;
  box-shadow: 10px 10px 10px 2px rgb(21 21 21 / 55%),
    0 2px 8px rgba(0, 0, 0, 0.33);
}
h1 {
  margin: 0;
  padding: 0.3em 0;
  font-size: 1.6em;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background-color: #552d6e;
}
.wholePiste {
  display: flex;
}
.wholePiste > div {
  display: flex;
  flex-flow: column wrap;
  padding: 10px;
}
.left {
  flex: 3 1 auto;
}
.right {
  flex: 1 1 auto;
}
.left > div, .right > div {
  margin: 5px 0;
}
.middle {
  width: calc();
}
h1 {
  text-align: center;
}
h2 {
  margin: 0 0 10px;
}
.histContainer,
.middle {
  padding: 10px;
}
.histSubContainer {
  border: 1px solid rgb(91, 91, 91, 1);
  padding: 5px;
  background-color: rgba(239, 239, 239, 0.3);
}
.buttonContainer {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
button {
  margin-left: 10px;
}

@media screen and (max-width: 900px) {
  .popin {
    margin: 25px;
  }
  .wholePiste {
    display: flex;
    flex-flow: column wrap;
  }
}
</style>