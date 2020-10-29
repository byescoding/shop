<template>
<div class="cart">
  <nav-bar class="cart-nav"><div slot="center" >购物车({{length}})</div></nav-bar>
   
   
</div>
</template>

<script>
import NavBar from '../../components/common/Navbar/NavBar'
import CartList from './childComps/CartList'
// import {cartLength} from '../../store/getters'
import {mapGetters} from 'vuex'
export default {
  name: 'Cart',
  components:{
    NavBar,
    CartList,
    Scroll
  },
  computed: {
    //把getters里面的方法转换为计算属性
  // ...mapGetters(['cartLength','cartList'])
  ...mapGetters({
    length:'cartLength',
    list:'cartList'
  })
  },
 


}
</script>

<style>
  .cart-nav{
   background-color:var(--color-tint);
  color: white;
  }
</style>
