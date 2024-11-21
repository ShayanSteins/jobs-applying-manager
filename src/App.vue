<template>
  <div>
    <header class="shadow">
      <span>Jobs Applying Manager</span>
    </header>
    <main>
      <div class="action-panel">
        <button @click="openPopin(false)">New</button>
        <button class="deleteButton" @click="removeSelection" :disabled="deleteButtonDisabled">
          Remove
        </button>
        <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
      </div>
      <transition name="fade">
        <PopIn v-if="popInDisplayed" :isNewItem="isNewItem" :currentOpportunity="currentOpportunity" @close="closePopin"
          @delete="removeSelection" @save="savePiste" @close-opportunity="closeOpportunity"
          :listTechno="technologiesList"></PopIn>
      </transition>
      <div class="boardContent">
        <table class="shadow">
          <thead>
            <th></th>
            <th>State</th>
            <th>Company</th>
            <th>Location</th>
            <th>Next step</th>
            <th>Contact</th>
          </thead>
          <tr v-if="!opportunities.size">
            <td colspan="6">
              You don't have any job opportunity yet...
            </td>
          </tr>
          <PisteLine v-for="[id, opportunity] in opportunities" :key="id" :opportunity="opportunity"
            @open-popin="openPopin"></PisteLine>
        </table>
        <div class="notif">Notifications</div>
      </div>
    </main>
  </div>
</template>

<script setup>
import PopIn from './components/PopIn.vue'
import PisteLine from './components/tableLine/PisteLine.vue'
import { deepCopy } from './common.js'
import { computed, ref, onBeforeMount, watchEffect } from 'vue';

const popInDisplayed = ref(false)
const isNewItem = ref(true)
const currentOpportunity = ref(undefined)
const idsToDelete = ref(new Set())
const opportunities = ref(new Map())
const token = ref(null)
const errorMessage = ref(null)

watchEffect(async () => {
  const list = new Set()
  for (const [key, val] of opportunities.value) {
    if (val.isSelected) list.add(key)
  }
  idsToDelete.value = list
})

const technologiesList = computed(() => {
  const list = new Set()
  for (const [key, val] of opportunities.value) {
    for (const technology of val.technologies.split(', ')) {
      list.add(technology)
    }
  }
  return list
})

const deleteButtonDisabled = computed(() => idsToDelete.value.size === 0)

onBeforeMount(async () => {
  await getAllPistes()
})

function openPopin(isFromPisteTable, piste) {
  isNewItem.value = !isFromPisteTable
  if (isFromPisteTable) {
    currentOpportunity.value = deepCopy(piste)
  }
  popInDisplayed.value = true
}

function closePopin() {
  currentOpportunity.value = undefined
  popInDisplayed.value = false
}

async function getAllPistes() {
  errorMessage.value = ''
  token.value = new URL(document.location).searchParams.get('access-token')
  const optReq = {
    method: 'GET',
    headers: new Headers({ 'access-token': token.value })
  }

  try {
    const response = await fetch('/api/opportunity/all', optReq)
    if (!response.ok) {
      const body = await response.text()
      throw new Error(body);
    }

    const datas = await response.json();
    opportunities.value = new Map()
    for (const item of datas) {
      opportunities.value.set(item.uuid, { ...item, isSelected: false })
    }
  } catch (error) {
    opportunities.value = new Map()
    errorMessage.value = error
  }
}

async function savePiste(opportunityFromPopin) {
  errorMessage.value = ''
  const opportunity = JSON.stringify(opportunityFromPopin)
  const optReq = {
    method: 'POST',
    headers: new Headers({
      'access-token': token.value,
      'Content-Type': 'application/json',
      'Content-Length': opportunity.length
    }),
    body: opportunity
  }

  try {
    const response = await fetch('/api/opportunity/update', optReq)
    if (!response.ok) {
      const body = await response.text()
      throw new Error(body);
    }

    const datas = await response.json();
    opportunities.value.set(datas.uuid, { ...datas, isSelected: false })
  } catch (error) {
    errorMessage.value = error
  } finally {
    closePopin()
  }

}

async function removeSelection(eventFromPopup) {
  errorMessage.value = ''
  let oldSet = new Set()

  if (eventFromPopup !== undefined && !(eventFromPopup instanceof MouseEvent)) {
    if (idsToDelete.value.size > 0)
      oldSet = idsToDelete.value
    idsToDelete.value = new Set([eventFromPopup.id])
  }

  let ids = []
  idsToDelete.value.forEach(id => ids.push(id))
  ids = JSON.stringify(ids)

  const optReq = {
    method: 'DELETE',
    headers: new Headers({
      'access-token': token.value,
      'Content-Type': 'application/json',
      'Content-Length': ids.length
    }),
    body: ids
  }

  try {
    const response = await fetch('/api/opportunity/delete', optReq)
    if (!response.ok) {
      const body = await response.text()
      throw new Error(body);
    }

    const datas = await response.json();
    opportunities.value.clear()
    for (const item of datas) {
      opportunities.value.set(item.uuid, { ...item, isSelected: false })
    }
  } catch (error) {
    errorMessage.value = error
  } finally {
    idsToDelete.value = oldSet
    closePopin()
  }
}

async function closeOpportunity(opportunityFromPopin) {
  errorMessage.value = ''
  const stringifiedOpportunity = JSON.stringify(opportunityFromPopin)
  const optReq = {
    method: 'POST',
    headers: new Headers({
      'access-token': token.value,
      'Content-Type': 'application/json',
      'Content-Length': stringifiedOpportunity.length
    }),
    body: stringifiedOpportunity
  }

  try {
    const response = await fetch('/api/opportunity/close', optReq)
    if (!response.ok) {
      const body = await response.text()
      throw new Error(body);
    }

    const datas = await response.json();
    opportunities.value.set(datas.uuid, { ...datas, isSelected: false })
  } catch (error) {
    errorMessage.value = error
  } finally {
    closePopin()
  }
}

function mapToArray(obj, arrayWanted) {
  let newObj
  if (arrayWanted) {
    newObj = []
    for (const item of obj.values()) {
      newObj.push(item)
    }
  } else {
    newObj = new Map()
    for (const item of obj) {
      newObj.set(item.id, item)
    }
  }
  return newObj
}
</script>

<style>
:root {
  --main-bg-color: rgb(55, 50, 62);
  --main-darker-bg-color: rgb(27, 26, 29);
  --main-lighter-bg-color: rgb(157, 155, 159);
  --main-text-color: rgb(248, 248, 248);
  --main-color-theme: rgb(26, 120, 158);
  --main-lighter-color-theme: rgb(142, 202, 230);
  --main-error-color: rgb(134, 41, 21);
  --main-valid-color: rgb(103, 148, 54);
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
  background-color: var(--main-color-theme);
}

main {
  padding: 20px;
}

button {
  font-size: 1em;
  background: var(--main-color-theme);
  color: var(--main-text-color);
  border: none;
  padding: 10px 15px;
}

button.deleteButton {
  background-color: var(--main-error-color);
}

button.greenButton {
  background-color: var(--main-valid-color);
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
  color: var(--main-text-color);
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

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

.wrapper {
  display: flex;
}

.wrapper>* {
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

.action-panel {
  display: flex;
}

.error {
  margin-left: 1.5rem;
  color: rgb(197, 53, 22)
}
</style>