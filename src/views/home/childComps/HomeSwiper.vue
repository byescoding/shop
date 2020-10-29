<template>
    <div>
        <swiper>
     <swiper-item v-for="item in banners">
       <a :href="item.link"></a>
       <img :src="item.image" alt="" @load="imgload">
     </swiper-item>
</swiper>
    </div>
</template>
<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper/index'
export default {
    name:'HomeSwiper',
    data() {
        return {
            isload:false
        }
    },
    components:{
        Swiper,
        SwiperItem,
    },
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods: {
       imgload(){
           
      if(!this.isload){//判断是否已经发送
 this.$emit("swipimgload")
   this.isload=true
      }
            
        }
    },

}
</script>
<style >


</style>