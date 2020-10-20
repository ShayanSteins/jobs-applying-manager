<template>
  <div class="wrapper">
    <label :for="inputName" class="genericLabel">{{ labelName }}</label>
    <textarea
      v-if="inputType === 'textarea'"
      :name="inputName"
      :value="value"
      @input="$emit('input', $event.target.value)"
      rows="10"
    ></textarea>
    <input
      v-else
      class="genericInput"
      :name="inputName"
      :type="inputType"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :disabled="isDisabled"
      :required="isRequired"
    />
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
    labelName: String,
    isRequired: {
      type: Boolean,
      default: false
    },
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
}
.wrapper > * {
  line-height: 1;
}

.genericInput,
textarea {
  flex: 1 1 auto;
}

input[type="checkbox"] {
  margin: 12px 5px 12px 0px;
}

.checkBoxLabel {
  color: var(--main-lighter-bg-color);
  font-size: 1em;
  margin-top: 8px;
}

.genericInput:focus,
textarea:focus {
  border: 2px solid #eaa60c;
  outline: auto 1px #eaa60c;
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
</style>