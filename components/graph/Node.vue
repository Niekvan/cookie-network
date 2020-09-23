<template>
  <!-- eslint-disable -->
  <g
    class="node"
    :class="node.value"
    :transform="`translate(${node.x},${node.y})`"
  >
    <circle class="node__circle" r="5" />
    <text
      class="node__text"
      :class="{ active: active }"
      transform="rotate(-45, 0, -9) translate(-20, -5)"
      y="9"
    >
      {{ node.value.replace(/http(s)?:\/\/(www.)?/, '') }}
    </text>
  </g>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0,
    },
    length: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    levels: {
      type: Number,
      default: 5,
    },
    node: {
      type: Object,
      default() {},
    },
    screen: {
      type: Object,
      default() {
        return {
          width: 0,
          height: 0,
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.node {
  transition: opacity 0.5s;

  * {
    transition: opacity 0.5s;
  }

  &:hover {
    opacity: 1;
    cursor: pointer;
    .node__text {
      opacity: 1;
    }
  }

  &__text {
    opacity: 0;
    text-anchor: end;
    font-size: 1.2rem;

    &.active {
      opacity: 1;
    }
  }
}
</style>
