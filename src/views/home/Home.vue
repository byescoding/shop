<template>
<div class="home">
 <nav-bar class="home-nav">
    <div slot="center">购物街</div>  
     </nav-bar>
    <tab-control class="tab-control" 
     :titles='["流行","推荐","精选"]' 
     ref="toptabcontrol"
     @tabClick="tabClick" v-show="isTabFixed" > </tab-control>


   <scroll class="content" ref="scroll" 
   :probe-type="3"  
    :pull-up-load="true" 
    @pullingUp="loading"
    @scroll="contentScroll">
<home-swiper :banners="banners" @swipimgload="swipimgload"></home-swiper>
     <recommend-view :recommends="recommends"></recommend-view>
     <feature-view></feature-view>
     <tab-control
     :titles='["流行","推荐","精选"]' 
     ref="tabcontrol"
     @tabClick="tabClick"> </tab-control>
     <goods-list :goods="goods[curtype].list"></goods-list>
   </scroll>

   <back-top @click.native="backclick" v-show="isbacktag" ></back-top>
  </div>
  
</template>

<script>


import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import NavBar from '../../components/common/Navbar/NavBar'
import TabControl from '../../components/content/TabControl/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import {getHomeMultidata,getHomeGoods} from '../../network/home'
import Scroll from '../../components/common/scroll/scroll'
import BackTop from '../../components/content/backtop/BackTop'
import {debounce} from '../../common/untils'
export default {
  name: 'Home',
  data() {
    return {
      saveY:0,
     isTabFixed:false,
      taboffsetTop:0,//tab的偏移值
      isbacktag:false,//判断是否显示backtop组件
      //接受传进来的数据
      banners:[],
      recommends:[],
      result:null,
      curtype:'pop',
      goods:{
        'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
            'sell':{page:0,list:[]},
      }

    }
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    // Swiper,
    // SwiperItem,
  },
  //在创建实例时就应该加载数据
  created() {  //一般来使用网络的请求,此时dom  还没有加载

    this.getHomeMultidata();
    //请求goods数据
    
    this.getHomeGoods('pop');
        
    this.getHomeGoods('new');
        
    this.getHomeGoods('sell');

    // getHomeGoods('pop',1).then(res=>{
    //   console.log(res);
      
    // })

  },
  activated() {
    //保存用户的浏览位置
    this.$refs.scroll.scroll.scrollTo(0, this.saveY ,0)//注意大坑 this.$refs.scroll拿到的是scroll组件我们要使用的是scroll对象所以必须在获取对象不然直接执行的就是改写的同名scrollTo函数
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY=this.$refs.scroll.getScrollY()
    
    // //当离开home界面时取消全局事件的监听
    // this.$bus.$off()
  },
 mounted() {  //此时dom已经被挂载
   
  const refresh=debounce(this.$refs.scroll.refresh,200)//调用防抖函数并返回一个函数
       this.$bus.$on("imgload",()=>{
     
       refresh()//调用返回的函数
   
    })


 },
    methods:{

//图片加载完成后触发的函数获取offsetTop
  //获取tabcontrol的事件监听
    //所有组件都有一个属性 $el :用于获取组件的元素
swipimgload(){
  this.taboffsetTop=this.$refs.tabcontrol.$el.offsetTop
},

// 下拉加载更多
loading(){
 this.getHomeGoods(this.curtype)//相当于再次调用goods的方法加载
  
},

      //接受子组件传来的数据
contentScroll(position){
  //  console.log(position);
   if(position.y<-553){
     this.isbacktag=true
   }else{
     this.isbacktag=false
   }
   
   this.isTabFixed=(-position.y)>this.taboffsetTop
     
},

//点击回到顶部的事件
      backclick(){
        // this.$refs.scroll.scroll.scrollTo(0,0,300)  
        //拿到组件的对象然后去那scroll  里面的存储的scroll数据
     this.$refs.scroll.scrollTo(0,0)  
     
      },
         //请求这个页面的多个数据  数据请求完毕以后在开始渲染界面
    //当数据没有引用指向会被垃圾回收  现在我们相当于把res 指向result 就不会被回收
   getHomeMultidata(){
    getHomeMultidata().then(res=>{
      //把数据保存到result
      this.result=res
      this.banners=res.data.data.banner.list;
      this.recommends=res.data.data.recommend.list;
      
    })
   },
 
    getHomeGoods(type){
      // 应为默认是0开始  所以跳转到  流行  精选  时类型 不一样要重新加一   因为page  从  第一页开始
      const page=this.goods[type].page + 1;
      getHomeGoods(type,page).then(res => {
    //  push可以传入多个参数  ... 表示   可以传入多个参数
        this.goods[type].list.push(...res.data.data.list);
        // 每次传完以后要加1存储下一页的数据
        this.goods[type].page += 1;   
         this.$refs.scroll.finishPullUp()//完成上拉加载工作
        // console.log(res);
         
        
      }) 
    },
     
    //事件监听方法
    tabClick(index){
      switch (index) {
        case 0:
          this.curtype= 'pop'
          break;
             case 1:
          this.curtype= 'new'
          break;
             case 2:
          this.curtype= 'sell'
          break;
      
        default:
          break;
      }

      //让两个tabcontrol 的currentIndex 保持一致
      this.$refs.tabcontrol.currentIndex = index;
      this.$refs.toptabcontrol.currentIndex =index;
       }

     }
}

</script>

<style scoped>


.home{
  /*vh 表示view'high't */
    /* padding -top: 44px; */
    height: 100vh; 
    position:relative;
    /* padding -bottom: 50px; */
  
}
.tab-control{
      /* position: sticky; */
      /* top:43px; */
      position: relative;
      background-color: white;
      z-index: 9;
}

.home-nav{
  background-color:var(--color-tint);
  color: white;

  /* 原来是拿来作用与浏览器的定位  现在有betterscroll所以把它去掉 */
  /* top:44px;
  position: fixed;
   left: 0;
    right:0;
    top: 0;
    z-index: 9; */
}
  .home-scroller{
    /*height:300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
.content{
    /* margin-top: 44px; */
  /* height: calc(100%-93px); */
   overflow: hidden;
 
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  
}
</style>
