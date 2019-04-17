<template>
  <div class="confirm">
    <div class="confirm-head">
      <div
        class="title"
        v-if="title"
        v-html="title"
      > </div>
      <div
        class="content"
        v-html="content"
      ></div>
    </div>
    <div class='confirm-buttons'>
      <div
        :class="cancelType"
        @click="handleCancel"
      >
        {{cancelText}}
      </div>
      <div
        :class="okType"
        @click="handleConfirm"
      >
        {{okText}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "confirm",
  props: {
    transition: {
      type: String,
      default: "fade"
    },
    bgClose: Boolean,
    classes: String,
    title: String,
    content: String,
    cancelText: {
      type: String,
      default: "取消"
    },
    okText: {
      type: String,
      default: "确认"
    },
    cancelType: {
      type: String,
      default: "button button-default button-clear"
    },
    okType: {
      type: String,
      default: "button button-positive button-clear"
    },
    onOk: Function,
    onCancel: Function
  },
  methods: {
    handleCancel() {
      if (this.onCancel && typeof this.onCancel === "function") {
        this.onCancel();
      } else {
        this.$modal.hide("confirm");
      }
    },
    handleConfirm() {
      if (this.onOk && typeof this.onOk === "function") {
        this.onOk();
        this.$modal.hide("confirm");
      } else {
        this.$modal.hide("confirm");
      }
    }
  }
};
</script>
<style lang="scss">
.confirm {
  width: 72%;
  background: #fff;
  border-radius: 12px;
}
.confirm-head {
  padding: 20px 15px;
  .title {
    padding-bottom: 10px;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }
}
.confirm-buttons {
  border-top: 1px solid #eee;
  // @include display-flex();
  display: flex;

  .button {
    height: 43px;
    line-height: 43px;
    flex: 1;
    // @include flex(1);
  }
  .button:first-child {
    border-radius: 0 0 0 12px;
    border-right: 1px solid #eee;
  }
  .button:last-child {
    border-radius: 0 0 12px 0;
  }
}
</style>
