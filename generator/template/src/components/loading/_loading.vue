<template>
  <transition name="loadingfade">
    <div
      v-show="visible"
      id="loading_container"
      :class="['loading-overlay',customeClass,{'full-page':isFullPage}]"
      :style="{'z-index':this.zIndex}"
    >
      <div
        class="loading-inner"
        :style="{'background-color':this.bgColor}"
      >
        <div class="icon-wrapper">
          <slot>
            <component :is="loader" />
          </slot>

        </div>
        <div
          class="loading-text"
          v-html="msg"
        ></div>
      </div>

    </div>
  </transition>
</template>
<script>
import mzLoader from "./loader.vue";
export default {
  name: "loading",
  components: { mzLoader },
  props: {
    bgColor: String,
    zIndex: Number,
    isFullPage: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    loader: {
      type: String,
      default: "mz-loader"
    }
  }
};
</script>
<style lang="scss">
#loading_container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
  &.full-page {
    z-index: 9999;
  }

  .loading-inner {
    box-sizing: border-box;
    width: 64px;
    height: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    text-align: center;
    color: #e1e1e1;
  }
  .loading-text {
    font-size: 12px;
    transform: scale(0.8);
  }
  .icon-wrapper {
    position: relative;
    width: 32px;
    height: 32px;
    svg {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.loading-enter-active {
  transition: opacity 0.1s;
}
.loading-leave-active {
  transition: opacity 0.3s;
}
.loading-enter,
.loading-leave-active {
  opacity: 0;
}
</style>


