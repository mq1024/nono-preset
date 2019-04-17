<template>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    :width="width"
    :height="height"
  >
    <image
      xlink:href="./images/icon_mz.png"
      width="12"
      height="16"
      x="11"
      y="9"
      id="mz_icon"
    />

    <circle
      fill="none"
      cx="16"
      cy="16"
      r="15"
      class="circle"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 16 16"
        to="360 16 16"
        dur="1.5s"
        repeatCount="indefinite"
      />

    </circle>

  </svg>
</template>
<script>
export default {
  name: "mz-loader",
  props: {
    color: {
      type: String,
      default: "#000"
    },
    width: {
      type: Number,
      default: 32
    },
    height: {
      type: Number,
      default: 32
    }
  }
};
</script>
<style lang="scss" scoped>
#mz_icon {
  animation: fade 1.5s infinite;
}
.circle {
  stroke: #e1e1e1;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 107;
  animation: run 1.5s infinite;
  opacity: 0.8;
}
@keyframes run {
  0% {
    opacity: 0.8;
    stroke-dashoffset: 107; //圆周长
  }
  100% {
    opacity: 1;
    stroke-dashoffset: 20;
  }
}
@keyframes fade {
  from {
    opacity: 0.8;
  }
  to {
    opacity: 1;
  }
}
</style>


