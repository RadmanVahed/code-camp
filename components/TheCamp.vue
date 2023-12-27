<template>
  <div>
    <div style="display: grid">
        <div class="cf-container">
          <div class="cf-flame-container" id="fireNodes1">
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
          </div>
          <div class="cf-flame-container" id="fireNodes2">
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
          </div>
          <div class="cf-flame-container" id="base-fire">
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
            <div class="cf-flame"></div>
          </div>
          <div class="cf-log-container">
            <div class="cf-log"></div>
            <div class="cf-log"></div>
          </div>
        </div>
        <h1 class="camp text-3xl md:text-4xl lg:text-5xl xl:text-6xl">به کد کمپ خوش آمدید</h1>
      </div>
      <div class="action mt-6">
        <UButton class="camp mr-5" color="orange" size="md" variant="solid">ورود</UButton>
        <UButton class="camp" color="orange" size="md" variant="outline"><a style="color:#fb923c">ثبت نام</a></UButton>
        
      </div>
  </div>
</template>

<script setup lang="ts">
const { $anime } = useNuxtApp();

onMounted(() => {
  animateBaseFire();
  animateFlame1();
  animateFlame2();
  animateFlame3();
  $anime({ targets: ".title", translateX: 250, duration: 800 });
});

function animateBaseFire() {
  $anime({
    targets: "#base-fire .cf-flame",
    delay: $anime.stagger(300),
    translateY: function () {
      return $anime.random(0, -10);
    },
    keyframes: [
      { scale: 0.8 },
      { scale: 0.825 },
      { scale: 0.9 },
      { scale: 0.925 },
      { scale: 1 },
    ],
    duration: 300,
    easing: "easeInOutSine",
    loop: true,
  });
}
function animateFlame1() {
  $anime({
    targets: "#fireNodes1 .cf-flame",
    delay: $anime.stagger(100),
    translateY: () => $anime.random(0, 300),
    rotate: 30,
    opacity: () => $anime.random(0.5, 1),
    translateX: () => $anime.random(0, -60),
    scale: 0,
    skew: () => $anime.random(0, 10),
    loop: true,
    easing: "easeInOutSine",
  });
}
function animateFlame2() {
  $anime({
    targets: "#fireNodes2 .cf-flame",
    delay: $anime.stagger(400),
    translateX: () => $anime.random(-30, 0),
    translateY: () => $anime.random(-260, -160),
    scale: 0,
    rotate: () => $anime.random(0, 60),
    skew: () => $anime.random(0, 30),
    loop: true,
    easing: "easeInOutSine",
  });
}
function animateFlame3() {
  $anime({
    targets: "#fireNodes1 .cf-flame",
    delay: $anime.stagger(500),
    translateY: () => $anime.random(-300, -200),
    opacity: () => $anime.random(0, 1),
    translateX: () => $anime.random(-50, 50),
    scale: 0,
    rotate: () => $anime.random(0, -30),
    skew: () => $anime.random(0, 20),
    loop: true,
    easing: "easeInOutSine",
  });
}
</script>

<style scoped>
.action{
    display: flex;
    justify-content: center;
}
h1 {
  display: flex;
  justify-content: center;
  z-index: 0 !important;
  text-shadow: 3px 3px 0px #fb923c;
  width: auto;
  font-weight: bold;
}
.cf-container {
    margin-left: 1rem;
  box-sizing: content-box;
  width: 300px;
  height: 300px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .cf-flame-container {
    width: 100px;
    height: 100px;
    bottom: 0px;
    position: absolute;
  }

  .cf-log-container {
    width: 60%;
    height: 100px;
    position: absolute;
    bottom: 0px;
    left: 50px;
  }

  .cf-flame-container#base-fire {
    .cf-flame:nth-child(1) {
      background: #c63509;
      opacity: 0.95;
    }
    .cf-flame:nth-child(2) {
      background: #cd4015;
      width: 100px;
      height: 100px;
      opacity: 0.85;
      left: 75px;
    }
    .cf-flame:nth-child(3) {
      background: #d73e0f;
      width: 60px;
      height: 60px;
      opacity: 0.85;
      left: 130px;
    }
  }

  .cf-flame-container:nth-child(2) {
    width: 150px;
    height: 150px;
    bottom: 0px;
    position: absolute;

    .cf-flame {
      width: 75px;
      height: 75px;
      left: 75px;
    }
  }
}

.cf {
  &-log {
    background: #723830;
    width: 20px;
    height: 30px;
    transform-origin: center;
    position: absolute;
    bottom: 0px;
    border-radius: 0.5em;
    box-shadow: 0 3px 10px #372113;
    width: 100%;
    &:nth-child(1) {
      transform: rotate(15deg);
    }
    &:nth-child(2) {
      transform: rotate(-15deg);
    }
  }
  &-flame:nth-child(1) {
    background: #f5ed8f;
  }
  &-flame:nth-child(2) {
    background: #fde239;
  }
  &-flame:nth-child(3) {
    background: #ffdc01;
  }
  &-flame:nth-child(4) {
    background: #fdac01;
  }
  &-flame:nth-child(5) {
    background: #d73e0f;
  }
  &-flame:nth-child(6) {
    background: #cd4015;
  }
  &-flame:nth-child(7) {
    background: #c63509;
  }
  &-flame:last-child {
    background: #c63509;
  }
  &-flame {
    background: #cd4015;
    width: 100px;
    height: 100px;
    border-radius: 1em;
    position: absolute;
    bottom: 0px;
    left: 100px;
  }
}

#fireNodes2 .cf-flame {
  animation: flameColor 1.5s ease-out infinite;
}

@keyframes flameColor {
  0% {
    background: #c63509;
  }
  20% {
    background: #cd4015;
  }
  30% {
    background: #fdac01;
  }
  50% {
    background: #ffb401;
  }
  60% {
    background: #fdac01;
  }
  70% {
    background: #ffdc01;
  }
  80% {
    background: #fde239;
  }
  100% {
  }
}
</style>
