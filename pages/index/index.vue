<template>
  <intro-slide :back="false">
    <template slot="header"> The cookie network </template>
    <template>
      Welcome to the visual part of The Cookie Network. On this website you can
      explore the network of your cookies. Cookies are small text files placed
      on your computer by companies in order to identify who you are. This can
      be very helpful when you want a website to remember your shopping cart for
      when you come back or automatically log you in on your next visit.
      However, this technology also allows for individual targeting. Unknown
      billion euro companies track our every move on the internet in order to
      create our profile. They can sell this or use it to influence us.
      Camebridge Analytica is a recent well known example. This website shows
      which companies have acces to your data and through wich webites.
    </template>
  </intro-slide>
</template>

<script>
import IntroSlide from '~/components/IntroSlide.vue'
export default {
  components: {
    IntroSlide,
  },
}
</script>

<style lang="scss" scoped></style>
