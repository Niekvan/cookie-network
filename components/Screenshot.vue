<template>
  <div class="frame" :style="position" :class="{ active: active }">
    <div class="frame__header">
      <p>
        {{ website }}
      </p>
    </div>
    <div
      class="frame__content"
      :style="{
        backgroundImage: `url(${require(`~/assets/images/screenshots/${website.replace(
          /https?:\/\//,
          ''
        )}.png`)})`
      }"
    />
  </div>
</template>

<script>
export default {
  props: {
    website: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cols: 4
    }
  },
  computed: {
    position() {
      const col = this.index % this.cols
      const row = Math.floor(this.index / this.cols)
      const x = col < this.cols / 2 ? '1%' : '-66%'
      if (this.active) {
        return {
          zIndex: 2,
          transform: `translateY(-50%) translateX(${x})`,
          width: '70%',
          top: '50%',
          left: `calc(${100 / this.cols}% * ${col} + ${Math.random() * 3 -
            1.5}rem)`
        }
      }
      return {
        top: `calc(1.5rem + 4.5rem * ${row} + ${Math.random() * 5 - 2.5}rem)`,
        left: `calc(${100 / this.cols}% * ${col} + ${Math.random() * 3 -
          1.5}rem)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.frame {
  display: flex;
  flex-direction: column;
  width: 25%;
  box-sizing: border-box;
  font-size: 1.5rem;
  position: absolute;
  box-shadow: 2px 0 7px 1px rgba($primary, 0.1);
  transition: all 1s 0.2s;
  z-index: 1;
  will-change: transform;

  &::before {
    content: '';
    padding-bottom: calc(56.25% + 1.5em);
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background: $background-white;
  }

  &__header {
    position: relative;
    display: block;
    width: 100%;
    height: 1.5em;
    padding-left: 0.25em;

    &::after {
      content: 'x';
      display: block;
      position: absolute;
      padding-right: 0.25em;
      right: 0;
      top: 0;
    }
  }

  &__content {
    position: relative;
    background-size: contain;

    &::after {
      content: '';
      display: block;
      width: 100%;
      padding-bottom: 56.25%;
    }
  }

  &.active {
    font-size: 2.5rem;
    // transition: all 1s;
  }
}
</style>
