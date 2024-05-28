<template lang="pug">
div
  button.arrowUp.button.is-secondary.is-rounded(@click="smoothScroll")
    span #[BIcon(name="arrow-up")]
</template>
 
<script>
import BIcon from "~/components/icon";

export default {
  name: "arrow-up",
  components: {
    BIcon
  },
  methods: {
    currentYPosition() {
      // Firefox, Chrome, Opera, Safari
      if (self.pageYOffset) return self.pageYOffset;
      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop) return document.body.scrollTop;
      return 0;
    },
    smoothScroll() {
      var startY = this.currentYPosition();
      var stopY = 0;
      var distance = stopY > startY ? stopY - startY : startY - stopY;
      if (distance < 100) {
        scrollTo(0, stopY);
        return;
      }
      var speed = Math.round(distance / 100);
      if (speed >= 20) speed = 20;
      var step = Math.round(distance / 25);
      var leapY = stopY > startY ? startY + step : startY - step;
      var timer = 0;
      if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
          setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
          leapY += step;
          if (leapY > stopY) leapY = stopY;
          timer++;
        }
        return;
      }
      for (var i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
      }
    }
  }
};
</script>


<style lang="stylus">
button.arrowUp
  width: 2.2em
  height: 2.2em
  position: fixed
  bottom: 10px
  left: 10px
  fill: $clSecondary
  transition: all 250ms ease
  cursor: pointer
  z-index: 999
  display: flex
  align-items: center

  span
    position: absolute

  &:hover
    transform: scale(1.1)

.button .icon:only-child
  width: 1.4em
  height: 1.4em
</style>
