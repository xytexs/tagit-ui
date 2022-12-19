<template>
  <AppLayout :is="layout">
    <router-view></router-view>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/Layout";

export default {
  name: 'App',
  data: () => ({
    layout: `div`,
  }),
  components: {AppLayout},
  methods: {}
}
</script>

<style>
</style>
