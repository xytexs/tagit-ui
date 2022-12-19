<template>
  <div class="login flex justify-center items-center">
    <FormWrapper>
      <AuthForm
          @formSubmitted="handleSubmit"
          :is-processing="isProcessing">
        <template v-slot:btn-text>
          Sign Up
          <!-- content for the header slot -->
        </template>
      </AuthForm>
    </FormWrapper>
    <!--    <LoginWithGoogleBtn @click="handleLogin"/>-->
  </div>
</template>

<script>
import AuthForm from '@/components/forms/AuthForm'
import FormWrapper from '@/components/forms/FormWrapper';
import {getSingUpData} from '@/api/identity'
// import LoginWithGoogleBtn from '@/components/button/LoginWithGoogleBtn'

export default {
  name: 'RegisterPage',
  data() {
    return {
      csrfToken: '',
      flowId: '',
      isProcessing: false,
    }
  },
  components: {
    FormWrapper,
    AuthForm,
    // LoginWithGoogleBtn,
  },
  methods: {
    async handleSubmit(data) {
      this.isProcessing = true
      try {
        await this.$store.dispatch('auth/registerUser', {
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
        this.$store.dispatch('messages/createTemporaryMessage', {message: e.toString(), type: 'error'})
      }
    }
  },

  async mounted() {
    const {csrfToken, flowId} = await getSingUpData()
    this.flowId = flowId
    this.csrfToken = csrfToken
  },
}
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  width: 100%;
}
</style>
