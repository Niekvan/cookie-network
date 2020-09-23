<template>
  <div class="side-bar">
    <h2 class="header header--1">
      <slot name="header">header</slot>
    </h2>
    <p class="body">
      <slot></slot>
    </p>
    <nuxt-link v-if="back" to="/" class="link body"> back </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    back: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  text-transform: capitalize;
}

// .link {
//   text-decoration: none;
//   color: $primary;
//   text-transform: uppercase;
//   position: relative;

//   &::before {
//     content: '';
//     position: absolute;
//     bottom: -0.2em;
//     left: -10%;
//     height: 0;
//     width: 120%;
//     background: $green;
//     z-index: -1;
//     transition: height 0.2s;
//   }

//   &:hover {
//     &::before {
//       height: 1.7em;
//     }
//   }
// }
</style>
