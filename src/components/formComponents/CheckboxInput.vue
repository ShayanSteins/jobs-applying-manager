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

<script setup>
import { ref } from 'vue'

const props = defineProps({
  checked: {
      type: Boolean
    },
    labelName: String,
  })

const inputName = ref(props.labelName.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))

const emit = defineEmits(['change', 'update:model-value', 'update:checked'])

</script>

<style scoped>
label {
  color: var(--main-lighter-bg-color);
  font-size: 0.9em;
  margin-left: 5px;
}
</style>