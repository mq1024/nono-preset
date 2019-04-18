export default Vue => {
  Vue.directive('ext-href', function(el, binding, vnode) {
    let link = binding.value.link,
      name = binding.value.name;
    el.onclick = function() {
      if (/vip\/#\//.test(link)) {
        let path = link.split('#')[1];
        vnode.context.$router.push({ path: path });
      } else {
        vnode.context.$router.push({
          name: 'external',
          params: { name: name, link: link }
        });
      }
    };
  });
};
