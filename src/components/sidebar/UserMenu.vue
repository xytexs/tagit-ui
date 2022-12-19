<template>
  <div
      class="user-menu z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
    <div class="py-3 px-4 text-sm text-gray-900 dark:text-white">
      <div class="font-medium truncate">{{ auth.user.email }}</div>
    </div>
    <!--    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">-->
    <!--      <li>-->
    <!--        <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>-->
    <!--      </li>-->
    <!--      <li>-->
    <!--        <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>-->
    <!--      </li>-->
    <!--      <li>-->
    <!--        <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>-->
    <!--      </li>-->
    <!--    </ul>-->
    <div class="py-1">
      <a href="#"
         @click="logout()"
         class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
        out</a>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'UserMenu',
  data() {
    return {}
  },

  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/logoutUser')
      } catch (e) {
        console.log(e)
      }
    }
  },

  computed: {
    ...mapState({
      auth: 'auth'
    })
  }
}
</script>

<style lang="scss" scoped>
.user-menu {
  top: -100px;
  position: absolute;
}
</style>
