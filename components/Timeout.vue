<template>
  <div ref="background" class="container">
    <div :class="{ active: timeout }" class="popup">
      <div v-if="version === 'horizontal'" class="horizontal">
        <div class="website-line">
          <span class="website-line__bg" />
          <p class="website-line__content">
            Go to cookie.i-consent.network to see your cookie network
          </p>
        </div>
        <p class="press-button">
          Press the button to consent
        </p>
      </div>
      <div v-if="version === 'vertical'" class="vertical">
        <h1 class="popup__title header">
          About cookies in this installation
        </h1>
        <p class="body popup__content">
          <!-- eslint-disable -->
          When you browse the information in this installation, cookies and other
          technologies might share data to enhance your experience and show the
          personalized content of the creator. Visit our Privacy Policy (updated
          03/06/19) and Consent Tool to learn more, and make choices about the
          data used by us and our partners in the installation. By clicking
          “Accept” or by continuing to use the installation, you agree to this
          display of cookies and data.
        </p>
      </div>
    </div>
    <div :class="{ active: consent }" class="consent">
      <div v-if="version === 'horizontal'" class="horizontal">
        <h1 class="header">
          Do you actually know what you just consented to?
        </h1>
      </div>
      <div v-if="version === 'vertical'" class="vertical">
        <transition-group 
          tag="ul"
          class="list"
          v-bind:css="false"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
        >
          <li 
            v-for="(item, index) in consents" 
            :key="`index-${index}`" 
            v-bind:data-index="index" 
            class="list__item"
          >
            {{ item }}
          </li>
        </transition-group>
      </div>
    </div>
    <div :class="{ active: news }" class="news">
      <div v-if="version === 'horizontal'" class="horizontal">
        <img
          :src="
            require('~/assets/images/Mark Zuckerberg testified before a joint hearing of the Commerce and Judiciary Committees on Capitol Hill in Washington Tuesday Pablo Martinez MonsivaisAPREX Shutterstock.jpg')
          "
          alt=""
        />
      </div>
      <div v-if="version === 'vertical'" class="vertical">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image.src"
          class="news__image"
          :class="{ active: index <= activeCount }"
          :style="{ left: image.x, top: image.y }"
        />
      </div>
    </div>
    <div :class="{ active: explain }" class="explain">
      <div v-if="version === 'horizontal'" class="horizontal">
        <div class="item">
          <h1 class="header header--1">Visited Websites</h1>
          <p class="body">
            A list of all the websites you have visited since installing the
            plugin. You can select a website to inspect and see where your data
            ends up and what other websites you have used are also within reach
            of the companies using the selected webste to collect data on you.
          </p>
        </div>
        <div class="item">
          <h1 class="header header--1">Sub domains</h1>
          <p class="body">
            Sub-domains fulfill the role of logistic center. By setting up
            multiple sub-domains, it is easier to manage the data flows coming
            from the cookies. You can create different channels, making it
            easier to distinguish between types of data. When you inspect a
            website you can see the vast number of subdomains usualy used to
            streamline the flow of data from you to the companies several layers
            up.
          </p>
        </div>
        <div class="item">
          <h1 class="header header--1">Domains</h1>
          <p class="body">
            A domain has a registration in a public registrar, including a
            location and an owner. This information is used to connect domains
            to countries and companies. The country is important to know,
            becasue of different laws and regulations on privacy and the usage
            of data. Companies can use several domains to hide their true
            identity. When you select a website to inspect, you can see behind
            what domains companies are trying to hide their identity.
          </p>
        </div>
        <div class="item">
          <h1 class="header header--1">Companies</h1>
          <p class="body">
            Companies are interested in your data to build individual profiles
            and recognise patterns. Profiles and patterns can be sold when they
            indicate a high change of conversion.
          </p>
        </div>
        <div class="item">
          <h1 class="header header--1">Accessible Websites</h1>
          <p class="body">
            A list of all the websites you visited since installing the plugin
            that have placed cookies on your device. This line shows to what
            other websites the companies also have access. Effectively exposing
            their network.
          </p>
        </div>
      </div>
      <div v-if="version === 'vertical'" class="vertical"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    version: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      timeout: true,
      consent: false,
      news: false,
      explain: false,
      slideTime: 10000,
      activeCount: -1,
      width: 0,
      height: 0,
      leakImages: 39,
      audio: {
        consent: null,
        news: null,
        network: null,
        explain: null
      },
      consents: []
    }
  },
  computed: {
    images() {
      const images = []
      for (let i = 1; i < 39; i++) {
        const src = require(`~/assets/images/leaks/${i}.png`)
        const x = Math.floor(Math.random() * (this.width - src.width + 1))
        const y = Math.floor(Math.random() * (this.height - src.height + 1))
        images.push({
          src,
          x: `${x}px`,
          y: `${y}px`
        })
      }
      return images
    },
    ...mapState(['sequence', 'turned'])
  },
  watch: {
    explain: function(newValue) {
      if (newValue && this.version === 'vertical') {
        this.$refs.background.style.background = 'transparent'
      }
    },
    sequence: function(sequenceVal) {
      if (sequenceVal) {
        this.$store.dispatch('setTurned', false)
        this.timeout = false
        this.consent = true
        this.consents = [
          'You agree to interact with the installation for at least 3 minutes.',
          'You agree to share at least one picture of this project on one of your social media accounts, meaning Facebook, Twitter or Instagram.',
          'You agree to give up any rights to pictures, videos, sound and smell related to this installation.',
          'You agree to speak only in positive terms of this project.',
          'You agree to high five the person waiting in line behind you.',
          'You agree to mock all projects from French designers.',
          'If the designer is present you are not to approach him, unless you are writing a review.'
        ]
        if (this.version === 'horizontal') {
          this.audio.consent.play()
        }
        setTimeout(() => {
          this.consent = false
          this.news = true
          if (this.version === 'horizontal') {
            this.audio.news.play()
          }
          const imageCount = setInterval(() => {
            this.activeCount++
            if (this.activeCount === this.leakImages) {
              clearInterval(imageCount)
            }
          }, 250)
          setTimeout(() => {
            this.news = false
            this.explain = true
            if (this.version === 'horizontal') {
              this.audio.network.play()
              this.audio.network.onended = () => {
                this.audio.explain.play()
              }
            }
            setTimeout(() => {
              this.explain = false
              this.$store.dispatch('setTimeout', false)
              this.$store.dispatch('setSequence', false)
            }, this.slideTime)
          }, this.slideTime)
        }, this.slideTime)
      }
    }
  },
  mounted() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.audio.consent = new Audio(require('~/assets/audio/consent.wav'))
    this.audio.news = new Audio(require('~/assets/audio/news.wav'))
    this.audio.network = new Audio(require('~/assets/audio/network.wav'))
    this.audio.explain = new Audio(require('~/assets/audio/explain.wav'))
  },
  methods: {
    beforeEnter: function(el) {
      el.style.display = 'none'
    },
    enter: function(el, done) {
      const delay = el.dataset.index * 750
      setTimeout(function() {
        el.style.display = 'block'
      }, delay + 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $grey;
  // background: transparent;
  color: $primary;
  z-index: 100;

  & > :not(.active) {
    opacity: 0;
    transition: all 1s;
  }
  .active {
    opacity: 1;
    transition: all 1s;
  }
}

.popup {
  .vertical {
    padding: 6em 8rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  &__title {
    font-size: 15em;
    margin-bottom: 0.6em;
  }
  &__content {
    font-size: 8rem;
  }

  .horizontal {
    .website-line {
      &__content {
        font-size: 8rem;
        padding-top: 5px;
        color: $grey;
        display: inline-block;
        animation: textslide 30s infinite linear;
      }
      &__bg {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 12.5rem;
        background: $violet;
        z-index: -1;
      }
    }
    .press-button {
      position: fixed;
      right: 2.5em;
      bottom: 2.5em;
      text-align: right;
      font-size: 3rem;

      &::after {
        content: ' \02193';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 4rem;
        animation: updown 1s alternate infinite;
      }
    }
  }
}

.consent {
  .horizontal {
    font-size: 5em;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    width: 100%;
    text-align: center;
    font-size: 3.5em;
  }

  .vertical {
    font-size: 6em;
    position: relative;
    z-index: 1;
    margin-top: 2em;
    .list {
      list-style-type: none;
      box-sizing: border-box;
      padding: 2em;
      width: 80%;
      margin: auto;
      position: relative;

      &__item {
        margin-bottom: 1em;
      }
    }
  }
}

.news {
  .horizontal {
    img {
      position: absolute;
      width: 80%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__image {
    position: absolute;
    display: none;

    &.active {
      display: block;
    }
  }
}

.explain {
  height: 100vh;
  position: relative;
  .horizontal {
    display: flex;
    height: 100%;

    & > div {
      width: 20%;
      box-sizing: border-box;
      padding: 1em 2em;
      border: 1px solid $primary;

      .header {
        text-transform: uppercase;
      }

      .body {
        font-size: 4em;
      }
    }
  }
}
@keyframes updown {
  from {
    top: 50%;
  }
  to {
    top: 110%;
  }
}
@keyframes textslide {
  from {
    transform: translateX(125%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
