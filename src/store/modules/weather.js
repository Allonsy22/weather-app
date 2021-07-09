import weatherAPI from '@/utils/weatherAPI'
import { fitData, fitTemperature } from '@/utils'

const state = {
  currentWeather: null,
  dailyTemp: null,
  citiesList: [],
  loading: false
}

const mutations = {
  SET_CURRENT_WEATHER: (state, payload) => (state.currentWeather = payload),
  SET_CITIES_LIST: (state, payload) => (state.citiesList = payload),
  SET_CURRENT_DAILY_TEMPERATURE: (state, payload) => (state.dailyTemp = payload),
  SET_LOADING_STATUS: (state, payload) => (state.loading = payload)
}

const actions = {
  async getWeatherByName ({ dispatch, commit }, cityName) {
    dispatch('startPending')
    try {
      const result = await weatherAPI.getByName(cityName)
      const weatherData = fitData(result.data)
      commit('SET_CURRENT_WEATHER', weatherData)
      dispatch('stopPending')
    } catch (error) {
      console.log(error)
      dispatch('stopPending')
    }
  },
  addCityToList ({ dispatch, commit, state }) {
    dispatch('removeCityFromList', state.currentWeather.id) // if the city is in the list, remove it
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
          const weatherData = fitData(result.data)
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
  showDetails ({ commit, state }, cityId) {
    const pickedCity = state.citiesList.find(city => {
      return city.id === cityId
    })
    commit('SET_CURRENT_WEATHER', pickedCity)
  },
  async getDailyTemperature ({ dispatch, commit }, coords) {
    dispatch('startPending')
    try {
      const result = await weatherAPI.getTemperature(coords)
      const dailyTemp = fitTemperature(result.data)
      commit('SET_CURRENT_DAILY_TEMPERATURE', dailyTemp)
      dispatch('stopPending')
    } catch (error) {
      console.log(error)
      dispatch('stopPending')
    }
  },
  startPending: ({ commit }) => (commit('SET_LOADING_STATUS', true)),
  stopPending: ({ commit }) => (commit('SET_LOADING_STATUS', false))
}

const getters = {
  currentWeather: state => state.currentWeather,
  dailyTemp: state => state.dailyTemp,
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
