<template>
  <section class="container">
    <graph class="graph" :data="formattedCookies" />
    <div class="side-bar">
      <h1 class="side-bar__title">The cookie network</h1>
      <p class="side-bar__body">Some explenatory text about the project</p>
      <Menu class="menu" />
    </div>
    <div class="loading" :class="{ pending: pending }" />
  </section>
</template>

<script>
import Graph from '~/components/Graph.vue'
import Menu from '~/components/Menu.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Graph,
    Menu
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

<style lang="scss">
.container {
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  background: $background-white;

  display: grid;
  grid-template-columns: [graph-start] repeat(4, 1fr) [graph-end side-bar-start] 1fr [side-bar-end];
  grid-template-rows: 1fr;

  .graph {
    grid-column: graph-start / graph-end;
    grid-row: 1 / -1;
  }

  .side-bar {
    position: relative;
    grid-column: side-bar-start / side-bar-end;
    grid-row: 1 / -1;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;

    &__title {
      font-weight: normal;
      font-size: 3rem;
      line-height: 1;
      margin-bottom: 0.5em;
    }

    &__body {
      font-size: 1.5rem;
      margin: 0;
      flex-grow: 1;
    }
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
