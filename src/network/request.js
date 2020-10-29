import axios from 'axios'

export function request(config){

const Instance1=axios.create({
    baseURL:'http://123.207.32.32:8000/api/h8',
    timeout:5000
})


// Instance1.interceptors.request.use(config=>{
//   console.log(config);
  
//   return config

// },err=>{
//   console.log(err);
  
// })

// //响应拦截 
// Instance1.interceptors.response.use(res=>{
// console.log(res);
// //响应成功
// },err=>{
// console.log(err);
// //响应失败
// })

  return   Instance1(config)

}