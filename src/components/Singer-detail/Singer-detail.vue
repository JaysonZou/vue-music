<template>
<transition name="slide">
  <div class="singer-detail">
    <listview :title="title" :bg-image="bgImage" :songs="songs" @select="selectItem"></listview>
  </div>
</transition>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import Listview from 'common/listview'

export default {
  computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.picUrl
      },
      ...mapGetters([
        'singer'
      ])
    },
    data() {
      return {
        songs: null,
      }
    },
    created() {
        this._getDetail()
    },
    methods: {
      selectItem(item,index){
        this.selectPlay({
          list:this.songs,
          index
        })
      },
      ...mapActions([
        'selectPlay'
      ]),
      _getDetail() {
        if (!this.singer.id) {  //back to singer
          this.$router.push('/singer')
          return
        }
        this.axios.get('/api/artists',{
          params:{
            id:this.singer.id
          }
        }).then(res => {
          this.songs = res.data.hotSongs
          console.log(this.songs)
        })
      }
    },
    components: {
      Listview
    }
}
</script>
<style>
.singer-detail{
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    background-color: #fff;
}
.loading-container{
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
.singer-detail::-webkit-scrollbar {display:none}
  .slide-enter-active, .slide-leave-active
    {transition: all 0.3s}

  .slide-enter, .slide-leave-to
    {transform: translate3d(100%, 0, 0)}
</style>

