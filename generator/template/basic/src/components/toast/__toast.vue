<template>
  <transition name="toastfade">

    <div
      :id="id"
      v-show="visible"
      :class="['toast-container',customeCalss,'toast-'+position]"
    >

      <div
        class="toast-inner"
        :style="{'background-color':bgColor}"
      >
        <div class="icon-wrapper">
          <i
            class="toast-icon"
            :style="{'background-image':cusIcon}"
          ></i>

        </div>
        <div
          class="toast-text"
          v-html="msg"
        ></div>
      </div>

    </div>
  </transition>
</template>
<script>
export default {
  name: "toast",
  data() {
    return {
      id: "toast_default",
      visible: false,
      msg: "",
      customeCalss: "",
      bgColor: "rgba(0,0,0,.7)",
      position: "center",
      cusIcon: ""
    };
  }
};
</script>
<style lang="scss">
.toast-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: transparent;
  z-index: 9999;

  .toast-inner {
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    text-align: center;
    padding: 10px;
    max-width: 90%;
    color: #fff;
    font-size: 14px;
  }
  &.toast-center .toast-inner {
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  &.toast-top .toast-inner {
    top: 10px;
  }
  &.toast-bottom .toast-inner {
    bottom: 10px;
  }
}

.toastfade-enter-active {
  transition: opacity 0.1s;
}
.toastfade-leave-active {
  transition: opacity 0.3s;
}
.toastfade-enter,
.toastfade-leave-active {
  opacity: 0;
}
</style>


