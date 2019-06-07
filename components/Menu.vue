<template>
  <nav class="nav">
    <ul class="nav__container">
      <li
        v-for="(layer, key) in layers"
        :key="key"
        :class="key"
        class="nav__item"
      >
        <nuxt-link :to="`/${key}`" class="nav__link">
          <div class="nav__content">
            <h2 class="nav__title header header--2">
              {{ key }}
            </h2>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      layers: {
        connected: {
          text:
            'This layer shows all the websites you have visited who are connected to one of the highlighted companies',
          items: 5
        },
        companies: {
          text:
            'This layers shows all the companies with access to the selected website you have visited before',
          items: 4
        },
        domains: {
          text:
            'This layer shows all the domains that are used to collect information from you',
          items: 6
        },
        subdomains: {
          text:
            'This layer shows all the different logistic centers through which the information is send further',
          items: 9
        },
        cookies: {
          text:
            'This layer shows all the cookies connected to the selected website',
          items: 12
        },
        visited: {
          text:
            'This layer shows all the websites you have visited since installing the plugin',
          items: 5
        }
      },
      active: ['connected', 'companies', 'domains', 'subdomains', 'visited'],
      viewbox: [0, 0, 200, 200]
    }
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
    counter-reset: layer 7;
  }

  &__link {
    color: inherit;
  }

  &__item {
    width: 70%;
    padding-bottom: 70%;
    position: relative;
    perspective: 400px;
    transform: rotatex(70deg) rotateZ(30deg);
    transition: all 1s 0.2s;

    &:not(:first-child) {
      margin-top: -50%;
    }

    &.connected {
      background: $violet-1;
      color: $violet-1;
      // color: $color-text-inverse;
      z-index: 6;
    }

    &.companies {
      background: $violet-2;
      color: $violet-2;
      z-index: 5;
    }

    &.domains {
      background: $violet-3;
      color: $violet-3;
      // color: $color-text-inverse;
      z-index: 4;
    }

    &.subdomains {
      background: $violet-4;
      color: $violet-4;
      z-index: 3;
    }

    &.cookies {
      background: $violet-5;
      color: $violet-5;
      // color: $color-text-inverse;
      z-index: 2;
    }

    &.visited {
      background: $violet-6;
      color: $violet-6;
      // color: $color-text-inverse;
      z-index: 1;
    }

    &:hover {
      transform: rotatex(0deg) rotateZ(0deg) translateZ(200px);
      margin-bottom: 5%;
      z-index: 10;
      transition: all 1s;

      &:not(:first-child) {
        margin-top: -20%;
      }

      .nav {
        &__title {
          opacity: 1;
          transition: all 0.2s 1s;
          transform: translate(-100%, -50%);
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
    transform: translate(-2em, -50%);
    text-transform: capitalize;
    font-weight: normal;
    padding: 0.25em 0.5em;
    transition: all 0.2s 0s;

    &::before {
      position: relative;
      counter-increment: layer -1;
      content: counter(layer);
      padding-right: 1em;
    }
  }

  &__text {
    display: inline-block;
    margin: 0;
  }
}
</style>
