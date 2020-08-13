<template>
  <div class="wrapper">
    <label :for="inputName">{{ labelName }}</label>
    <textarea v-if="inputType === 'textarea'" :name="inputName" rows="10"></textarea>
    <input v-else :name="inputName" :type="inputType" :disabled="isDisabled" />
  </div>
</template>

<script>
export default {
  name: 'InputForm',
  props: {
    inputType: {
      type: String,
      default: "text"
    },
    labelName: String,
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
  border: 1px solid rgb(0, 66, 141);
  margin: 5px 0;
}
.wrapper > * {
  border: none;
  line-height: 1;
}

input,
textarea {
  flex: 1 1 auto;
}

label {
  background: #575757;
  color: #fff;
  min-width: 115px;
}

label,
input {
  margin: 0;
  padding: 10px;
}
</style>