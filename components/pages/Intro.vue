<template>
  <div class="page">
    <navbar title="Introduction" />
    <div class="page__content">
      <div class="menu">
        <Menu />
      </div>
      <div class="child">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Menu from '~/components/Menu.vue'
export default {
  components: {
    Navbar,
    Menu,
  },
}
</script>

<style lang="scss" scoped>
.page {
  background: $grey-light;
  left: 0;

  &__content {
    padding: 2rem calc(2rem + 45px) 2rem 2rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 1rem;

    .menu {
      grid-column: 2 / 4;
      align-self: center;
    }

    .child {
      grid-column: 4 / 7;
    }
  }
}
</style>
