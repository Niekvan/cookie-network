<template>
  <div class="container">
    <screenshot
      v-for="(website, index) in uniques.visited.values"
      :key="website"
      :website="website"
      :index="index"
      :active="index === websiteIndex"
    />
  </div>
</template>

<script>
import ws from '~/mixins/ws'

import Screenshot from '~/components/Screenshot.vue'
export default {
  components: {
    Screenshot
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
