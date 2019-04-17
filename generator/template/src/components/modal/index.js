/*
 * @Author: maqian
 * @Date: 2018-10-31 11:24:36
 * @Last Modified by: maqian
 * @Last Modified time: 2018-11-09 14:12:00
 */
import Modal from './modal.vue';
import ModalsContainer from './modalContainer.vue';
import Confirm from './confirm.vue';
import Alert from './alert.vue';

const defaultComponentName = 'modal';

const Plugin = {
  install(Vue, options = {}) {
    if (this.installed) {
      return;
    }
    this.installed = true;
    this.event = new Vue();
    this.rootInstance = null;
    this.componentName = options.componentName || defaultComponentName;

    Vue.prototype.$modal = {
      show(modal, paramsOrProps, params, events = {}) {
        if (typeof modal === 'string') {
          Plugin.event.$emit('toggle', modal, true, paramsOrProps);
          return;
        }

        const root = params && params.root ? params.root : Plugin.rootInstance;
        const container = getModalsContainer(Vue, options, root);
        if (container) {
          container.add(modal, paramsOrProps, params, events);
          return;
        }
      },

      hide(name, params) {
        Plugin.event.$emit('toggle', name, false, params);
      },
      toggle(name, params) {
        Plugin.event.$emit('toggle', name, undefined, params);
      },

      /**
       * confirm 参数
       * @param {bgClose} params
       * @param {classes} params
       * @param {title} params
       * @param {content} params
       * @param {okText} params
       * @param {okType} params
       * @param {cancelText} params
       * @param {cancelType} params
       * @param {onOk} params
       * @param {onCancel} params
       */
      confirm(params, events = {}) {
        this.show(
          Confirm,
          params,
          {
            classes: ['middle'],
            name: 'confirm',
            bgClose: params.bgClose || false
          },
          events
        );
      },
      /**
       * confirm 参数
       * @param {bgClose} params
       * @param {classes} params
       * @param {title} params
       * @param {content} params
       * @param {okText} params
       * @param {okType} params
       * @param {onOk} params
       */
      alert(params, events = {}) {
        this.show(
          Alert,
          params,
          {
            classes: ['middle'],
            name: 'alert',
            bgClose: params.bgClose || false
          },
          events
        );
      }
    };

    Vue.component(this.componentName, Modal);
    if (options.dynamic) {
      Vue.component('modals-container', ModalsContainer);
      Vue.mixin({
        beforeMount() {
          if (Plugin.rootInstance === null) {
            Plugin.rootInstance = this.$root;
          }
        }
      });
    }
  }
};

function getModalsContainer(Vue, options, root) {
  if (!root._dynamicContainer && options.injectModalsContainer) {
    const containerEle = document.createElement('div');
    document.body.appendChild(containerEle);

    new Vue({
      parent: root,
      render: h => h(ModalsContainer)
    }).$mount(containerEle);
  }
  return root._dynamicContainer;
}
export default Plugin;
