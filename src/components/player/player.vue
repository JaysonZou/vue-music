<template>
  <div class="player" v-if="playList.length>0">
    <transition name="normal">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
      <img width="100%" height="100%" :src="currentSong.al.picUrl">
      </div>
      <div class="top">
        <div class="back" @click="back">
          <i class="iconfont icon-houtui"></i>
        </div>
        <h1 class="title" v-html="currentSong.name"></h1>
        <h2 class="subtitle" v-html="currentSong.ar[0].name"></h2>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrapper">
            <div class="cd" :class="rta">
              <img class="image" :src="currentSong.al.picUrl">
            </div>
          </div>
          <scroll class="playing-lyric-wrapper" :data="currentLyric && currentLyric.lines" ref="lyricList" v-if="currentLyric">
              <div>
                <p ref="lyricLine" class="text" :class="{'current': currentLineNum === index}" v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </scroll>
        </div>
      </div>
      <div class="bottom">
        <div class="progress-wrapper">
          <span class="time time-l">{{format(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
          </div>
          <span class="time time-r">{{format(songDuration)}}</span>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i class="iconfont icon-icon-6"></i>
          </div>
          <div class="icon i-left">
            <i @click="prev" class="iconfont icon-icon-4"></i>
          </div>
          <div class="icon i-center">
            <i @click="togglePlaying" :class="playIcon" class="iconfont"></i>
          </div>
          <div class="icon i-right">
            <i @click="next" class="iconfont icon-icon-3"></i>
          </div>
          <div class="icon i-right">
            <i class="iconfont icon-icon-1"></i>
          </div>
        </div>
      </div>
    </div>
    </transition>
    <transition name="mini">
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="icon" :class="rta">
        <img height="40" width="40" :src="currentSong.al.picUrl">
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p class="desc" v-html="currentSong.ar[0].name"></p>
      </div>
      <div class="control">
        <i @click.stop="togglePlaying" class="iconfont" :class="playIcon"></i>
      </div>
      <div class="control">
        <i class="iconfont icon-icon-"></i>
      </div>
    </div>
    </transition>
    <audio :src="curSong" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
  </div>  
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from "vuex";
import Scroll from "common/scroll/scroll";
import progressBar from "common/progress-bar.vue";
import LyricParser from "lyric-parser";

export default {
  data() {
    return {
      curSong: "",
      songReady: false,
      currentTime: 0,
      songDuration: 0,
      currentLyric: null,
      currentLineNum: 0
    };
  },
  watch: {
    currentIndex() {
      this._getSongUrl().then(res => {
        this.curSong = res.data.data[0].url;
      });
    },
    curSong() {
      setTimeout(() => {
        this.$refs.audio.play();
      }, 1000);
      this._getLyric()
        .then(res => {
          if (this.currentLyric) {
            this.currentLyric.stop();
          }
          this.currentLyric = new LyricParser(
            res.data.lrc.lyric,
            this.handlerLyric
          );
          if (this.playing) {
            this.currentLyric.play();
          }
        })
        .catch(() => {
          this.currentLyric = null;
          this.currentLineNum = 0;
        });
    },
    playing(newPlaying) {
      if (!this.songReady) return;
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    }
  },
  computed: {
    playIcon() {
      return this.playing ? "icon-icon-5" : "icon-icon-2";
    },
    rta() {
      return this.playing ? "play" : "play pause";
    },
    percent() {
      return this.currentTime / this.songDuration;
    },
    ...mapGetters([
      "fullScreen",
      "playList",
      "currentSong",
      "playing",
      "currentIndex"
    ])
  },

  methods: {
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    ready() {
      this.songReady = true;
    },
    error() {
      this.songReady = true;
    },
    end() {
      this.next();
    },
    next() {
      if (!this.songReady) return;
      let index = this.currentIndex + 1;
      if (index === this.playList.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlaying();
      }
      this.songReady = false;
    },
    prev() {
      if (!this.songReady) return;
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playList.length - 1;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlaying();
      }
      this.songReady = false;
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
      this.songDuration = e.target.duration;
    },
    format(interval) {
      interval = interval | 0;
      const min = (interval / 60) | 0;
      const sec = this._pad(interval % 60);
      return `${min}:${sec}`;
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    onProgressBarChange(percent) {
      const currentTime = this.songDuration * percent;
      this.$refs.audio.currentTime = currentTime;
      if (!this.playing) {
        this.togglePlaying();
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENT_INDEX"
    }),
    togglePlaying() {
      if (!this.songReady) return;
      this.setPlayingState(!this.playing);
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },
    _getSongUrl: async function() {
      var result = await this.axios.get("/api/song/url", {
        params: { id: this.currentSong.id }
      });
      return result;
    },
    _getLyric: async function() {
      var lyric = await this.axios.get("/api/lyric", {
        params: { id: this.currentSong.id }
      });
      return lyric;
    },
    handlerLyric(lineNum, txt) {
      this.currentLineNum = lineNum.lineNum;
      if (this.currentLineNum > 1) {
        let lineEl = this.$refs.lyricLine[this.currentLineNum - 1];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
    }
  },
  components: {
    progressBar,
    Scroll
  }
};
</script>

<style scoped>
@import url(../../common/fonts2/iconfont.css);

.player .normal-player {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background-color: black;
}
.player .normal-player .background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.6;
  filter: blur(20px);
}
.normal-player .top {
  position: relative;
  margin-bottom: 25px;
}
.normal-player .top .back {
  position: absolute;
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
.normal-player .top .title {
  position: static;
  width: 80%;
  margin: 0 auto;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  color: white;
}
.normal-player .top .subtitle {
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
.middle .cd-wrapper {
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
.middle .playing-lyric-wrapper {
  width: 80%;
  height: 15vh;
  margin: 20px auto 0 auto;
  overflow: hidden;
  text-align: center;
}
.middle .text {
  font-size: 15px;
  line-height: 5vh;
  color: white;
}
.middle .text.current {
  color: #31c27c;
}
.bottom {
  position: absolute;
  bottom: 50px;
  width: 100%;
}
.bottom .progress-wrapper {
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0px auto;
  padding: 10px 0;
}
.bottom .progress-wrapper .time {
  color: #ccc;
  font-size: 8px;
  flex: 0 0 30px;
  line-height: 30px;
  width: 30px;
}
.bottom .time .time-l {
  text-align: left;
}
.bottom .time .time-r {
  text-align: right;
}
.bottom .progress-bar-wrapper {
  flex: 1;
}
.bottom .operators {
  display: flex;
  align-items: center;
}
.bottom .icon {
  flex: 1;
  color: #31c27c;
}
.bottom i {
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
.normal-enter-active,
.normal-leave-active {
  transition: all 0.4s;
}
.normal-enter-active,
.normal-leave-active .top {
  transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
}
.normal-enter-active,
.normal-leave-active .bottom {
  transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
}
.normal-enter,
.normal-leave-to {
  opacity: 0;
}
.normal-enter,
.normal-leave-to .top {
  transform: translate3d(0, -100px, 0);
}
.normal-enter,
.normal-leave-to .bottom {
  transform: translate3d(0, 100px, 0);
}

.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: #eee;
}
.mini-enter-active,
.mini-leave-active {
  transition: all 0.4s;
}
.mini-enter,
.mini-leave-to {
  opacity: 0;
}
.mini-player .icon {
  flex: 0 0 40px;
  width: 40px;
  margin: 0 10px;
}
.mini-player .icon img {
  border-radius: 50%;
}
.mini-player .text {
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
.mini-player .iconfont {
  font-size: 33px;
  color: #31c27c;
  margin-right: 10px;
}
.play {
  animation: rotate 20s linear infinite;
}
.pause {
  animation-play-state: paused;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>