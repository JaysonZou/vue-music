<template>
  <div class="recommend">
      <div class="swiper-container">
        <swiper :sum="6" v-if="bannerlist">
          <img v-for="x of bannerlist" :src="x.pic" class="swiper-item" style="width:100vw;height:25vh;">
        </swiper>
      </div>
      <div class="options">
          <span><i class="iconfont icon-geshou"></i>歌手</span>
          <span><i class="iconfont icon-paihang"></i>排行</span>
          <span><i class="iconfont icon-diantai"></i>电台</span>
          <span><i class="iconfont icon-fenlei"></i>分类歌单</span>
          <span><i class="iconfont icon-video"></i>MV</span>
          <span><i class="iconfont icon-zhuanji"></i>数字专辑</span>
      </div>
      <div class="rec-list" v-cloak>
          <h3>歌单推荐</h3>
          <ul class="music-list" v-if="bannerlist">
            <li class="play-item" v-for="i in musicList" @click="selectItem(i)">
              <img v-lazy="i.coverImgUrl" alt="">
              <p>{{i.copywriter}}</p>
            </li>
          </ul>
      </div>
      <div class="loading-container" v-show="!musicList">
        <loading></loading>
      </div>
      <router-view></router-view>
  </div>

</template>

<script>
import Swiper from 'common/swiper.vue'
import Loading from 'common/loading/loading'
import {mapMutations} from 'vuex'

export default {
  data() {
    return {
      bannerlist: null,
      musicList:null
    };
  },
  created() {
    this._getBanner();
    setTimeout(() => {
      this._getMusicList()
      }, 300); 
  },
  methods: {
    _getBanner() {
      this.axios.get("/api/banner").then(res => {
        this.bannerlist = res.data.banners;
        console.log(res.data.banners);
      })
    },
    _getMusicList(){
      this.axios.get("/api/top/playlist/highquality?limit=30").then(res => {
        this.musicList = []
        this.musicList = this.musicList.concat(res.data.playlists)
        console.log(res.data.playlists)
      })
    },
    selectItem(list){
      this.$router.push({
        path: `recommend/${list.id}`
      })
      this.setRec(list)
    },
    ...mapMutations([
      'setRec'
    ])
  },
  components: {
    Swiper,
    Loading
  }
};
</script>

<style scoped>
@import url(../../common/fonts/iconfont.css);

[v-cloak] {display: none;}
.recommend{
  margin-top: 83px;
  width: 100%;
}

.swiper-container{
  /* height: 30vh; */
  width: 100%;
}

.options {
  display: flex;
  width: 100%;
  flex-direction: row;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  height: 80px;
  margin: 10px 0;
}
.options span {
  width: 33.33%;
  height: 20px;
  font-size: 18px;
  padding-top: 5px;
  padding-bottom: 15px;
}
.options span > i {
  margin: 0 10px;
  color: #31c27c;
  font-size: 25px;
}
.rec-list h3{
  text-align: center;
  margin-bottom: 20px;
}
.music-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.play-item{
  display: flex;
  flex-direction: column;
  width: 33%;
  /* padding: 3px; */
  margin-bottom: 10px;
  /* height: 30vh; */
}
.play-item>img {
  display: block;
  width: 100%;
  /* height: 70%; */
}
.play-item>p{
  padding: 3px;
  font-size: 15px;
}
.loading-container{
  position: absolute;
  width: 100%;
  top: 70%;
  transform: translateY(-50%);
}       

</style>
