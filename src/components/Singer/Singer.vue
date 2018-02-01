<template>
  <ul class="singer-list">
    <li class="singer" v-for="i in singerlist" @click="selectItem(i)">
      <img v-lazy="i.img1v1Url" alt="">
      <div><span>{{i.name}}</span></div>
    </li>
    <router-view></router-view>
  </ul>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
  data(){
    return {
      singerlist:null
    }
  },
  created(){
    this._getSingerList()
  },
  methods:{
    _getSingerList(){
      this.axios.get("/api/toplist/artist").then(res => {
        this.singerlist = res.data.list.artists
        // console.log(this.singerlist)
      })
    },
    selectItem(singer){
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    ...mapMutations([
      'setSinger'
    ])
  }
  
}
</script>

<style>
*{
  box-sizing: border-box;
}
.singer-list{
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin-top: 83px;
}
.singer{
  /* box-sizing: content-box; */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100vw;
  margin: 5px 0;
  /* padding: 0 10px; */
  padding-left: 10px;
  transition: all .5s linear;
}
.singer>img{
  height: 49px;
  display: block;
  border-radius: 50%;
}
.singer>div{
  flex-grow: 1;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 0 20px;
  border-bottom: 1px solid #ccc;
}
.singer:active{
  background-color: #ccc;
}
</style>
