<template>
  <intro-slide>
    <template slot="header">
      {{ title }}
    </template>
    <template>
      {{ text }}
    </template>
  </intro-slide>
</template>

<script>
import IntroSlide from '~/components/IntroSlide.vue'
export default {
  components: {
    IntroSlide,
  },
  asyncData({ params, store }) {
    const text = store.getters.getText(params.layer)
    return { title: params.layer, text }
  },
}
</script>

<style lang="scss" scoped></style>
