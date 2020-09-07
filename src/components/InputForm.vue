<template>
  <div class="wrapper">
    <input
      v-if="inputType === 'checkbox'"
      :name="inputName"
      :type="inputType"
      :checked="value"
      @input="$emit('change', $event.target.value)"
    />
    <label v-if="inputType === 'checkbox'" class="checkBoxLabel" :for="inputName">{{ labelName }}</label>

    <label v-else :for="inputName" class="genericLabel">{{ labelName }}</label>
    <input
      v-if="inputType !== 'textarea'&& inputType !== 'checkbox'"
      class="genericInput"
      :name="inputName"
      :type="inputType"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :disabled="isDisabled"
    />
    <textarea
      v-if="inputType === 'textarea'"
      :name="inputName"
      :value="value"
      @input="$emit('input', $event.target.value)"
      rows="10"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'InputForm',
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
    labelName: String,
    value: {
      type: String,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputName: this.labelName.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  margin: 5px 0;
}
.wrapper > * {
  line-height: 1;
}

.genericInput,
textarea {
  flex: 1 1 auto;
}

input[type=checkbox] {
  margin: 12px 5px 12px 0px;
}

.checkBoxLabel {
  color: #575757;
  font-size: 1em;
  margin-top: 8px;
}

.genericInput:focus,
textarea:focus {
  border: 2px solid #eaa60c;
  outline: auto 1px #eaa60c;
}

.genericLabel {
  background: #575757;
  color: #fff;
  min-width: 115px;
}

.genericLabel,
.genericInput {
  margin: 0;
  padding: 10px;
}
</style>