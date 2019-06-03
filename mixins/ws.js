import { mapState } from 'vuex'
export default {
  data() {
    return {
      ws: null,
      openConnection: false,
      wsData: null,
      websiteIndex: null,
      interval: null,
      firstMessage: null
    }
  },
  computed: {
    ...mapState(['uniques', 'sequence', 'timeOut'])
  },
  created() {
    this.websiteIndex = Math.floor(this.uniques.visited.values.length / 2)
  },
  mounted() {
    this.startWs()
  },
  beforeDestroy() {
    if (this.ws) {
      this.ws.close()
    }
  },
  methods: {
    startWs() {
      this.ws = new WebSocket(process.env.WS_URL)
      this.ws.onopen = event => {
        this.openConnection = true
        clearInterval(this.interval)
      }
      this.ws.onclose = event => {
        this.openConnection = false
        console.log('reconnecting') //eslint-disable-line
        this.interval = setTimeout(() => {
          this.startWs()
        }, 300)
      }
      this.ws.onmessage = event => {
        this.wsData = event.data
        switch (event.data) {
          case 'hi':
            this.firstMessage = true
            break
          case 'timeout':
            this.$store.dispatch('setTimeout', true)
            break
          case 'start':
            if (this.timeOut) {
              this.$store.dispatch('setSequence', true)
            }
            break
          default:
            if (!this.sequence) {
              if (Number(event.data)) {
                if (
                  this.websiteIndex <
                  this.uniques.visited.values.length - 1
                ) {
                  this.websiteIndex++
                } else {
                  this.websiteIndex = 0
                }
              } else if (this.websiteIndex > 0) {
                this.websiteIndex--
              } else {
                this.websiteIndex = this.uniques.visited.values.length - 1
              }
            }
            break
        }
      }
    }
  }
}
