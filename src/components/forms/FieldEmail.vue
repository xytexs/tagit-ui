<template>
  <input :value="modelValue"
         @input="handleInput"
         placeholder="Email"
         type="email"
         class="form__input form-input px-4 py-3 rounded-lg">
  <p v-if="!isValid" class="text-red-400">{{ error }}</p>
</template>

<script>
export default {
  name: 'FieldEmail',
  props: ['modelValue'],
  emits: ['update:modelValue', 'fieldChangeState'],
  data() {
    return {
      error: '',
      isValid: true,
    }
  },

  methods: {
    handleInput(e) {
      this.$emit('update:modelValue', e.target.value)

      this.isValid = this.validate(e.target.value)

      this.$emit('fieldChangeState', {isValid: this.isValid})
      this.setErrorFiled()
    },

    setErrorFiled() {
      if (this.isValid) {
        this.error = ''

        return true
      }

      if (this.modelValue === '') {
        this.error = 'Email field is required'
      } else {
        this.error = 'Email field should be valid email'
      }
    },

    validate(val) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      return re.test(val)
    }
  }
}
</script>
