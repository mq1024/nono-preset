import Loading from '../components/loading/index';
import Toast from '../components/toast/index';

import {
  HOST,
  FROM_APP,
  SESSIONID,
  TERMINAL,
  CLIENT_VERSION,
  IS_IPHONEX
} from '@/util/const';

let bridge;
if (FROM_APP) {
  // 动态加载
  import('@/util/bridge.js').then(Module => {
    bridge = Module.default;
  });
}

export default {
  showLoading() {
    Loading.show();
  },
  hideLoading() {
    Loading.hide();
  },
  toast(str) {
    Toast.info(str);
  },

  localStorageService: {
    set(name, obj) {
      if (typeof obj == 'object') {
        let oldObj = this.get(name) || {};
        obj = Object.assign(oldObj, obj);
        let objStr = JSON.stringify(obj);
        localStorage.setItem('nono_' + name, objStr);
      }
    },
    get(name) {
      let storage = localStorage.getItem('nono_' + name);
      if (storage) {
        return JSON.parse(storage);
      } else {
        return null;
      }
    }
  },
  getCurUrl() {
    let curUrl = '',
      path = window.location.hash.split('?')[0];
    if (/nonobank.com/.test(location.host)) {
      curUrl = HOST + '/nono/club/' + path + '?from=club';
    } else {
      curUrl =
        location.protocol + '//' + location.host + '/' + path + '?from=club';
    }

    curUrl = encodeURIComponent(curUrl);
    return curUrl;
  },
  login() {
    let curUrl = this.getCurUrl();
    if (FROM_APP) {
      bridge.send({
        type: 'login',
        url: curUrl
      });
    } else {
      window.location.href = HOST + '/nono-app/#/home?logBackUrl=' + curUrl;
    }
  },
  pageRoute({ appLink, wzLink, appShowType = 0 }) {
    if (FROM_APP && appLink) {
      bridge.send({
        type: 'pageRoute',
        data: {
          link: appLink,
          showType: appShowType
        }
      });
    } else {
      let curUrl = this.getCurUrl(),
        sessionId = SESSIONID;
      window.location.href =
        HOST +
        wzLink +
        '?sessionId=' +
        sessionId +
        '&terminal=' +
        TERMINAL +
        '&version=' +
        CLIENT_VERSION +
        '&iphoneX=' +
        IS_IPHONEX +
        '&fromPage=' +
        curUrl;
    }
  }
};
