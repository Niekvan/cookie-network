<template>
  <div class="icon">
    <p class="icon__text">
      Turn the knob to explore the websites
    </p>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -5 374.68 350">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_5" data-name="Layer 5">
          <path class="cls-1" d="M365,180.6A182,182,0,0,0,1,183" />
          <path
            class="cls-2"
            d="M374.19,166.69a1,1,0,0,0-1.37.34l-7.89,13.11-8.54-12.69a1,1,0,1,0-1.66,1.11l9.41,14a1,1,0,0,0,.86.44,1,1,0,0,0,.83-.48l8.7-14.46a1,1,0,0,0,.15-.54A1,1,0,0,0,374.19,166.69Z"
          />
        </g>
        <g id="Layer_4" data-name="Layer 4">
          <path
            class="cls-2"
            d="M182.5,54.5a129,129,0,1,0,129,129A129,129,0,0,0,182.5,54.5Zm0,220.54A91.54,91.54,0,1,1,274,183.5,91.55,91.55,0,0,1,182.5,275Z"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.icon {
  position: fixed;
  top: 100%;
  left: 0;
  transform: translate(0, calc(-100% - 6rem));
  z-index: 200;
  padding: 1em 5em;

  &__text {
    font-size: 3rem;
  }

  svg {
    margin-left: 50%;
    transform: translateX(-50%);
    width: 10rem;
  }
}
.cls-1 {
  fill: none;
  stroke: $primary;
  stroke-miterlimit: 10;
  stroke-width: 2px;
}
.cls-2 {
  fill: $primary;
}
</style>
