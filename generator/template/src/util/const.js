function isFromApp() {
  let search = getSearch(),
    terminal = search.terminal;
  // userAgent = navigator.userAgent,
  // reg = /deviceIdentifier|appVersion|phoneBrand|networkType/;
  if (
    terminal == 4 ||
    terminal == 5 ||
    terminal == 'csyy_ios' ||
    terminal == 'csyy_android'
  ) {
    return true;
  } else {
    return false;
  }
}

function getSearch() {
  let url = decodeURIComponent(window.location.href);
  let params = {};
  let arr = url.split('?');
  if (arr.length <= 1) {
    return params;
  }
  arr = arr[1].split('&');

  for (let i = 0, l = arr.length; i < l; i++) {
    let a = arr[i].split('=');
    params[a[0]] = a[1];
  }
  return params;
}
const TEST_HOST = 'https://m.stb.nonobank.com';
export const HOST = /nonobank.com/.test(location.host)
  ? location.protocol +
    '//' +
    location.host +
    (location.port ? ':' + location.port : '')
  : TEST_HOST;
export const SESSIONID = getSearch()['sessionId'] || '';
export const TERMINAL = getSearch()['terminal'] || '3';
export const FROM_APP = isFromApp();
export const IS_IPHONEX = getSearch()['iphoneX'] || 0;
export const CLIENT_VERSION = getSearch()['version'] || '';
export const WECHAT_SHARE_ACCOUNT = /m.nonobank.com/.test(location.host)
  ? 'mxd'
  : 'maqian';
