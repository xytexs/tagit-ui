<template>
  <form class="login-form">
    <div class="form__control">
      <FieldEmail v-model="email" @fieldChangeState="handleEmailState"/>
    </div>
    <div class="form__control">
      <FieldPassword v-model="password" @fieldChangeState="handlePasswordState"/>
    </div>
    <div class="form__control">
      <button :disabled="isSubmitDisabled || isProcessing"
              :class="{'cursor-not-allowed bg-green-800 text-white': isSubmitDisabled}"
              @click="submit()"
              type="button"
              class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
        <slot name="btn-text"/>

      </button>
    </div>
  </form>
</template>

<script>
import FieldEmail from "@/components/forms/FieldEmail";
import FieldPassword from "@/components/forms/FieldPassword";


export default {
  props: [
    'isProcessing'
  ],
  emits: [
    'formSubmitted',
  ],
  name: 'AuthForm',
  components: {FieldPassword, FieldEmail},
  data() {
    return {
      email: '',
      password: '',
      isEmailValid: false,
      isPasswordValid: false,
      errors: [],
    }
  },
  computed: {
    isSubmitDisabled() {
      return !this.isEmailValid || !this.isPasswordValid
    },
  },
  methods: {
    handleEmailState({isValid}) {
      this.isEmailValid = isValid
    },
    handlePasswordState({isValid}) {
      this.isPasswordValid = isValid
    },
    submit() {
      console.log('submit test')
      this.$emit('formSubmitted', {
        email: this.email,
        password: this.password,
      })
    },
  },
  async created() {
    //
    // const data = await getSignInData()
    // console.log(data)
    // this.form = data
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 100%;
}
</style>
