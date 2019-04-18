<template>
  <header class="bar-header">
    <div class="back-button">
      <slot name="back-button">
        <div
          id="back_button"
          v-if="!hideBackBtn"
          @click="goBack()"
        >
        </div>
      </slot>
    </div>
    <div class="header-title">
      <span>{{viewTitle}}</span>
    </div>
    <div class="right-button">
      <slot name="right-button"></slot>
    </div>
  </header>
</template>
<script>
import { FROM_APP, HOST } from "@/util/const";
// import { mapActions } from 'vuex';
import bridge from "@/util/bridge";

export default {
  name: "nono-header",

  props: {
    viewTitle: {
      type: String,
      default: ""
    },
    hideBackBtn: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    removeUser() {},
    // ...mapActions(['removeUser']),
    goBack() {
      this.$router.isBack = true;
      let { back } = this.$route.meta;
      if (back === "backToApp") {
        this.removeUser();
        if (FROM_APP) {
          bridge.send({
            type: "backToApp"
          });
        } else {
          let backUrl = this.$route.query.backUrl || HOST + "/nono-app/#/home";
          window.location.href = backUrl;
        }
      } else if (back === "home") {
        this.$router.replace({ name: back });
      } else {
        let backFromWz = this.$route.query.backFrom === "wz";
        if (backFromWz) {
          this.$router.replace({ name: back });
        } else {
          this.$router.go(-1);
        }
      }
    }
  }
};
</script>

<style lang="scss">
// @import '@/sass/_mixins.scss';
.bar-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  align-items: center;
  user-select: none;

  @include border_1px(bottom, #f5f5f5);
}
.platform-cordova.platform-ios .bar-header {
  top: 20px;
}
.platform-cordova.platform-ios .scroll-content {
  top: 20px;
}

.platform-iphonex .bar-header {
  top: 44px;
}
.platform-iphonex .scroll-content {
  top: 44px;
}

.back-button {
  position: relative;
  white-space: nowrap;
  z-index: 1;
  height: 44px;
  width: 44px;

  #back_button {
    width: 100%;
    height: 100%;
    background: url(./images/icon_arrow_left.png) center center no-repeat;
    background-size: 30px 30px;
  }
}

.right-button {
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  // line-height: 44px;
  // padding-right: 15px;
  // text-align: right;
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: rem(18);
}

.bar-light {
  background: #fff;
  color: #444;
}

.bar-positive {
  background: #4c7ee2;
  color: #fff;
}
</style>
