<template>
  <div class="side-bar">
    <h2 class="header header--1">
      <slot name="header">header</slot>
    </h2>
    <p class="body">
      <slot></slot>
    </p>
    <nuxt-link v-if="back" to="/" class="link body">
      back
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    back: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  text-transform: capitalize;
}
</style>
