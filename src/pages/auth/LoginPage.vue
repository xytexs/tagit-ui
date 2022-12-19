<template>
  <div class="login flex items grid-cols-1 justify-center items-center">
    <FormWrapper>
      <AuthForm
          @formSubmitted="handleSubmit"
          :is-processing="isProcessing">
        <template v-slot:btn-text>
          Sign In
        </template>
      </AuthForm>
    </FormWrapper>
    <div class="login__register">
      <p><a @click="goToRegister()">don't have account? go to register!</a></p>
    </div>

    <!--    <LoginWithGoogleBtn @click="handleLogin"/>-->
  </div>
</template>

<script>
import AuthForm from '@/components/forms/AuthForm'
import FormWrapper from "@/components/forms/FormWrapper";
import {getSignInData} from "@/api/identity";
// import LoginWithGoogleBtn from '@/components/button/LoginWithGoogleBtn'

export default {
  data() {
    return {
      isProcessing: false,
      csrfToken: '',
      flowId: '',
    }
  },
  components: {
    FormWrapper,
    AuthForm,
    // LoginWithGoogleBtn,
  },
  methods: {
    goToRegister() {
      this.$router.push('/register')
    },
    async handleSubmit(data) {
      this.isProcessing = true
      try {
        await this.$store.dispatch('auth/loginUser', {
              flowId: this.flowId,
              email: data.email,
              password: data.password,
              csrfToken: this.csrfToken
            }
        )

        this.isProcessing = false
        await this.$router.push('/notes/create')
      } catch (e) {

        this.isProcessing = false
        console.log(e)
        this.$store.dispatch('messages/createTemporaryMessage', {message: e.toString(), type: 'error'})
      }
    }
  },

  async mounted() {
    const {csrfToken, flowId} = await getSignInData()
    this.flowId = flowId
    this.csrfToken = csrfToken
  },
}
</script>

<style lang="scss" scoped>
.login {
  flex-direction: column;
  min-height: 100vh;
  width: 100%;

  &__register {
    margin-top: 10px;
    cursor: pointer;
    & a {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
