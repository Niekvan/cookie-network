<template>
  <div class="icon">
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
    <p class="body">
      Turn the knob to explore <br />
      the websites
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.icon {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30%;
  transform: translate(-50%, -50%);
  z-index: 200;
  padding: 1em 5em;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    background: $grey;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

  .body {
    font-size: 3.5em;
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
