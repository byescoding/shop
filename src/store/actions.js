
import{ADD_COUNT,
  ADD_TO_CART
} from './mutation-types'
export default{
    addCart(context,payload){
        // state.cartlist.push(payload);
        //新添加的商品
        let oldProduct =context.state.cartlist.find( item => item.iid === payload.iid)
         //判断oldproduct
         if(oldProduct){
           
           context.commit(ADD_COUNT,oldProduct)
      
         }else{
           payload.count = 1
           context.commit(ADD_TO_CART,payload)
         }
          }
}