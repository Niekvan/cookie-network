<template>
  <section class="container">
    <intro
      :class="{ active: activeTabs.includes('intro') }"
      @click.native="updateActiveTabs('intro')"
    />
    <explore
      :class="{ active: activeTabs.includes('explore') }"
      @click.native="updateActiveTabs('explore')"
    />
    <about
      :class="{ active: activeTabs.includes('about') }"
      @click.native="updateActiveTabs('about')"
    />
  </section>
</template>

<script>
import Intro from '~/components/pages/Intro.vue'
import About from '~/components/pages/About.vue'
import Explore from '~/components/pages/Explore.vue'

export default {
  components: {
    Intro,
    About,
    Explore
  },
  data() {
    return {
      activeTabs: ['intro']
    }
  },
  methods: {
    updateActiveTabs(item) {
      console.log(item) //eslint-disable-line
      switch (item) {
        case 'intro':
          this.activeTabs = ['intro']
          break
        case 'explore':
          this.activeTabs = ['intro', 'explore']
          break
        case 'about':
          this.activeTabs = ['intro', 'about', 'explore']
          break
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  background: $background-white;
  overflow: hidden;

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
}
</style>
