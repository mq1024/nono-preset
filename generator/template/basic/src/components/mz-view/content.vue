<template>
  <div class="scroll-content">
    <div class="scroll-content-inner">
      <slot></slot>
    </div>

  </div>
</template>
<script>
export default {
  name: 'nono-content'
};
</script>
<style lang="scss">
.scroll-content {
  width: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: 44px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  transform: translate3d(
    0,
    0,
    0
  ); //父级元素设置了transform属性，position:fixed会基于此定位
}
// fix动态加载内容 页面不滚动bug
.scroll-content-inner {
  min-height: calc(100% + 1px);
}
</style>
