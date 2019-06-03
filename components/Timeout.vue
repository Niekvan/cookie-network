<template>
  <div class="timeout">
    <h1 class="timeout__title">Press I consent to enter</h1>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.timeout {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $primary;
  color: $orange;
  z-index: 100;

  &__title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5em;
  }
}
</style>
