<template>
  <transition :name="overlayTransition">
    <div
      class="modal-overlay "
      :data-modal="name"
      v-if="visibility.overlay"
    >
      <div
        :class="modalClass"
        v-if="visibility.modal"
        @mousedown.self="handleBgClick"
        @touchstart.self="handleBgClick"
      >
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>
import { createModalEvent } from "./utils.js";
import Plugin from "./index";

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    delay: {
      type: Number,
      default: 0
    },
    classes: {
      type: [String, Array],
      default: "modal"
    },
    overlayTransition: {
      type: String,
      default: "overlay-fade"
    },
    bgClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: false,
      visibility: {
        modal: false,
        overlay: false
      }
    };
  },

  created() {},
  beforeMount() {
    Plugin.event.$on("toggle", this.handleToggleEvent);
  },
  beforeDestroy() {
    Plugin.event.$off("toggle", this.handleToggleEvent);
  },
  computed: {
    modalClass() {
      return ["modal-box", this.classes];
    }
  },
  watch: {
    visible(value) {
      if (value) {
        this.visibility.overlay = true;
        setTimeout(() => {
          this.visibility.modal = true;
          this.$nextTick(() => {
            this.callAfterEvent(true);
          }, this.delay);
        });
      } else {
        this.visibility.overlay = false;
        setTimeout(() => {
          this.visibility.modal = false;
          this.$nextTick(() => {
            this.callAfterEvent(false);
          }, this.delay);
        });
      }
    }
  },
  methods: {
    handleBgClick() {
      if (this.bgClose) {
        this.toggle(false);
      }
    },
    handleToggleEvent(name, state, params) {
      if (this.name === name) {
        const nextState = typeof state === "undefined" ? !this.visible : state;
        this.toggle(nextState, params);
      }
    },
    toggle(nextState, params) {
      const { visible } = this;
      if (visible == nextState) {
        return;
      }
      let stopEventExecution = false;
      const stop = () => {
        stopEventExecution = true;
      };

      const beforeEventName = visible ? "before-close" : "before-open";
      const beforeEvent = this.createModalEvent({
        stop,
        state: nextState,
        params
      });

      this.$emit(beforeEventName, beforeEvent);
      if (!stopEventExecution) {
        this.visible = nextState;
      }
    },
    callAfterEvent(state) {
      const eventName = state ? "opened" : "closed";
      const event = this.createModalEvent({ state });
      this.$emit(eventName, event);
    },
    createModalEvent(args = {}) {
      return createModalEvent({
        name: this.name,
        ref: this.$refs.modal,
        ...args
      });
    },
    afterTransitionEnter() {
      this.$emit("opened", this.createModalEvent({ state: true }));
    },
    afterTransitionLeave() {
      this.$emit("closed", this.createModalEvent({ state: false }));
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  opacity: 1;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: all 0.2s;
}
.overlay-fade-enter,
.overlay-fade-leave-active {
  opacity: 0;
}
// .modal-overlay-background-click {
//   min-height: 100%;
//   height: 100%;
//   width: 100%;
//   position: relative;
// }
.modal-box {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  &.middle {
    // @include display-flex();
    // @include align-items(center);
    // @include justify-content(center);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
