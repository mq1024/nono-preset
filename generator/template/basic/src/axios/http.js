import axios from 'axios';
import encryptSign from './sign';
import tool from '@/util/tool';
import { HOST } from '@/util/const';

// 请求拦截器
axios.defaults.timeout = 60 * 1000;
axios.defaults.baseURL = HOST + '/feserver';

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    if (!config.silence) {
      tool.showLoading();
    }
    let _user = tool.localStorageService.get('user'); //获取jwt
    let jwt = _user && _user.jwt;

    if (!config.noJwt && jwt) {
      config.headers.jwt = jwt;
    }

    if (config.method == 'get') {
      config.params = encryptSign.sign(config.params);
    } else {
      config.data = encryptSign.sign(config.data);
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    if (!response.config.silence) {
      tool.hideLoading();
    }
    return response.data;
  },
  function(error) {
    if (!error.config.silence) {
      tool.hideLoading();
    }
    if (error.response && error.response.status === 401) {
      tool.toast('请重新登录');

      return;
    }
    if (error.response && error.response.status === 404) {
      tool.toast('网络错误404');
      return;
    }
    if (error.response == undefined) {
      tool.toast('网络异常，请稍后再试');
      return;
    }
    return Promise.reject(error);
  }
);
export default axios;
