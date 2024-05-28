<template lang="pug">
.overlay(v-if="status")
  .overlay-loader
</template>

<script>
export default {
  props: ['status']
};
</script>


<style lang="stylus">
.overlay
  position: fixed
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100%
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: rgba(0, 0, 0, 0.3)
  z-index: 999999

  &-loader
    border: 8px solid #fff
    border-top: 8px solid $clPrimary
    border-radius: 50%
    width: 60px
    height: 60px
    animation: spin 2s linear infinite

@keyframes spin
  0%
    transform: rotate(0deg)

  100%
    transform: rotate(360deg)
</style>
