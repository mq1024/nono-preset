import $http from '@/axios/http';

export default {
  getSysTime() {
    return $http.get('/common/current', { noJwt: true });
  },
  // 获取jwt
  getJWT(sessionId) {
    return $http.get('/common/jwt/' + sessionId, {
      noJwt: true
    });
  },
  // 刷新jwt
  refreshJwt(refresh) {
    return $http.get('/common/refresh-jwt/' + refresh, {
      silence: true,
      noJwt: true
    });
  },

  //微信签名
  getWechatSignature(obj) {
    return $http.get('/wechat/signature', {
      params: {
        url: obj.url,
        type: 'nonobank'
      }
    });
  }
};
