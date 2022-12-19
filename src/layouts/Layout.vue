<template>
  <component :is="layout">
    <slot/>
    <NotificationMessages/>

  </component>
</template>

<script>
import AppLayoutDefault from '@/layouts/MainLayout'
import {shallowRef} from "vue";
import NotificationMessages from "@/components/NotificationMessages";

export default {
  name: "AppLayout",
  components: {
    NotificationMessages
  },
  data: () => ({
    layout: shallowRef(AppLayoutDefault)
  }),
  watch: { // TODO cleanup code
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component = await import(`@/layouts/${route.meta.layout}.vue`)
          this.layout = shallowRef(component?.default) || shallowRef(AppLayoutDefault)
        } catch (e) {
          this.layout = shallowRef(AppLayoutDefault)
        }
      }
    }
  }
}
</script>
