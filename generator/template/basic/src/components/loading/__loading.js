import Vue from 'vue';
import loadingComponent from './_loading.vue';

let instance;
function _show(opt) {
  let container = document.getElementById('loading_container');
  if (container === null) {
    let loadingPlugin = Vue.extend(loadingComponent);
    instance = new loadingPlugin({
      props: opt
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
  }
  Vue.nextTick(() => {
    instance.visible = true;
    Object.assign(instance, opt);
  });
}

let Loading = {
  count: 0,
  defaultOptions: {
    msg: '请稍后...',
    icon: '',
    customeClass: '',
    isFullPage: true //背景是否可点击
  },
  init(options) {
    Object.assign(this.defaultOptions, options);
  },
  show() {
    this.count++;
    _show(this.defaultOptions);
  },
  hide() {
    this.count && this.count--;
    if (this.count == 0 && instance) {
      instance.visible = false;
    }
  }
};

export default Loading;
