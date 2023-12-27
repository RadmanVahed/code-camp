<template>
  <div>
    <TheHeader class="mt-5" />
    <slot />
    <div class="background">
      <div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-grow: 1;
  z-index: -1;
}

.background div {
  position: absolute;
  border-radius: 100%;
  height: 100%;
  filter: blur(240vw);
  opacity: 0.4;
  background: linear-gradient(132deg, #fb923c 0%, #cd4015 100%);
  width: 89%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
