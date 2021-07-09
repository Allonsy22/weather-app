const state = {
  cardDialog: false
}

const mutations = {
  SET_CARD_DIALOG_STATUS: (state, payload) => (state.cardDialog = payload)
}

const actions = {
  openCardDialog: ({ commit }) => (commit('SET_CARD_DIALOG_STATUS', true)),
  closeCardDialog: ({ commit }) => (commit('SET_CARD_DIALOG_STATUS', false))
}

const getters = {
  cardDialog: state => state.cardDialog
}

const dialogModule = {
  state,
  mutations,
  actions,
  getters
}

export default dialogModule
