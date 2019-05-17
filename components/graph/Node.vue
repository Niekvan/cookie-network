<template>
  <g
    class="node"
    :class="node"
    :transform="
      `translate(${(screen.width / length) * index},${(screen.height / levels) *
        level})`
    "
  >
    <circle class="node__circle" r="5" />
    <text
      class="node__text"
      :class="{ active: active }"
      transform="rotate(45, 0, 9)"
      y="9"
    >
      {{ node.replace(/http(s)?:\/\/(www.)?/, '') }}
    </text>
  </g>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    },
    length: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      default: 1
    },
    levels: {
      type: Number,
      default: 5
    },
    node: {
      type: String,
      default: ''
    },
    screen: {
      type: Object,
      default() {
        return {
          width: 0,
          height: 0
        }
      }
    }
  }
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
    .node__text {
      opacity: 1;
    }
  }

  &__text {
    opacity: 0;

    &.active {
      opacity: 1;
    }
  }
}
</style>
