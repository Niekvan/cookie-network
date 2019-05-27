<template>
  <svg id="svg" ref="svg">
    <g
      class="container"
      :transform="`translate(${margins.left}, ${margins.top})`"
    >
      <g
        v-for="(company, index) in lines"
        :key="`${company.company}-lines`"
        class="lines"
        :class="[company.company, `lines--${index + 1}`]"
      >
        <connection-line
          v-for="line in company.values"
          :key="line.filter"
          :data="line"
          class="line"
          :class="[line.filter, line.type]"
        />
      </g>
      <g
        v-for="layer in nodes"
        :key="layer.key"
        class="layer"
        :class="layer.key"
      >
        <node
          v-for="node in layer.values"
          :key="node.value"
          :ref="`${node.value}-${layer.key}`"
          :node="node"
          :active="checkActive(node.value, layer.key)"
          :style="opacity(node.value, layer.key)"
          @click.native="handleClick(node.value, layer.key)"
        />
      </g>
      <g v-if="active" class="cookies" />
    </g>
  </svg>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Node from './graph/Node'
import Line from './graph/Line'
export default {
  components: {
    Node,
    connectionLine: Line
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
        left: 150,
        top: 50,
        right: 0,
        bottom: 150
      },
      connections: null,
      lines: null,
      active: null,
      raw: null
    }
  },
  computed: {
    nodes() {
      return Object.keys(this.uniques).map((key, index, array) => {
        const item = this.uniques[key]
        const layers = array.length
        return {
          values: this.calcPosition(item, index, layers, key),
          key
        }
      })
    },
    ...mapState(['uniques'])
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    calcPosition(data, layer, layers, key) {
      return data.map((item, index, array) => {
        const length = array.length
        const y = (this.height / length) * index
        const x = (this.width / layers) * layer
        return {
          value: item,
          x,
          y
        }
      })
    },
    checkActive(node, key) {
      if (key === 'visited') {
        return true
      } else if (this.connections) {
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
        this.lines = null
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

      if (type === 'company') {
        visited = []
      } else {
        visited = data
          .map(item => item.visited)
          .filter((item, index, array) => array.indexOf(item) === index)
      }

      const connectedWebsites = connected.map(item => item.connected)

      const lines = []

      companies.forEach(company => {
        const filtered = data.filter(item => item.company === company)
        const cc = connected
          .filter(item => item.company === company)
          .map(item => {
            if (item.connected !== 'undefined') {
              return {
                filter: `${item.company}-${item.connected}`,
                source: this.$refs[`${item.company}-companies`],
                target: this.$refs[`${item.connected}-connected`],
                type: 'cc'
              }
            } else {
              return {
                filter: 'nothing'
              }
            }
          })
        const cd = filtered.map(item => {
          return {
            filter: `${item.company}-${item.domain}`,
            target: this.$refs[`${item.company}-companies`],
            source: this.$refs[`${item.domain}-domains`],
            type: 'cd'
          }
        })
        const ds = filtered.map(item => {
          return {
            filter: `${item.domain}-${item.subDomain}`,
            target: this.$refs[`${item.domain}-domains`],
            source: this.$refs[`${item.subDomain}-subDomains`],
            type: 'ds'
          }
        })
        const sv = filtered.map(item => {
          return {
            filter: `${item.subDomain}-${item.visited}`,
            target: this.$refs[`${item.subDomain}-subDomains`],
            source: this.$refs[`${item.visited}-visited`],
            type: 'sv'
          }
        })
        const values = [...cd, ...ds, ...sv, ...cc].filter(
          (item, index, array) =>
            array.map(item => item.filter).indexOf(item.filter) === index
        )
        lines.push({
          values,
          company
        })
      })

      this.setPending(false)

      this.connections = {
        connected: connectedWebsites,
        companies,
        domains,
        subDomains,
        cookies,
        visited
      }
      this.lines = lines
      this.raw = { data, connected }
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
.layer {
  fill: $primary;
  // &.connected {
  //   fill: $color-connected;
  // }

  // &.companies {
  //   fill: $color-company;
  // }

  // &.domains {
  //   fill: $color-domain;
  // }

  // &.subDomains {
  //   fill: $color-subdomain;
  // }

  // &.cookies {
  //   fill: $color-cookie;
  // }

  // &.visited {
  //   fill: $color-visited;
  // }
}

.lines {
  stroke-width: 3px;
  // opacity: 0.5;

  &--1 {
    stroke: $blue;
  }
  &--2 {
    stroke: $yellow;
  }
  &--3 {
    stroke: $orange;
  }

  &--4 {
    stroke: $green;
  }
}
</style>
