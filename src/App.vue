<template>
  <div id="app">
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Tab from 'components/Tab/Tab.vue'

export default {
  name: 'app',
  components:{
    Tab
  }
}
</script>
<style>
#app {
  margin: 0;
  padding: 0;
}
</style>
