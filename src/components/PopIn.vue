<template>
  <div class="shadowBox" name="shadowBox" @click="(e) => { if (e.target.classList[0] === 'shadowBox') $emit('close') }">
    <div class="popin shadow" :id="opportunity.id">
      <h1 v-if="isNewItem">New opportunity</h1>
      <h1 v-else>Opportunity details</h1>
      <form @submit="checkForm">
        <div class="wholePiste">
          <div class="left">
            <TextInput inputType="text" labelName="Company" v-model="opportunity.company" isRequired></TextInput>
            <AvailableOptionsInput labelName="Technologies" v-model="opportunity.technologies" :dataList="listTechno">
            </AvailableOptionsInput>
            <TextInput inputType="url" labelName="Url" v-model="opportunity.url"></TextInput>
            <DatesManager :value="opportunity.dates" @change="updateDatesList"></DatesManager>
          </div>
          <div class="right">
            <TextInput inputType="text" labelName="State" isDisabled v-model="opportunity.state"></TextInput>
            <TextInput inputType="text" labelName="Contact" v-model="opportunity.contact"></TextInput>
            <TextInput inputType="text" labelName="Location" v-model="opportunity.location"></TextInput>
            <CheckboxInput v-if="!isNewItem" labelName="Closed" v-model:checked="opportunity.closed"></CheckboxInput>
          </div>
        </div>
        <div class="middle">
          <TextInput inputType="textarea" labelName="Notes" v-model="opportunity.notes"></TextInput>
        </div>
        <div class="histContainer" v-if="opportunity.history">
          <h2>History</h2>
          <div class="histSubContainer">
            <HistoryLine v-for="historyEntry in opportunity.history" :key="historyEntry.date.toString()"
              :historyEntry="historyEntry">
            </HistoryLine>
          </div>
        </div>
        <div class="buttonContainer">
          <button v-if="!isNewItem" @click="$emit('delete', opportunity)" class="deleteButton">Remove</button>
          <button v-if="isNewItem" type="submit">Save</button>
          <button v-else type="submit">Update</button>
          <button @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import DatesManager from './DatesManager.vue'
import TextInput from './formComponents/TextInput.vue'
import AvailableOptionsInput from './formComponents/AvailableOptionsInput.vue'
import CheckboxInput from './formComponents/CheckboxInput.vue'
import HistoryLine from './tableLine/HistoryLine.vue'
import { createUUID, deepComparison, deepCopy } from "../common.js"
import { ref, onMounted, toValue, toRaw } from 'vue';

const props = defineProps({
  isNewItem: {
    type: Boolean
  },
  listTechno: {
    type: Set
  },
  currentOpportunity: {
    type: Object,
    default: () => {
      return {
        id: createUUID(),
        state: "New",
        company: "",
        contact: "",
        location: "",
        technologies: "",
        url: "",
        notes: "",
        history: null,
        closed: false,
        dates: []
      }
    }
  }
})


const opportunity = ref(props.currentOpportunity)
const opportunityBeforeModification = deepCopy(opportunity.value)

const emit = defineEmits(['save', 'close', 'delete'])

onMounted(() => {
  // Prevent any submit action while pressing ENTER
  document.querySelectorAll('.popin input').forEach(input => {
    input.addEventListener('keypress', e => {
      if (e.keyCode === 13) e.preventDefault()
    })
  });
})

function updateDatesList(newDates) {
  opportunity.value.dates = newDates
}
function checkForm(e) {
  e.preventDefault();

  // History management 
  if (props.isNewItem) {
    opportunity.value.history = [{
      date: new Date().toISOString().split('T')[0] + 'T' + new Date().toLocaleTimeString(),
      modification: "Opportunity creation."
    }]
    emit('save', opportunity.value)
  }
  else {
    const differences = deepComparison(opportunity.value, opportunityBeforeModification)

    if (differences.length > 0) {
      opportunity.value.history.push({
        date: new Date().toISOString().split('T')[0] + 'T' + new Date().toLocaleTimeString(),
        modification: `Opportunity updated : ${differences}`
      })
      emit('save', opportunity.value)
    }
  }
  emit('close')
}
</script>

<style scoped>
.shadowBox {
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
  margin: 40px;
  background: var(--main-text-color);
  border: none;
  border-radius: 7px;
}

h1 {
  margin: 0;
  padding: 0.3em 0;
  font-size: 1.6em;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background-color: var(--main-violet);
}

.wholePiste {
  display: flex;
}

.wholePiste>div {
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

.left>div,
.right>div {
  margin: 5px 0;
}

h1 {
  text-align: center;
}

h2 {
  margin: 0 0 10px;
  color: var(--main-bg-color);
}

.histContainer,
.middle {
  padding: 10px;
}

.histSubContainer {
  padding: 5px;
  background-color: rgba(239, 239, 239, 0.3);
  border: 1px solid rgba(118, 118, 118, 0.3);
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