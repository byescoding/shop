import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const Home =() => import('../views/home/Home.vue')
const Category =()=> import('../views/category/Category')
const Cart =() => import('../views/cart/Cart')
const Profile =() => import('../views/profile/Profile')
const Detail=()=>import('../views/detail/Detail.vue')
const routes = [
   {
    path:"/",
    redirect:"/home"

   },
  {
    path:'/home',
    component:Home
  },
  {
path:'/category',
component:Category
  },
  {
path:'/cart',
component:Cart
  },
  {
 path:'/profile',
 component:Profile
  },
  {
  path:"/detail/:iid",
  name:"Detail",
  component:Detail
  },


]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
