<template>
    <div id="detail">

         <detail-nar-bar class="detail-nav" @titleclick="titleclick" ref="nav"></detail-nar-bar>
  
 <scroll class="content" 
 ref="scroll" 
  :probe-type="3" 
  @scroll="contentScroll"> 

  <detail-swiper :top-images="topImages"></detail-swiper>
   <detail-base-info :goods="goods"></detail-base-info>
   <detail-shop-info :shop="shop"></detail-shop-info> 
​     <!-- <detail-goods-info :detail-info="detailInfo" @imageLoad="imgeload"></detail-goods-info> -->
​     <detail-item-params :item-params="itemParams" ref="params"></detail-item-params>
​     <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
​     <goods-list :goods="recommends" ref="recommend"></goods-list>
     
 </scroll>
    <detail-button-bar @addCart="addCart"></detail-button-bar>
    <back-top  @click.native="backclick" v-show="isbacktag" ></back-top>
    </div>
</template>


<script>
import DetailNarBar from './childComps/DetailNarBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from '../../components/common/scroll/scroll'
import DetailGoodsInfo from'./childComps/DetailGoodsInfo'
import DetailItemParams from './childComps/DetailItemParams'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from'../../components/content/goods/GoodsList'
import DetailButtonBar from './childComps/DetailBottomBar'
import BackTop from '../../components/content/backtop/BackTop'
import {debounce} from '../../common/untils'
import{getDetail,Goods,Shop,Params,getRecommend} from '../../network/detail'

export default {
    name:"Detail",
       components:{
       DetailNarBar,
       DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailItemParams,
        DetailCommentInfo,
        GoodsList,
        DetailButtonBar,
        BackTop,

    },
    data() {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
           itemParams:{},
           commentInfo:{},
           recommends:[],
           themeTopY:[],
           getThemeTopY:null,
           currentIndex:0,
           isbacktag:false,
        }
     
    },
       created(){  
           //保存iid  
                this.iid=this.$route.params.iid
                //根据iid进行信息查询
                getDetail(this.iid).then(res=>{
                    // console.log(res);
                    const data=res.data.result
                   this.topImages=data.itemInfo.topImages
                     

                          //获取商品信息
                this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
                // console.log(Object.keys(this.goods).length);

                //获取店铺信息
                this.shop=new Shop(data.shopInfo)
                
                 //保存商品的详细数据
                 this.detailInfo=data.detailInfo
                 
                 //获取参数
                 this.itemParams=new Params(data.itemParams.info,data.itemParams.rule)
                //获取评论信息
                if(data.rate.cRate !== 0){
                 this.commentInfo = data.rate.list[0]
                //  console.log(this.commentInfo);
                 
                }    
                
            
                
                //    this.$nextTick(()=>{
                //        //最新数据已经加载完成对应的dom已经被渲染出来了
                //        //但是图片依然还没有加载完成
                             
                //    })

                })

                getRecommend().then(res=>{
                 this.recommends=res.data.data.list
                // console.log(res.data.data.list);
                
                })
                   

        
                
        },
        mounted() {
            //点击标签跳到对应的内容
              setTimeout(() => {
                       this.themeTopY.push(0);
            this.themeTopY.push(-(this.$refs.params.$el.offsetTop-44));
            this.themeTopY.push(-(this.$refs.comment.$el.offsetTop-44));
            this.themeTopY.push(-(this.$refs.recommend.$el.offsetTop-44));
            // console.log(this.themeTopY);
              }, 500);
            
        },
        methods: {
            imgeload(){
                this.$refs.scroll.refresh();
             this.getThemeTopY();
            },
            titleclick(index){
                // console.log(index);
                this.$refs.scroll.scroll.scrollTo(0,this.themeTopY[index],100)
                
            },

            //根据内容跳到对应标题
            contentScroll(position){
                 if(position.y<-553){
                    this.isbacktag=true
                              }else{
                         this.isbacktag=false
                                   }
                // console.log(position);
                //获取y值
                const positionY= position.y

                let length =this.themeTopY.length
                for (let i = 0; i<length; i++) {
                  if (this.currentIndex !==i && (i< length - 1 && positionY <=this.themeTopY[i]
                  && positionY > this.themeTopY[i+1] || (i === length -1 && positionY <=this.themeTopY[i]
                  ))) {
                      this.currentIndex=i
                      this.$refs.nav.currentIndex=this.currentIndex
                      
                      
                  }
                   
                }
            },
            
//点击回到顶部的事件
      backclick(){
        // this.$refs.scroll.scroll.scrollTo(0,0,300)  
        //拿到组件的对象然后去那scroll  里面的存储的scroll数据
     this.$refs.scroll.scrollTo(0,0)  
     
      },
      //点击添加到购物车
      addCart(){
      console.log("jjjjj");
      //获取购物车需要展示的信息
      const product ={}
      product.image=this.topImages[0];
      product.title=this.goods.title;
       product.desc=this.goods.desc;
        product.peice=this.goods.realPrice;
         product.iid=this.iid;
     this.$store.dispatch('addCart',product)
  console.log(product);
  
         //将商品数据添加到购物车

       
      
      }


        },
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index:12;
    background-color:#fff ;
    height: 100vh;
}
.content{
   height:calc(100% - 44px - 49px);


}
.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;

}
</style>