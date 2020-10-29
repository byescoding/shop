<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles" 
         @click="itemClick(index)"   class="tab-control-item"  :class="{active:index===currentIndex}">
            <span  >{{item}}</span>
            </div>
        
    </div>
</template>
<script>
export default {
    name:'TabControl',
    data() {
        return {
            currentIndex:0
        }
    },
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods: {
          itemClick(index){
    this.currentIndex=index;
    this.$emit('tabClick',index)
    }
    },
  
}
</script>
<style>
    .tab-control{
        display: flex;
        text-align: center;
        font-size: 14px;
        line-height: 40px;
        height: 40px;
      
    }
    .tab-control-item{
        flex: 1;
    }
    .tab-control-item span{
           padding:5px;
    }
    .active{
        color:var(--color-high-text);
    }
    .active span{
        border-bottom: 2px solid var(--color-tint);

    }

</style>