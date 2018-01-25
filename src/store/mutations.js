import * as types from './mutation-types'

const mutations = {
    setSinger(state,singer){
        state.singer = singer
    },
    setRec(state,rec){
        state.rec = rec
    },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playList = list
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }
}

export default mutations