<template>
  <div class="alert">
    <div class="alert-head">
      <div
        class="title"
        v-if="title"
        v-html="title"
      > </div>
      <div
        class="dialog-content"
        v-html="content"
      ></div>
    </div>
    <div class='alert-button'>
      <div
        :class="okType"
        @click="handleOk"
      >
        {{okText}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "alert",
  props: {
    transition: {
      type: String,
      default: "fade"
    },
    bgClose: Boolean,
    classes: String,
    title: String,
    content: String,
    okText: {
      type: String,
      default: "确认"
    },
    okType: {
      type: String,
      default: "button button-positive button-clear"
    },
    onOk: Function,
    onCancel: Function
  },
  methods: {
    handleOk() {
      if (this.onOk && typeof this.onOk === "function") {
        this.onOk();
        this.$modal.hide("alert");
      } else {
        this.$modal.hide("alert");
      }
    }
  }
};
</script>
<style lang="scss">
.alert {
  width: 72%;
  background: #fff;
  border-radius: 12px;
}
.alert-head {
  padding: 20px 15px;
  .title {
    padding-bottom: 10px;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }
}
.alert-button {
  border-top: 1px solid #eee;
  display: flex;
  .button {
    height: 43px;
    line-height: 43px;
    flex: 1;
    border-radius: 0 0 12px 12px;
    font-size: 16px;
    text-align: center;
  }
}
.dialog-content {
  font-size: 14px;
}
</style>
