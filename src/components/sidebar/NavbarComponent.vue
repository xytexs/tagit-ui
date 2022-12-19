<template>
  <nav class="side-bar">
    <div class="side-bar__logo">
      <!--      <img src="@/assets/logo.png" alt="logo">-->
    </div>
    <div class="side-bar__menu menu">
      <router-link class="menu__item" to="/notes">
        <HomeIcon class="menu__icon stroke-1"></HomeIcon>
      </router-link>
      <!--      <router-link class="menu__item" to="/notes/create">-->
      <!--        <BellIcon class="menu__icon"></BellIcon>-->
      <!--      </router-link>-->
      <!--      <router-link class="menu__item" to="/notes">-->
      <!--        <BookOpenIcon class="menu__icon"></BookOpenIcon>-->
      <!--      </router-link>-->
      <router-link class="menu__item" to="/notes/create">
        <PencilSquareIcon class="menu__icon"></PencilSquareIcon>
      </router-link>
    </div>
    <div class="side-bar__profile">
      <div @click="userMenu = !userMenu" class="side-bar__user-icon">
        {{ userFirstLetter }}
      </div>

      <user-menu v-if="userMenu"/>
    </div>
  </nav>
</template>

<script>
import {
  PencilSquareIcon,
  HomeIcon,
  // BellIcon, BookOpenIcon
} from '@heroicons/vue/24/outline'
import {mapGetters} from "vuex";
import UserMenu from "@/components/sidebar/UserMenu";

export default {
  name: 'Navbar-Component',
  data() {
    return {
      userMenu: false
    }
  },
  components: {
    UserMenu,
    PencilSquareIcon,
    HomeIcon,
    // BellIcon,
    // BookOpenIcon
  },

  computed: {
    ...mapGetters({
      userFirstLetter: 'auth/getUserEmailFirstLetter'
    })
  }
}
</script>

<style scoped lang="scss">
.side-bar {
  height: 100vh;
  width: 80px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__logo {
    width: 100%;
  }

  &__profile {
    position: relative;
    display: flex;
    margin-bottom: 15px;
    width: 100%;
    justify-content: center;
  }

  &__user-icon {
    cursor: pointer;
    border-radius: 50px;
    background-color: green;
    width: 40px;
    height: 40px;
    text-align: center;
    padding-top: 8px;
    color: white;
  }

  .menu {
    &__item {
      justify-content: center;
      display: flex;
      width: 100%;
      padding-bottom: 35px;
    }

    &__icon {
      stroke-width: 0.6;
      width: 25px;
    }
  }
}
</style>
