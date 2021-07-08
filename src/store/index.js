import Vue from 'vue'
import Vuex from 'vuex'

import weatherModule from './modules/weather'
import dialogModule from './modules/dialog'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    weatherModule,
    dialogModule
  }
})
