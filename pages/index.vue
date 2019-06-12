<template>
  <section class="container">
    <transition name="fade">
      <timeout v-if="timeOut" version="vertical" />
    </transition>
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
    <transition name="fade">
      <button-icon v-if="buttonActive" />
    </transition>
  </section>
</template>

<script>
import Intro from '~/components/pages/Intro.vue'
import About from '~/components/pages/About.vue'
import Explore from '~/components/pages/Explore.vue'
import Timeout from '~/components/Timeout.vue'
import ButtonIcon from '~/components/ButtonIcon.vue'

import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Intro,
    About,
    Explore,
    Timeout,
    ButtonIcon
  },
  data() {
    return {
      activeTabs: ['intro', 'explore']
    }
  },
  computed: {
    buttonActive() {
      return (
        (this.timeOut && !this.sequence && !this.turned) ||
        (!this.timeOut && !this.turned)
      )
    },
    ...mapState(['extensionId', 'timeOut', 'turned', 'sequence'])
  },
  mounted() {
    const isChrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
    if (isChrome) {
      window.chrome.runtime.sendMessage(
        this.extensionId,
        'version',
        response => {
          if (!response) {
            this.setInstalled(false)
            return true
          }
          this.setInstalled(true)
        }
      )
    }
    this.setChromeBrowser(isChrome)
  },
  methods: {
    updateActiveTabs(item) {
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
    },
    ...mapActions(['setChromeBrowser', 'setInstalled'])
  }
}
</script>

<style lang="scss">
.container {
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  overflow: hidden;

  .graph {
    grid-column: graph-start / graph-end;
    grid-row: 1 / -1;
  }
}
</style>
