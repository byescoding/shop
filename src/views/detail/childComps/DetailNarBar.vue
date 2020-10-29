<template>
<div>
    <nav-bar>
        <div slot="left" @click="back">
             <img src="../../../assets/img/common/back.svg" alt="">
        </div>
    <div slot="center" class="title">
       
      <div v-for="(item,index) in titles"  @click="btnclick(index)" class="title-item" :class="{active:index==currentIndex}" >

          <div>{{item}}</div>
      </div>
     
    </div>
</nav-bar>
</div>

</template>

<script>
import NavBar from '../../../components/common/Navbar/NavBar'
export default {
    name:"DetailNavBar",
   components:{
       NavBar
   },
    data() {
        return {
            titles:['商品','参数','评论','推荐'],
            currentIndex:0,
        }
    },
    methods: {
        back(){
            this.$router.back()
        },
        btnclick(index){
            this.currentIndex=index
            this.$emit('titleclick',index)
        }

    },
}
</script>

<style scoped>
.title{
    display: flex;
}
.title-item{
    flex: 1;
    font-size: 13px;
}
img{
    margin-top: 12px;
}
.active{
     color:  var(--color-tint);
}

</style>