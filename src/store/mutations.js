import{ADD_COUNT,
  ADD_TO_CART
} from './mutation-types'
export default{
     //他的作用是来修改state的状态的其他的事情尽量不要在这里面做
  [ADD_COUNT](state,payload){
    payload.count++
    },
  
    [ADD_TO_CART](state,payload){
      payload.checked = true
     state.cartlist.push(payload)
    }
}