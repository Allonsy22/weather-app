import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

import weatherModule from './modules/weather'
import dialogModule from './modules/dialog'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    weatherModule,
    dialogModule
  },
  plugins: [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      removeItem: key => Cookies.remove(key)
    }
  })]
})
