<template>
    <div class="goods">
        <goods-list-item v-for="item in goods" :goodsitem="item"></goods-list-item>
    <!-- {{goods}} -->
    </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'
export default {
    name:'GoodsList',
    props:{
   goods:{
            type:Array,
            default(){
                return []
            }
        }
    
    },
    components:{
        GoodsListItem
    }
     
}
</script>
<style >
.goods{
      /* display: flex;
    flex-wrap: wrap; */
    /* justify-content: space-around;
    background-color: var(--color-background);
    padding: 2px; */
     display: flex;
    flex-wrap: wrap;
    /* 均等分空白地方 */
    justify-content: space-around;
    padding: 2px;
}
</style>