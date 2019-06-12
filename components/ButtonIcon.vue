<template>
  <p class="icon">
    Turn the knob to explore the network
  </p>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.icon {
  position: fixed;
  left: 4em;
  bottom: -0.8em;
  text-align: right;
  font-size: 8rem;
  z-index: 1000;

  &::after {
    content: ' \02193';
    position: absolute;
    bottom: 100%;
    left: -1em;
    font-size: 10rem;
    animation: updown 1s alternate infinite;
  }
}
</style>
