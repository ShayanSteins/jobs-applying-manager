<template>
  <div class="wrapper">
    <label :for="inputName" class="genericLabel">{{ labelName }}</label>
    <input type="texte" 
      :id="inputName" 
      class="genericInput" 
      autocomplete="false" 
      :name="inputName" 
      v-model="selectedTechnologies"
      @focus="displayDataList" 
      @blur="hideDataList" />
    <datalist id="availableTechnologies">
      <option v-for="(opt, index) in dataList" :key="index" @click="addTechno" tabindex="-1">{{ opt }}</option>
    </datalist>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  labelName: String,
  dataList: {
    type: Set
  }
})

const inputName = ref(props.labelName.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))

const selectedTechnologies = defineModel()

function displayDataList(event) {
  // Affichage des sugestions de technologies 
  const datalist = document.getElementById('availableTechnologies')
  datalist.style.display = 'block'
  datalist.style.width = event.target.offsetWidth + 'px'
  datalist.style.left = event.target.offsetLeft + 'px'
  datalist.style.top = event.target.offsetTop + event.target.offsetHeight + 'px'
}

function hideDataList(event) {
  // Masquage des sugestions de technologies 
  if (event.relatedTarget === null || event.relatedTarget.tagName !== 'OPTION')
    document.getElementById('availableTechnologies').style.display = 'none'
}

function addTechno(event) {
  // Ajout de la technologie sélectionnée
  const input = document.getElementById(inputName.value)
  if (input.value === '') {
    input.value = event.target.value
  } else {
    input.value += ', ' + event.target.value
  }
  document.getElementById('availableTechnologies').style.display = 'none'
  input.dispatchEvent(new InputEvent('input'))
}
</script>

<style scoped>
datalist {
  position: absolute;
  background-color: var(--main-text-color);
  font-family: sans-serif;
  font-size: 0.8rem;
  box-shadow: 3px 7px 9px rgb(21 21 21 / 78%);
  display: none;
}

option {
  color: var(--main-bg-color);
  padding: 4px;
  margin-bottom: 1px;
  cursor: pointer;
}

option:hover {
  background-color: var(--main-lighter-violet);
}
</style>