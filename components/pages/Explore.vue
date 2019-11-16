<template>
  <div class="page">
    <navbar title="Explore" />
    <div class="page__content">
      <template v-if="isChrome && extensionInstalled">
        <graph
          v-if="formattedCookies.length"
          class="graph"
          :data="formattedCookies"
        />
        <div v-else class="no-data">
          <div class="error">
            <h1 class="header header--1">
              You didn't visit any websites with cookies since installing the
              plugin
            </h1>
          </div>
        </div>
        <div class="loading" :class="{ pending: pending }">
          <div class="loading__loader" />
        </div>
      </template>
      <template v-else-if="isChrome && !extensionInstalled">
        <div class="error">
          <h1 class="header header--1">
            Please install the extension from the chrome webstore.
          </h1>
          <p class="body">
            Unforunately the plugin cannot not be installed at the moment.
            Google has removed hte plugin due to a violation of their privacy
            agreement.
            <!-- The cookie network website requires a plugin in order to show you
            your data. Please follow
            <a
              href="https://chrome.google.com/webstore/detail/lhlmojgecghoebjacoemcdghelcfgmbf"
              content="noreferer"
              class="link"
            >
              this link
            </a>
            and install the plugin from the chrome webstore. -->
          </p>
        </div>
      </template>
      <template v-else>
        <div class="error">
          <h1 class="header header--1">
            Please install the Chrome webbrowser.
          </h1>
          <p class="body">
            Unforunately, the cookie network only functions in the Chrome
            webbrowser for now. Please follow
            <a
              href="https://www.google.com/chrome/"
              content="noreferer"
              class="link"
            >
              this link
            </a>
            to install the Chrome browser and see which companies are following
            you.
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Navbar from '~/components/Navbar.vue'
import Graph from '~/components/Graph.vue'

export default {
  components: {
    Navbar,
    Graph
  },
  computed: {
    formattedCookies() {
      const pattern = new RegExp(/^(.+)?(\..+){2}$/)
      return this.cookies.map(item => {
        item.subDomain = pattern.test(item.sub_domain)
          ? item.sub_domain
          : `.${item.sub_domain}`
        return item
      })
    },
    ...mapState(['cookies', 'pending', 'isChrome', 'extensionInstalled'])
  }
}
</script>

<style lang="scss" scoped>
.page {
  background: $grey;
  left: 55px;
  overflow: hidden;

  &__content {
    padding: $grid-spacing-top $grid-spacing-top;

    .error {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100vh;
      padding-left: $grid-spacing-side;
    }
  }

  .loading {
    position: fixed;
    display: block;
    left: 50%;
    top: 50%;
    right: 50%;
    bottom: 50%;
    transition: all 0.2s;
    opacity: 0;
    background: $grey;

    &__loader {
      width: 10em;
      height: 10em;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      &::before {
        content: '';
        width: 1em;
        height: 1em;
        border-radius: 50%;
        position: absolute;
        display: block;
        background: $violet;
        top: 0;
        left: 0;
        transform: translate(4.5em, 0);
        animation: dotRect 2s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
      }

      &::after {
        content: 'loading';
        position: absolute;
        top: calc(100% + 1em);
        left: 50%;
        transform: translateX(-50%);
        font-size: 3em;
        text-transform: uppercase;
      }
    }
    &.pending {
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      opacity: 1;
    }
  }
}
@keyframes dotRect {
  25% {
    transform: translate(9em, 4.5em);
  }
  50% {
    transform: translate(4.5em, 9em);
  }
  75% {
    transform: translate(0, 4.5em);
  }
  100% {
    transform: translate(4.5em, 0);
  }
}
</style>
