<template>
  <div class="player" v-if="playList.length>0">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
      <img width="100%" height="100%" :src="currentSong.al.picUrl">
      </div>
      <div class="top">
        <div class="back" @click="back">
          <i class="iconfont icon-houtui"></i>
        </div>
        <h1 class="title" v-html="currentSong.name"></h1>
        <h2 class="subtitle" v-html="currentSong.al.name"></h2>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd">
              <img class="image" :src="currentSong.al.picUrl">
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="operators">
          <div class="icon i-left">
            <i class="iconfont icon-icon-6"></i>
          </div>
          <div class="icon i-left">
            <i class="iconfont icon-icon-4"></i>
          </div>
          <div class="icon i-center">
            <i class="iconfont icon-icon-2"></i>
          </div>
          <div class="icon i-right">
            <i class="iconfont icon-icon-3"></i>
          </div>
          <div class="icon i-right">
            <i class="iconfont icon-icon-1"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="icon">
        <img height="40" width="40" :src="currentSong.al.picUrl">
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p class="desc" v-html="currentSong.al.name"></p>
      </div>
      <div class="control"></div>
      <div class="control">
        <i class="iconfont icon-icon-"></i>
      </div>
    </div>
  </div>  
</template>

<script type="text/ecmascript-6">
import { mapGetters,mapMutations } from "vuex";

export default {

  computed: {
    ...mapGetters(["fullScreen", "playList","currentSong"])
  },
  methods:{
    back(){
      this.setFullScreen(false)
    },
    open(){
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen : 'SET_FULL_SCREEN'
    })
  }
};
</script>

<style scoped>
@import url(../../common/fonts2/iconfont.css);

.player .normal-player{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;background-color: black;
}
.player .normal-player .background{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: .6;
  filter: blur(20px);
}
.normal-player .top .back{
  position :absolute;
  top: 0;
  left: 6px;
  z-index: 50;
}
.normal-player .back .icon-houtui {
  display: block;
  padding: 9px;
  font-size: 25px;
  color: #31c27c;
  transform: rotate(-90deg);
}
.normal-player .top {
  position: relative;
  margin-bottom: 25px;

}
.normal-player .top .title {
  position: static;
  width: 80%;
  margin: 0 auto;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  color: white;
}
.normal-player .top .subtitle{
  line-height: 20px;
  text-align: center;
  font-size: 15px;
  color: white;
}
.middle {
  position: fixed;
  width: 100%;
  top: 80px;
  bottom: 170px;
  white-space: nowrap;
  font-size: 0;
}
.middle .middle-l {
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 80%;
}
.middle .cd-wrapper{
  position: absolute;
  left: 10%;
  top: 0;
  width: 80%;
  height: 100%;
}
.middle .cd {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 10px solid rgba(144, 144, 144, 0.1);
  border-radius: 50%;
}
.middle .image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.bottom {
  position: absolute;
  bottom: 50px;
  width: 100%;
}
.bottom .operators {
  display: flex;
  align-items: center;
}
.bottom .icon {
  flex: 1;
  color: #31c27c;
  /* &.disable
  color: $color-theme-d */
}
.bottom i{
  font-size: 30px;
}
.bottom .i-left {
  text-align: right;
}
.bottom .i-center {
  text-align: center;
  padding: 0 20px;
}
.bottom .i-center i {
  font-size: 40px;
}
.bottom .i-right {
  text-align: left;
}


.mini-player{
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: #eee;
      /* &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0 */
}
.mini-player .icon {
  flex: 0 0 40px;
  width: 40px;
  /* padding: 0 10px 0 20px; */
}
.mini-player .icon img{
  border-radius: 50%;
}
.mini-player .text{
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  line-height: 20px;
  overflow: hidden;
}
.mini-player .text .name {
  margin-bottom: 2px;
  font-size: 14px;
  color: black;
}
.mini-player .text .desc {
  font-size: 12px;
  color: black;
}
/* .mini-player .control{
  flex: 0 0 30px;
  width: 30px;
  padding: 0 10px;
} */
.mini-player .icon-icon- {
  font-size: 30px;
  color: #31c27c;
}

  /* .player

      .background
      .top
        .back
          
          .icon-back
            
        .title
        .subtitle
          
      .middle
        
        .middle-l
          
          .cd-wrapper
            
            .cd
              
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          
          .icon
            
            i
            
          .i-left
            
          .i-center
            i
          .i-right
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      
      .icon
        
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        
        .name
          
        .desc
          
      .control
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg) */
</style>