<template>

  <mz-view
    view-title="title"
    :hide-header="hideHeader"
    id="home_view"
  >
    <div>hello world</div>
  </mz-view>

</template>
<script>
import api from "@/api/user.api.js";
import { SESSIONID, FROM_APP, HOST } from "@/util/const.js";
import tool from "@/util/tool.js";
import { initShareData, share } from "@/util/share.js";

export default {
  name: "home",
  data() {
    return {
      hideHeader: true
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    getJwt() {
      return new Promise((resolve, reject) => {
        api.getJwt(SESSIONID).then(res => {
          if (!res.succeed) {
            tool.toast(res.errorMessage);
            return;
          }
          tool.localStorageService.set("user", res.data);
          resolve();
        });
      });
    },
    init() {
      if (!SESSIONID) {
        tool.localStorageService.set("user", {});
        // this.$modal.alert({
        //   title: "温馨提示",
        //   content: "登录后参与活动",
        //   okText: "去登录",
        //   onOk: function() {
        //     tool.login();
        //   }
        // });
        return;
      }
      api.getSysTime().then(() => {
        this.getJwt().then(() => {
          /**
           * your code
           */
        });
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/sass/home.scss";
</style>
