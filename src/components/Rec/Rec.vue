<template>
<transition name="slide">
  <div class="rec">
    <listview :title="title" :bg-image="bgImage" :songs="songlists"></listview>
  </div>
</transition>
</template>
<script>
import {mapGetters} from 'vuex'
import Listview from 'common/listview'

export default {
  computed: {
      title() {
        return this.rec.name
      },
      bgImage() {
        return this.rec.coverImgUrl
      },
      ...mapGetters([
        'rec'
      ])
    },
    data() {
      return {
        songlists:null
      }
    },
    created() {
        console.log(this.rec)
        this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.rec.id) {  
          this.$router.push('/recommend')
          return
        }
        this.axios.get('/api/playlist/detail',{
          params:{
            id:this.rec.id
          }
        }).then(res => {
          console.log(res.data.playlist)
          this.songlists = res.data.playlist.tracks
        })
      }
    },
    components: {
      Listview
    }
}
</script>
<style>
.rec{
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    background-color: #fff;
}
.rec::-webkit-scrollbar {display:none}
  .slide-enter-active, .slide-leave-active
    {transition: all 0.3s}

  .slide-enter, .slide-leave-to
    {transform: translate3d(100%, 0, 0)}
</style>


