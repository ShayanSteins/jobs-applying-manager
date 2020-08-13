<template>
  <div class="popin">
    <h1>Nouvelle piste</h1>
    <div class="newPiste">
      <div class="left">
        <InputForm inputType="text" labelName="Société"></InputForm>
        <InputForm inputType="text" labelName="Technologies"></InputForm>
        <InputForm inputType="url" labelName="Liens"></InputForm>
        <InputForm inputType="textarea" labelName="Notes"></InputForm>
      </div>
      <div class="right">
        <InputForm inputType="text" labelName="Interlocuteur"></InputForm>
        <InputForm inputType="text" labelName="Etat" isDisabled="true"></InputForm>
        <Dates></Dates>
      </div>
    </div>
    <button>Créer</button>
  </div>
</template>

<script>
import Dates from './Dates.vue'
import InputForm from './InputForm.vue'

export default {
  name: 'PopIn',
  components: {
    Dates, InputForm
  }
}
</script>

<style scoped>
.popin {
  border: solid 1px black;
  border-radius: 0.4em;
}
.newPiste {
  display: flex;
}
.newPiste > div {
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
h1 {
  text-align: center;
}
</style>