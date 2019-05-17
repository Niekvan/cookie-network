<template>
  <svg id="svg" ref="svg">
    <g
      class="container"
      :transform="`translate(${margins.left}, ${margins.top})`"
    >
      <g
        v-for="(layer, key, index) in uniques"
        :key="key"
        class="layer"
        :class="key"
      >
        <node
          v-for="(node, nodeIndex) in layer"
          :key="node"
          :node="node"
          :index="nodeIndex"
          :length="layer.length"
          :level="index"
          :levels="uniques.length"
          :screen="{ width, height }"
          :active="checkActive(node, key)"
          :style="opacity(node, key)"
          @click.native="handleClick(node, key)"
        />
      </g>
    </g>
  </svg>
</template>

<script>
import { mapActions } from 'vuex'
import Node from './graph/Node'
export default {
  components: {
    Node
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      margins: {
        left: 50,
        top: 50,
        right: 100,
        bottom: 50
      },
      connections: null,
      active: null
    }
  },
  computed: {
    uniques() {
      // const source = [this.ID]

      // const cookies = this.data.map(item => item.cookie)

      const subDomains = this.data
        .map(item => item.subDomain)
        .filter((item, index, array) => array.indexOf(item) === index)

      const domains = this.data
        .map(item => item.domain)
        .filter((item, index, array) => array.indexOf(item) === index)

      const companies = this.data
        .map(item => item.company)
        .filter((item, index, array) => array.indexOf(item) === index)

      const websites = this.data
        .map(item => item.website)
        .filter((item, index, array) => array.indexOf(item) === index)

      return {
        connected: websites,
        companies,
        domains,
        subDomains,
        visited: websites
        // cookies,
        // source
      }
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    checkActive(node, key) {
      if (this.connections) {
        return this.connections[key].includes(node)
      }
      return false
    },
    opacity(node, type) {
      if (this.connections) {
        return {
          opacity: this.connections[type].includes(node) ? 1 : 0.1
        }
      }
      return {
        opacity: 1
      }
    },
    handleResize() {
      this.width =
        this.$refs.svg.clientWidth - this.margins.left - this.margins.right
      this.height =
        this.$refs.svg.clientHeight - this.margins.top - this.margins.bottom
    },
    async handleClick(node, type) {
      if (this.active === node) {
        this.active = null
        this.connections = null
        return
      }
      this.setPending(true)
      this.active = node
      const { data, connected } = await this.$axios.$get('/api/connections', {
        params: {
          type,
          entry: node
        }
      })

      const cookies = data.map(item => item.cookie)

      const subDomains = data
        .map(item => item.subDomain)
        .filter((item, index, array) => array.indexOf(item) === index)

      const domains = data
        .map(item => item.domain)
        .filter((item, index, array) => array.indexOf(item) === index)

      const companies = data
        .map(item => item.company)
        .filter((item, index, array) => array.indexOf(item) === index)

      let visited = null

      if (type === 'visited' || type === 'connected') {
        visited = data
          .map(item => item.visited)
          .filter((item, index, array) => array.indexOf(item) === index)
      } else {
        visited = []
      }

      const connections = connected.map(item => item.connected)

      this.setPending(false)

      this.connections = {
        connected: connections,
        companies,
        domains,
        subDomains,
        cookies,
        visited
      }
    },
    ...mapActions(['setPending'])
  }
}
</script>

<style lang="scss" scoped>
#svg {
  position: absolute;
  height: 100%;
  width: 100%;
}
.connected {
  fill: $color-connected;
}

.companies {
  fill: $color-company;
}

.domains {
  fill: $color-domain;
}

.subDomains {
  fill: $color-subdomain;
}

.cookies {
  fill: $color-cookie;
}

.visited {
  fill: $color-visited;
}
</style>
