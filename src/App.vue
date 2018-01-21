<template>
  <div id="app">
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import Tab from 'components/Tab/Tab.vue'
import Player from 'components/player/player.vue'

export default {
  name: 'app',
  components:{
    Tab,
    Player
  }
}
</script>
<style>
#app {
  margin: 0;
  padding: 0;
}
</style>
