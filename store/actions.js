import * as types from './mutation-types'

export const setPending = ({ commit }, payload) => {
  commit(types.SET_PENDING, payload)
}

export const nuxtServerInit = async function({ commit, state }, { app }) {
  const cookie = await app.$cookies.get('map-identifier')
  if (cookie) {
    commit(types.SET_ID, cookie)
  } else {
    const newId =
      Math.random()
        .toString(36)
        .substr(2, 15) +
      Math.random()
        .toString(36)
        .substr(2, 15)
    app.$cookies.set('map-identifier', newId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 52 * 5
    })
    commit(types.SET_ID, newId)
  }

  const { data } = await app.$axios.$get(`${process.env.API_URL}/api/cookies`, {
    headers: {
      'access-token': process.env.LOCAL_API_KEY,
      'map-identifier': state.ID
    }
  })

  const pattern = new RegExp(/^(.+)?(\..+){2}$/)

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
    connected: websites,
    companies,
    domains,
    subDomains,
    cookies: [],
    visited: websites
    // source
  }

  commit(types.SET_COOKIES, data)
  commit(types.SET_UNIQUES, uniques)
}
