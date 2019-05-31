<template>
  <nav class="nav">
    <ul class="nav__container">
      <li
        v-for="(layer, key) in layers"
        :key="key"
        :class="key"
        :style="{ opacity: active.includes(key) ? 1 : 1 }"
        class="nav__item"
      >
        <nuxt-link :to="`/${key}`" class="link">
          <div class="nav__content">
            <h2 class="nav__title header header--2">
              {{ key }}
            </h2>
            <svg class="nav__svg" :viewBox="viewbox">
              <g
                v-for="row in layer.items"
                :key="`row-${row}`"
                class="circles__row"
              >
                <g
                  v-for="col in layer.items"
                  :key="`col-${col}`"
                  class="circle"
                >
                  <circle
                    :cy="
                      ((viewbox[3] - viewbox[1]) / layer.items) * (row - 0.5)
                    "
                    :cx="
                      ((viewbox[2] - viewbox[0]) / layer.items) * (col - 0.5)
                    "
                    r="5"
                  />
                </g>
              </g>
            </svg>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      layers: {
        connected: {
          text:
            'This layer shows all the websites you have visited who are connected to one of the highlighted companies'
        },
        companies: {
          text:
            'This layers shows all the companies with access to the selected website you have visited before',
          items: 4
        },
        domains: {
          text:
            'This layer shows all the domains that are used to collect information from you'
        },
        subdomains: {
          text:
            'This layer shows all the different logistic centers through which the information is send further'
        },
        cookies: {
          text:
            'This layer shows all the cookies connected to the selected website'
        },
        visited: {
          text:
            'This layer shows all the websites you have visited since installing the plugin'
        }
      },
      active: ['connected', 'companies', 'domains', 'subdomains', 'visited']
    }
  },
  computed: {
    ...mapState(['uniques'])
  },
  mounted() {
    // console.log((this.viewbox[3] - this.viewbox[1]) / this.layers[0].items) //eslint-disable-line
  }
}
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;

  &__container {
    display: block;
    width: 80%;
    margin: auto;
    list-style-type: none;
    padding: 0;
  }

  &__item {
    width: 70%;
    padding-bottom: 70%;
    position: relative;
    perspective: 400px;
    transform: rotatex(70deg) rotateZ(30deg);
    transition: all 1s 0.2s;
    // background: $grey-light;

    &:not(:first-child) {
      margin-top: -50%;
    }

    .link {
      color: inherit;
    }

    &.connected {
      // background: $yellow;
      // color: $color-text-inverse;
      z-index: 6;
    }

    &.companies {
      // background: $blue;
      z-index: 5;
    }

    &.domains {
      // background: $pink;
      // color: $color-text-inverse;
      z-index: 4;
    }

    &.subdomains {
      // background: $green;
      z-index: 3;
    }

    &.cookies {
      // background: $color-cookie;
      // color: $color-text-inverse;
      z-index: 2;
    }

    &.visited {
      // background: $yellow;
      // color: $color-text-inverse;
      z-index: 1;
    }

    &:hover {
      transform: rotatex(0deg) rotateZ(0deg) translateZ(200px);
      // width: 70%;
      // padding-bottom: 100%;
      background: $grey-light;
      margin-bottom: 5%;
      z-index: 10;
      transition: all 1s;

      &:not(:first-child) {
        margin-top: -20%;
      }

      .nav {
        &__title {
          opacity: 1;
          transition: opacity 0.2s 1s;
        }
      }
    }
  }

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__title {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-100%, -50%);
    text-transform: capitalize;
    font-weight: normal;
    padding: 0.25em 0.5em;
    background: $grey-light;
    opacity: 0;
    transition: opacity 0.2s 0s;
  }

  &__text {
    display: inline-block;
    margin: 0;
  }

  &__svg {
    position: relative;
    width: 100%;
    height: 100%;
    fill: $green;
  }
}
</style>
