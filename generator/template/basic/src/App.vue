<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view :key="key" />
    </transition>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      transitionName: "page-right"
    };
  },
  computed: {
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    }
  },
  watch: {
    $route() {
      let isBack = this.$router.isBack;
      if (isBack) {
        this.transitionName = "page-right";
      } else {
        this.transitionName = "page-left";
      }
      this.$router.isBack = false;
    }
  },
  created() {
    // this.addPlatformClass();
  },
  methods: {
    addPlatformClass() {
      var standalone = window.navigator.standalone,
        userAgent = window.navigator.userAgent.toLowerCase(),
        ios = /iphone|ipod|ipad/.test(userAgent);

      if (
        (/terminal=4/.test(window.location.href) || (ios && standalone)) &&
        !/iphoneX=1/.test(window.location.href)
      ) {
        document.querySelector("body").className +=
          " platform-cordova platform-ios ";
      }
      if (/iphoneX=1/.test(window.location.href)) {
        document.querySelector("body").className += " platform-iphonex ";
      }
    }
  }
};
</script>


<style lang="scss">
@import "@/sass/reset.scss";
@import "@/sass/app.scss";
</style>
