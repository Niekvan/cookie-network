<template>
  <div class="page">
    <navbar title="Explore" />
    <div class="page__content">
      <graph class="graph" :data="formattedCookies" />
      <div class="loading" :class="{ pending: pending }" />
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Graph from '~/components/Graph.vue'

import { mapState } from 'vuex'

export default {
  components: {
    Navbar,
    Graph
  },
  computed: {
    formattedCookies() {
      const pattern = new RegExp(/^(.+)?(\..+){2}$/)
      return this.cookies.map(item => {
        item.subDomain = pattern.test(item.sub_domain)
          ? item.sub_domain
          : `.${item.sub_domain}`
        return item
      })
    },
    ...mapState(['cookies', 'pending'])
  }
}
</script>

<style lang="scss" scoped>
.page {
  background: $grey;
  left: 45px;
  overflow-x: hidden;

  &__content {
    padding: $grid-spacing-top $grid-spacing-top;
  }

  .loading {
    position: fixed;
    display: block;
    left: 50%;
    top: 50%;
    right: 50%;
    bottom: 50%;
    transition: all 0.2s;
    opacity: 0;
    background: rgba($black-indigo, 0.2);

    &.pending {
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      opacity: 1;
    }
  }
}
</style>
