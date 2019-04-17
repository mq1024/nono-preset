import { FROM_APP, WECHAT_SHARE_ACCOUNT } from './const.js';
import $http from '@/axios/http';
const FROM_WX = /micromessenger/.test(navigator.userAgent.toLowerCase());
let bridge,
  shareData = {};
if (FROM_APP) {
  // 动态加载
  import('@/util/bridge.js').then(Module => {
    bridge = Module.default;
  });
}

function initShareData(data) {
  shareData = data;
  if (FROM_WX) {
    wechatShare(shareData);
  }
}

function wechatShare(shareData) {
  $http
    .get('/wechat/signature', {
      silence: true,
      params: {
        url: window.location.href.split('#')[0],
        type: WECHAT_SHARE_ACCOUNT
      }
    })
    .then(res => {
      if (!res) {
        return;
      }
      var data = res;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: [
          'checkJsApi',
          'updateAppMessageShareData',
          'updateTimelineShareData'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      wx.ready(function() {
        wx.updateAppMessageShareData(shareData);
        wx.updateTimelineShareData(shareData);
      });
    });
}

function share(wxCallback) {
  if (FROM_APP) {
    bridge.send({
      type: 'share',
      data: {
        share_type: 2,
        share_title: shareData.title,
        share_desc: shareData.desc,
        share_url: shareData.link,
        share_icon: shareData.imgUrl,
        share_sms: (shareData.sms || shareData.desc) + shareData.link
      }
    });
  } else if (FROM_WX) {
    wxCallback && wxCallback();
  }
}

export { share, initShareData };
