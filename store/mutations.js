import * as types from './mutation-types'

export default {
  [types.SET_PENDING](state, payload) {
    state.pending = payload
  },
  [types.SET_ID](state, payload) {
    state.ID = payload
  },
  [types.SET_COOKIES](state, payload) {
    state.cookies = payload
  },
  [types.SET_UNIQUES](state, payload) {
    state.uniques = payload
  },
  [types.SET_CHROME_BROWSER](state, payload) {
    state.isChrome = payload
  },
  [types.SET_INSTALLED](state, payload) {
    state.extensionInstalled = payload
  },
  [types.SET_TIMEOUT](state, payload) {
    state.timeOut = payload
  },
  [types.SET_SEQUENCE](state, payload) {
    state.sequence = payload
  }
}
