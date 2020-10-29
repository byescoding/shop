<template>
  <div class="tar-bar-item" @click="imgClick" >
    
    
  <!-- <slot name="item-icon" v-if="!isActive" > </slot>
   <slot v-else name="item-icon-active" > </slot> -->
   <!-- 因为使用插槽时是直接复制过来的  里面的class并不会复制过去  所以要加div 来包这插槽   这样的话减少外部对内部的影响-->
   <div v-if="!isActive" ><slot name="item-icon"   > </slot></div>
   <div v-else> <slot  name="item-icon-active" > </slot> </div>
   <!-- 修改为动态获取 -->
   <div :style="activeStyle">  <slot name="item-text" > </slot></div>

     
    
  </div>
 
</template>

<script>
export default {
  name: 'TarBarItem',
  props:{
  path:String,

  activeColor:{
      type:String,
      default:'red'
  }
  },
  data() {
      return {
        //   isActive:true
      }
  },
  methods: {
      imgClick(){
        //   console.log('hhhh')
        if(this.$route.path!=this.path){
    this.$router.replace(this.path)
        }
    
      }
  },
  computed: {
      isActive(){
          //当你点击的路由处于活跃状态的话就开始比较当前路由与活跃路由是否相符如果相符的话就返回true  直到比较完字符串
         return this.$route.path.indexOf(this.path)!==-1;
      },
      //动态决定
      activeStyle(){
          return this.isActive ? {color:this.activeColor} : {};
      }
  },
}
</script>

<style>

  .tar-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tar-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>