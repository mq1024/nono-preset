import Vue from 'vue';
import toastComponent from './_toast.vue';

let instanceArr = [];

function _getInstance(opt) {
  let id = opt['id'],
    instance;
  if (id && instanceArr[id]) {
    instance = instanceArr[id];
    _hide(instance);
    Object.assign(instance, opt);
  } else {
    let toastConstructor = Vue.extend(toastComponent);
    instance = new toastConstructor({
      data: opt
    });
    instanceArr[id] = instance;
  }

  return instance;
}

function _show(opt) {
  let instance = _getInstance(opt);

  instance.$mount();
  document.body.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.visible = true;

    instance.timer = setTimeout(() => {
      _hide(instance);
    }, opt.duration);
  });
}

function _hide(instance) {
  if (instance.timer) {
    clearTimeout(instance.timer);
    instance.timer = null;
  }

  instance.visible = false;
  instance.msg = '';
}

let Toast = {
  defaultOpitons: {
    id: 'toast_default',
    duration: 3000,
    bgColor: 'rgba(0, 0, 0, 0.7)', //背景透明度
    customClass: '', //自定义class
    position: 'center', //'top bottom center'
    cusIcon: '' //自定义图标
  },
  setting(options) {
    Object.assign(this.defaultOpitons, options);
  },
  info(msg, opt = {}) {
    opt.msg = msg;
    let _opt = Object.assign({}, this.defaultOpitons, opt);
    _show(_opt);
  }
};

export default Toast;
