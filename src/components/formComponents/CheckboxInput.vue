<template>
  <div class="wrapper">
    <input
      type="checkbox"
      :id="inputName"
      :checked="checked"
      @change="$emit('update:checked', $event.target.checked)"
    />
    <label v-if="labelName" class="checkBoxLabel" :for="inputName">{{ labelName }}</label>
  </div>
</template>

<script>
export default {
  name: 'CheckboxInput',
  model: ['update:checked'],
  props: {
    checked: {
      type: Boolean
    },
    labelName: String,
  },
  data() {
    return {
      // dataChecked: this.checked,
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