<template>
  <div class="container">
    <template>
      <screenshot
        v-for="(website, index) in uniques.visited.values"
        :key="website"
        :website="website"
        :index="index"
        :active="index === websiteIndex"
      />
    </template>
    <transition name="fade">
      <timeout v-if="timeOut" version="horizontal" />
    </transition>
  </div>
</template>

<script>
import ws from '~/mixins/ws'

import Screenshot from '~/components/Screenshot.vue'
import Timeout from '~/components/Timeout.vue'

import { mapState } from 'vuex'

export default {
  components: {
    Screenshot,
    Timeout
  },
  mixins: [ws],
  computed: {
    ...mapState(['timeOut'])
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
}
</style>
