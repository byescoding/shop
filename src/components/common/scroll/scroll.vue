<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
              <slot></slot>
        </div>
      
    </div>
</template>
<script>
import BetterScroll from 'better-scroll'
export default {
    name:'Scroll',
    data() {
        return {
             type:Object,
                default() {
                return {}
            },
            message:"hhhhhhh",
            scroll:null,
        }
    },
    props:{
          probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
    },
    mounted() {
      this.scroll=new BetterScroll(this.$refs.wrapper,{
         probeType:this.probeType,
         click:true,
         pullUpLoad:this.pullUpLoad,
      })
   
   //监听位置信息
   if(this.probeType==2 || this.probeType==3){
        this.scroll.on('scroll', (postion) => {
                // console.log(postion);  监听位置
                this.$emit('scroll', postion)
            })
   }
       


 
      //监听上拉事件
      if(this.pullUpLoad){
  this.scroll.on('pullingUp',()=>{
     this.$emit("pullingUp")
       })
      }

  


    },
    methods: {
          scrollTo(x, y, time=400) {
                this.scroll.scrollTo(0, 0, time)
            },
            finishPullUp(){
                this.scroll.finishPullUp();
            },
            refresh(){
                // console.log("jjjjj");
                
               this.scroll && this.scroll.refresh && this.scroll.refresh()
            },

            getScrollY(){
                return this.scroll ? this.scroll.y : 0
            }
    },
} 
</script>