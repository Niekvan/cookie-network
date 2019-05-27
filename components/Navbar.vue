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
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.bar {
  height: 55px;
  width: 100%;
  background: transparent;
  display: inline-block;
  position: fixed;
  top: 0;
  left: 0;

  &:hover {
    cursor: pointer;
  }

  &__title {
    text-align: right;
    padding-right: 30px;
    padding-top: 0.25em;

    text-transform: uppercase;
  }
}
</style>
