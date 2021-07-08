import weatherAPI from '@/utils/weatherAPI'
import Weather from '@/utils/Weather'

const state = {
  currentWeather: null,
  citiesList: [],
  loading: false
}

const mutations = {
  SET_CURRENT_WEATHER (state, payload) {
    state.currentWeather = payload
  },
  SET_CITIES_LIST (state, payload) {
    state.citiesList = payload
  },
  SET_LOADING_STATUS (state, payload) {
    state.loading = payload
  }
}

const actions = {
  getWeatherByName ({ dispatch, commit }, name) {
    dispatch('startPending')
    weatherAPI.getByName(name)
      .then(result => {
        const weatherData = new Weather(result.data).getData()
        commit('SET_CURRENT_WEATHER', weatherData)
        dispatch('stopPending')
      })
      .catch(error => {
        console.log(error)
        dispatch('stopPending')
      })
  },
  addCityToList ({ dispatch, commit, state }) {
    dispatch('removeCityFromList', state.currentWeather.id) // if a city is in the list, remove it
    const newCitiesList = [state.currentWeather, ...state.citiesList]
    commit('SET_CITIES_LIST', newCitiesList)
  },
  removeCityFromList ({ commit, state }, cityId) {
    const newCitiesList = state.citiesList.filter(city => {
      return city.id !== cityId
    })
    commit('SET_CITIES_LIST', newCitiesList)
  },
  updateWeatherData ({ dispatch, commit }, cityId) {
    return new Promise((resolve, reject) => {
      dispatch('startPending')
      weatherAPI.getById(cityId)
        .then(result => {
          const weatherData = new Weather(result.data).getData()
          commit('SET_CURRENT_WEATHER', weatherData)
          dispatch('addCityToList')
          dispatch('stopPending')
          resolve()
        })
        .catch(error => {
          console.log(error)
          dispatch('stopPending')
          reject(error)
        })
    })
  },
  startPending ({ commit }) {
    commit('SET_LOADING_STATUS', true)
  },
  stopPending ({ commit }) {
    commit('SET_LOADING_STATUS', false)
  }
}

const getters = {
  currentWeather: state => state.currentWeather,
  citiesList: state => state.citiesList,
  loading: state => state.loading
}

const weatherModule = {
  state,
  mutations,
  actions,
  getters
}

export default weatherModule
