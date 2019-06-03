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
    <timeout />
  </div>
</template>

<script>
import ws from '~/mixins/ws'

import Screenshot from '~/components/Screenshot.vue'
import Timeout from '~/components/Timeout.vue'
export default {
  components: {
    Screenshot,
    Timeout
  },
  mixins: [ws]
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
