export function  debounce(func,delay){  //参数传进一个函数  delay延时时间
    let timer=null
    return function (args) {
      if(timer) clearTimeout(timer)//如果timer不为空的话就清除延时
  
      timer=setTimeout(() => {
        func.apply(this,args)//调用当前对象的参数到函数
      }, delay);
  
       
    }
  
  }

  export function formatDate(date, fmt) {
    //   1.获取年份 
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    // 2.获取
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};