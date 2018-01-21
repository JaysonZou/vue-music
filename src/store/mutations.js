const mutations = {
    setSinger(state,singer){
        state.singer = singer
    },
    setRec(state,rec){
        state.rec = rec
    },
    setPlaying(state,flag){
        state.playing = flag
    },
    setFullScreen(state,flag){
        state.fullScreen = flag
    },
    setPlayList(state,list){
        state.playList = list
    },
    setCurrentIndex(state,index){
        state.currentIndex = index
    }
}
export default mutations