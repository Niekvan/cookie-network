<template>
  <div ref="background" class="container">
    <transition-group name="fade" mode="out-in">
      <div v-if="timeout" key="popup" class="popup">
        <h1 class="popup__title header">
          About cookies in this installation
        </h1>
        <p class="body popup__content">
          When you browse on this installation, cookies and other technologies
          might collect data to enhance your experience and personalize the
          content and advertising you see. Visit our Privacy Policy (updated
          03/06/19) and Consent Tool to learn more, and make choices about the
          data used by us and our partners in the installation. By clicking
          “Accept” or by continuing to use the installation, you agree to this
          use of cookies and data.
        </p>
      </div>
      <div v-if="consent" key="consent" class="consent">
        <div v-if="version === 'horizontal'" class="horizontal">
          <h1 class="header">
            Do you realize for what you just gave consent?
          </h1>
        </div>
        <div v-if="version === 'vertical'" class="vertical">
          <ul class="list">
            <li class="list__item">
              You agree to interact with the installation for at least 3
              minutes.
            </li>
            <li class="list__item">
              You agree to share at least one picture of this project on one of
              your social media accounts, meaning Facebook, Twitter or
              Instagram.
            </li>
            <li class="list__item">
              You agree to give up any rights to pictures, videos, sound and
              smell related to this installation.
            </li>
            <li class="list__item">
              You agree to speak only in positive terms of this project.
            </li>
            <li class="list__item">
              You agree to high five the person waiting in line behind you.
            </li>
            <li class="list__item">
              You agree to mock all projects from French designers.
            </li>
            <li class="list__item">
              If the designer is present you are not to approach him, unless you
              are writing a review.
            </li>
          </ul>
        </div>
      </div>
      <div v-if="news" key="news" class="news">
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
      <div v-if="explain" key="explain" class="explain">
        <div v-if="version === 'horizontal'" class="horizontal">
          <div class="item">
            <h1 class="header header--1">Visited Websites</h1>
          </div>
          <div class="item">
            <h1 class="header header--1">Sub domains</h1>
          </div>
          <div class="item">
            <h1 class="header header--1">Domains</h1>
          </div>
          <div class="item">
            <h1 class="header header--1">Companies</h1>
          </div>
          <div class="item">
            <h1 class="header header--1">Accesible Websites</h1>
          </div>
        </div>
        <div v-if="version === 'vertical'" class="vertical"></div>
      </div>
    </transition-group>
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
      leakImages: 39
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
    ...mapState(['sequence'])
  },
  watch: {
    explain: function(newValue) {
      if (newValue && this.version === 'vertical') {
        this.$refs.background.style.background = 'transparent'
      }
    },
    sequence: function(sequenceVal) {
      if (sequenceVal) {
        this.timeout = false
        this.consent = true
        setTimeout(() => {
          this.consent = false
          this.news = true
          const imageCount = setInterval(() => {
            this.activeCount++
            if (this.activeCount === this.leakImages) {
              clearInterval(imageCount)
            }
          }, 500)
          setTimeout(() => {
            this.news = false
            this.explain = true
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
  color: $primary;
  z-index: 100;
}

.popup {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 5rem 7.5rem;
  border: 5px solid $orange;
  border-radius: 5px;
  color: $primary;
  transform: translate(-50%, -50%);
  &__title {
    font-size: 5em;
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
      // background: $grey-light;
      position: relative;

      // &::before {
      //   content: '';
      //   height: 100%;
      //   width: 100%;
      //   background: $grey-dark;
      //   position: absolute;
      //   top: 1em;
      //   left: -1em;
      //   z-index: -1;
      // }

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
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    height: 100%;

    & > div {
      border: 1px solid $primary;
    }
  }
}
</style>
