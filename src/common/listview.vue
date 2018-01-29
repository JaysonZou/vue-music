<template>
<div class="listview">
  <!-- <div class="top">
  <div class="back" @click="back">
      <i class="icon-back">&lt;</i>
  </div>
  <h2 class="title" v-html="title"  ref="title"></h2>
  </div> -->
  <div class="top" ref="top">
    <div class="back" @click="back">
        <i class="iconfont icon-houtui"></i>
    </div>
        <h2 class="title" v-html="title"></h2>
  </div>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
      </div>
      <div class="filter" ref="filter"></div>
    </div>
  <ul class="songs">
    <li class="song" v-for="(item,index) in songs" @click="selectItem(item,index)">{{item.name}}<p>{{item.al.name}} {{item.alia[0]}}</p></li>
  </ul>
  <div class="loading-container" v-show="!songs">
        <loading></loading>
  </div>
</div>
</template>
<script>
import Loading from 'common/loading/loading'

export default {
  data(){
    return {
      offsetY:0
    }
  },
  props: ["bgImage", "title", "songs"],
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    }
  },
  methods:{
    selectItem(item,index){
      this.$emit('select',item,index)
    },
    back(){
      this.$router.back()
    }
  },
  components:{
    Loading
  }
};
</script>
<style scoped>
@import url(./fonts2/iconfont.css);

.listview {
  z-index: 100;
}
.top {
  position: fixed;
  width: 100%;
  margin-bottom: 25px;
  z-index: 40;
  background-color: transparent;
}
.top .back{
  position :absolute;
  top: 0;
  left: 6px;
  z-index: 50;
}
.back .icon-houtui {
  display: block;
  padding: 9px;
  font-size: 25px;
  color: #31c27c;
}
.top .title {
  position: static;
  width: 80%;
  margin: 0 auto;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  color: white;
}
/* .back {
  position: fixed;
  top: 0;
  left: 6px;
  z-index: 50;
}
.back .icon-back {
  display: block;
  padding: 10px;
  font-size: 20px;
  color: #31c27c;
}
.title {
  position: absolute;
  top: 0;
  left: 10%;
  z-index: 40;
  width: 80%;
  text-align: center;
  line-height: 40px;
  color: white;
  font-size: 20px;
  background: transparent;
} */
.bg-image {
  position: relative;
  width: 100%;
  /* height: 0; */
  padding-top: 70%;
  transform-origin: top;
  background-size: cover;
}
.song {
  display: block;
  padding: 1vh 20px;
  font-size: 18px;
  /* background-color: #eee; */
  border-bottom: 1px solid #ccc;
  margin: 3px;
}
.song p{
  font-size: 13px;
  color: #999;
}
.loading-container{
  position: absolute;
  width: 100%;
  top: 70%;
  transform: translateY(-50%);
}
</style>


