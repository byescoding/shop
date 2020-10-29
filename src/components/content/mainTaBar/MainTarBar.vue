<template>
<div>

  <tar-bar>
      <tar-bar-item path='/home'>
        <img slot="item-icon" src="../../../assets/img/tabbar/home.svg" alt="">
           <img slot="item-icon-active" src="../../../assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text" activeColor="pink">首页</div>
        </tar-bar-item>
        <tar-bar-item path='/category'>
        <img slot="item-icon" src="../../../assets/img/tabbar/category.svg" alt="">
          <img slot="item-icon-active" src="../../../assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
        </tar-bar-item>
          <tar-bar-item path='/cart'>
        <img slot="item-icon" src="../../../assets/img/tabbar/shopcart.svg" alt="">
          <img slot="item-icon-active" src="../../../assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-text" activeColor="blue">购物</div>
        </tar-bar-item>

          <tar-bar-item path='/profile'>
         <img slot="item-icon" src="../../../assets/img/tabbar/profile.svg" alt="">
           <img slot="item-icon-active" src="../../../assets/img/tabbar/profile_active.svg" alt="">
          <div slot="item-text">我的</div>
        </tar-bar-item>
     
     </tar-bar>

</div>
</template>

<script>
import TarBar from '../../common/tabbar/tarbar'
import TarBarItem from '../../common/tabbar/tarbaritem'
export default {
  name: 'MainTarBar',
  components:{
    TarBar,
    TarBarItem
  }

}
</script>

<style>

</style>
