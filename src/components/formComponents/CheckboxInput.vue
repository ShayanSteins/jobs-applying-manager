<template>
  <div class="wrapper">
    <input
      type="checkbox"
      :name="inputName"
      :checked="dataChecked"
      @change="$emit('change', $event.target.checked)"
    />
    <label v-if="labelName" class="checkBoxLabel" :for="inputName">{{ labelName }}</label>
  </div>
</template>

<script>
export default {
  name: 'CheckboxInput',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      type: Boolean
    },
    labelName: String,
  },
  data() {
    return {
      dataChecked: this.checked,
      inputName: this.labelName.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    }
  }
}
</script>

<style scoped>
label {
  color: var(--main-lighter-bg-color);
  font-size: 0.9em;
  margin-left: 5px;
}
</style>