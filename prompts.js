module.exports = [
  {
    name: 'vuex',
    type: 'confirm',
    message: '是否需要使用 vuex',
    default: false
  },
  {
    name: 'wx',
    type: 'confirm',
    message: '是否需要微信分享',
    default: false
  },
  {
    name: 'cnzz',
    type: 'confirm',
    message: '是否需要友盟埋点',
    default: false
  },
  {
    name: 'cnzzSid',
    type: prev => (prev ? 'text' : null),
    message: '请输入cnzz站点sid：',
    default: ''
  }
];
