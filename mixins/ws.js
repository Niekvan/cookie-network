import { mapState } from 'vuex'
export default {
  data() {
    return {
      ws: null,
      openConnection: false,
      wsData: null,
      websiteIndex: null
    }
  },
  computed: {
    ...mapState(['uniques'])
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
      }
      this.ws.onmessage = event => {
        this.wsData = event.data
        if (Number(event.data)) {
          this.websiteIndex++
        } else {
          this.websiteIndex--
        }
      }
    }
  }
}
