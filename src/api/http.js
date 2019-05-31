import Axios from 'axios'
import Loading from '../commen/loading/index'
import { Toast} from 'antd-mobile';
console.log( Loading.newInstance)
let loadingInstance = 0
  let getLoadingInstance = (tip) => {
    loadingInstance = loadingInstance || Loading.newInstance({
        tip
    })
    return loadingInstance
  }
  function open (tip='加载中...') {
    getLoadingInstance(tip)
  }
  function close () {
      if(loadingInstance) {
          loadingInstance.destroy()
          loadingInstance = null
      }
  }
Axios.interceptors.request.use(function (config) {
  // 显示“加载中”状态
  open()
  return config
}, function (error) {
  return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {
  // 隐藏“加载中”状态
  close()
  return response;
}, function (error) {
  return Promise.reject(error);
});