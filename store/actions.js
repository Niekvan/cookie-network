import * as types from './mutation-types'
const cookieValue = 'kibydaes6lhdu8w6c9srme'

export const setPending = ({ commit }, payload) => {
  commit(types.SET_PENDING, payload)
}

export const setChromeBrowser = ({ commit }, payload) => {
  commit(types.SET_CHROME_BROWSER, payload)
}

export const setInstalled = ({ commit }, payload) => {
  commit(types.SET_INSTALLED, payload)
}

export const nuxtServerInit = async function({ commit, state }, { app }) {
  app.$cookies.set('map-identifier', cookieValue)
  commit(types.SET_ID, cookieValue)
  // console.log('getting data') //eslint-disable-line
  const { data } = await app.$axios.$get(`${process.env.API_URL}/api/cookies`, {
    headers: {
      'access-token': process.env.LOCAL_API_KEY,
      'map-identifier': state.ID
    }
  })

  const pattern = new RegExp(/^(.+)?(\..+){2}$/)
  // console.log('map data') //eslint-disable-line
  data.map(item => {
    if (item.latitude && item.longtitude) {
      item.location = {
        lat: item.latitude,
        long: item.longtitude
      }
    }
    if (item.country === null) {
      item.country = 'undefined'
    }

    item.subDomain = pattern.test(item.sub_domain)
      ? item.sub_domain
      : `.${item.sub_domain}`

    return item
  })
  // console.log('map uniques') //eslint-disable-line
  const subDomains = data
    .map(item => item.subDomain)
    .filter((item, index, array) => array.indexOf(item) === index)

  const domains = data
    .map(item => item.domain)
    .filter((item, index, array) => array.indexOf(item) === index)

  const companies = data
    .map(item => item.company)
    .filter((item, index, array) => array.indexOf(item) === index)

  const websites = data
    .map(item => item.website)
    .filter((item, index, array) => array.indexOf(item) === index)

  const uniques = {
    visited: websites,
    subDomains,
    domains,
    companies,
    connected: websites
    // cookies: [],
    // source
  }
  // console.log('comitting') //eslint-disable-line
  commit(types.SET_COOKIES, data)
  commit(types.SET_UNIQUES, uniques)
}
