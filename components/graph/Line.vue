<template>
  <g>
    <line
      v-if="existing"
      :x1="data.source[0].node.x"
      :x2="data.target[0].node.x"
      :y1="data.source[0].node.y"
      :y2="data.target[0].node.y"
    />
  </g>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {},
    },
  },
  computed: {
    existing() {
      return (
        this.data &&
        this.data.source &&
        this.data.target &&
        this.data.source[0] &&
        this.data.target[0] &&
        this.data.source[0].node &&
        this.data.target[0].node
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@keyframes fadein {
  from {
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
  }
  to {
    stroke-dashoffset: 0;
  }
}
.line {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: fadein 5s forwards;

  &.cc {
    animation-delay: 1.6s;
  }

  &.cd {
    animation-delay: 1.1s;
  }

  &.ds {
    animation-delay: 0.6s;
  }

  &.sv {
    animation-delay: 0.1s;
  }
}
</style>
