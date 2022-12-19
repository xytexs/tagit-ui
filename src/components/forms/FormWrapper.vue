<template>
  <div class="form-wrap flex items-center rounded-lg">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
  .form-wrap {
    width: 100%;
    max-width: 500px;
    padding: 35px 50px 15px;
    border-color: #6B7280;
    border-width: 0.5px;
  }
</style>
