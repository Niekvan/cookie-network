import * as types from './mutation-types'

export const setPending = ({ commit }, payload) => {
  commit(types.SET_PENDING, payload)
}

export const setChromeBrowser = ({ commit }, payload) => {
  commit(types.SET_CHROME_BROWSER, payload)
}

export const setInstalled = ({ commit }, payload) => {
  commit(types.SET_INSTALLED, payload)
}

export const nuxtServerInit = async function ({ commit, state }, { app }) {
  // console.log('getting cookie') //eslint-disable-line
  const cookie = await app.$cookies.get('map-identifier')
  // console.log('have cookie') //eslint-disable-line
  if (cookie) {
    commit(types.SET_ID, cookie)
  } else {
    const newId =
      Math.random().toString(36).substr(2, 15) +
      Math.random().toString(36).substr(2, 15)
    app.$cookies.set('map-identifier', newId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 52 * 5,
    })
    commit(types.SET_ID, newId)
  }
  // console.log('getting data') //eslint-disable-line
  const { data } = await app.$axios.$get(`${process.env.API_URL}/api/cookies`, {
    headers: {
      'access-token': process.env.LOCAL_API_KEY,
      'map-identifier': state.ID,
    },
  })

  const pattern = new RegExp(/^(.+)?(\..+){2}$/)
  // console.log('map data') //eslint-disable-line
  data.map((item) => {
    if (item.latitude && item.longtitude) {
      item.location = {
        lat: item.latitude,
        long: item.longtitude,
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
    .map((item) => item.subDomain)
    .filter((item, index, array) => array.indexOf(item) === index)

  const domains = data
    .map((item) => item.domain)
    .filter((item, index, array) => array.indexOf(item) === index)

  const companies = data
    .map((item) => item.company)
    .filter((item, index, array) => array.indexOf(item) === index)

  const websites = data
    .map((item) => item.website)
    .filter((item, index, array) => array.indexOf(item) === index)

  const uniques = {
    connected: websites,
    companies,
    domains,
    subDomains,
    // cookies: [],
    visited: websites.sort((a, b) => {
      return a.length - b.length
    }),
    // source
  }
  // console.log('comitting') //eslint-disable-line
  commit(types.SET_COOKIES, data)
  commit(types.SET_UNIQUES, uniques)
}
