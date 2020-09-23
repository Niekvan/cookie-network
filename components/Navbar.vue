<template>
  <div class="bar">
    <h2 class="bar__title header header--2">
      {{ title }}
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.bar {
  width: 55px;
  height: 100%;
  background: transparent;
  display: inline-block;
  position: fixed;
  top: 0;
  left: 0;

  &:hover {
    cursor: pointer;
  }

  &__title {
    width: 100vh;
    text-align: right;
    transform: translateX(-50vh) translateX(+26px) translateY(calc(50vh))
      rotate(-90deg);

    text-transform: uppercase;
  }
}
</style>
