import Axios from 'axios'
import Loading from '../commen/loading/index'
import { Toast} from 'antd-mobile';
// console.log( Loading.newInstance)

Axios.interceptors.request.use(function (config) {
  // 显示“加载中”状态
  Loading.open()
  return config
}, function (error) {
  return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {
  // 隐藏“加载中”状态
  Loading.close()
  return response;
}, function (error) {
  return Promise.reject(error);
});