<template>
  <div id="app">
    <main-tar-bar></main-tar-bar>
    <keep-alive exclude="Detail">
     <router-view></router-view>
    </keep-alive>
 
  </div>
</template>
<script>


import MainTarBar from './components/content/mainTaBar/MainTarBar'

export default {
  name:'app',
  components:{
     MainTarBar,

  }
  
}
</script>

<style>
@import '../src/assets/css/base.css';
</style>
