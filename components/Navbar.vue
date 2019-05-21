<template>
  <div class="bar">
    <h2 class="bar__title">
      {{ title }}
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.bar {
  width: 45px;
  height: 100%;
  background: transparent;
  display: inline-block;

  &:hover {
    cursor: pointer;
  }

  &__title {
    width: 100vh;
    text-align: right;
    transform: translateX(-50vh) translateX(+23px) translateY(calc(50vh))
      rotate(-90deg);

    font-size: 2rem;
    font-weight: normal;
    text-transform: uppercase;
  }
}
</style>
