module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      axios: '^0.18.0',
      'js-md5': '^0.7.3',
      qs: '^6.7.0'
    },
    devDependencies: {}
  });
  if (options.vuex) {
    api.extendPackage({
      dependencies: {
        vuex: '^3.0.1'
      }
    });
    // api.render('./template/vuex');
  }
  api.render('./generator/template');
};
