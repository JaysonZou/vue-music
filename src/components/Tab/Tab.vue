<template>
  <div class="tab">
      <div class="tabs">
        <router-link tag="span" class="tab-item" to="/singer">
        <span>歌手</span>
        </router-link>
        <router-link tag="span" class="tab-item" to="/recommend">
        <span>音乐馆</span>
        </router-link>
        <router-link tag="span" class="tab-item" to="/toplist">
        <span>排行榜</span>
        </router-link>
      </div>
      <div class="search">
          <input type="text" placeholder="搜索">
      </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
.tab{
    position: fixed;
    top: 0;
    left: 0;
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap; */
    text-align: center;
    color: white;
    background-color: #31c27c;
    font-size: 18px;
    z-index:9;
    width: 100vw;
}
.tab .tabs{
    width: 100vw;
}
.tab .tab-item {
    display: inline-block;
    margin: 0 10px;
    padding: 10px 0;
}
.search {
    width: 100vw;
}
.search input{
    display: inline-block;
    width: 95%;
    border: none;
    border-radius: 3px;
    height: 25px;
    opacity: .5;
    background-color: #eee;
    margin-bottom: 10px;
    outline: none;
}
input::-webkit-input-placeholder{
    text-align: center;
    opacity: 1;
}
.router-link-active > span {
    font-size: 20px;
}
</style>

