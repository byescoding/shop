<template>
    <div class="review">
        <div v-for="item in recommends" class="review-item">
            <a :href="item.link"></a>
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'RecommendView',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            },
        }
    }
}
</script>
<style>
    .review{
        display: flex;
        widows: 100%;
        text-align: center;
       font-size: 12px;
       border-bottom: 8px solid #eee;
       padding: 5px;
  
    }
    .review-item{
       flex: 1;

    }
    .review-item img{
        width: 65px;
        height: 65px;
        border-radius:100% ;

    }
</style>