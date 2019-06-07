<template>
  <div class="page">
    <navbar title="Explore" />
    <div class="page__content">
      <template v-if="isChrome && extensionInstalled">
        <graph class="graph" :data="formattedCookies" />
        <div class="loading" :class="{ pending: pending }" />
      </template>
      <template v-else-if="isChrome && !extensionInstalled">
        <div class="error">
          <h1 class="header header--1">
            Please install the extension from the chrome webstore.
          </h1>
          <p class="body">
            The cookie network website requires a plugin in order to show you
            your data. Please follow
            <a
              href="https://www.google.com/chrome/"
              content="noreferer"
              class="link"
            >
              this link
            </a>
            and install the plugin from the chrome webstore.
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
import Navbar from '~/components/Navbar.vue'
import Graph from '~/components/Graph.vue'

import { mapState } from 'vuex'

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
    background: rgba($black-indigo, 0.2);

    &.pending {
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      opacity: 1;
    }
  }
}
</style>
