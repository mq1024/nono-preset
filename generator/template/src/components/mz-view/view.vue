<template>
  <div
    :id="id"
    :class="[viewClass,{'hide-header':hideHeader}]"
  >
    <mz-header
      :viewTitle="viewTitle"
      :hideBackBtn="hideBackBtn"
    >

      <template slot="back-button">
        <slot name="back-btn"></slot>
      </template>
      <template slot="right-button">
        <slot name="right-btn"></slot>
      </template>

    </mz-header>
    <mz-content>
      <slot></slot>
    </mz-content>
    <slot name="footer"></slot>
  </div>
</template>
<script>
import { FROM_APP } from "@/util/const";
import mzHeader from "@/components/mz-view/header.vue";
import mzContent from "@/components/mz-view/content.vue";
export default {
  name: "mz-view",
  components: {
    mzHeader,
    mzContent
  },

  props: {
    viewTitle: String,
    hideBackBtn: Boolean,
    id: String,
    classes: String,
    hideHeader: false
  },
  computed: {
    viewClass() {
      return ["page", this.classes];
    }
  }
};
</script>

<style lang="scss">
.page {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
}
.has-footer .scroll-content {
  padding-bottom: 45px;
}
.hide-header {
  .bar-header {
    display: none;
  }
  .scroll-content {
    margin-top: 0;
  }
}
</style>
