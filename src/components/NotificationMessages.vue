<template>
  <div class="messages-bag">
    <div v-for="(message, index) in messages" :key="index" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
         role="alert">
      <p class="font-bold">Error</p>
      {{ message.message }}
    </div>
  </div>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'NotificationMessages',
  data() {
    return {}
  },
  computed: mapState({
    messages: state => state.messages.messages
  })
}
</script>

<style>
.messages-bag {
  z-index: 999;
  max-width: 600px;
  min-width: 300px;
  right: 50px;
  opacity: 0.9;
  position: fixed;
  bottom: 20px;
}
</style>
