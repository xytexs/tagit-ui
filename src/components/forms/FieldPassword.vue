<template>
  <input :value="modelValue"
         @input="handleInput"
         placeholder="Password"
         type="password"
         autocomplete="current-password"
         class="form__input form-input px-4 py-3 rounded-lg">
  <p v-if="!isValid" class="text-red-400">{{ error }}</p>
</template>

<script>
export default {
  name: 'FieldPassword',
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
        this.error = 'Password field is required'
      } else {
        this.error = 'Password field should contain uppercase, number, special symbol, length >= 8'
      }
    },

    validate(val) {
      const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%&*()_+=|<>?{}~-]).{8,}$/

      return re.test(val)
    }
  }
}
</script>
