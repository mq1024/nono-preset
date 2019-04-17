module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      axios: '^0.18.0',
      'core-js': '^2.6.5',
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
  api.render('./template');
  api.render({
    './.eslintrc.js': './template/_eslintrc.js',
    './.gitignore': './template/_gitignore',
    './.browserslistrc': './template/_browserslistrc'
  });
};
