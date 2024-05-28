<template lang="pug">
.appCardStock
  slot


</template>

<script>
export default {
  name: "AppCardStock"
};
</script>

<style lang="stylus">
.appCardStock
  width: 100%
  border: 1px solid $clBorder

  &-url
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0

  &-header
    border-bottom: 1px solid $clBorder
    display: flex
    justify-content: space-between
    align-items: center
    position: relative

    .u-bold
      font-size: 20px

      +mq($until: 'mobile')
        font-size: 20px

    > span
      padding: 10px 20px

      +mq($until: 'mobile')
        padding: 5px 5px

      span
        @extend .type-bold

  &-info
    display: flex
    justify-content: space-around
    margin: 20px
    background: $clGray
    text-align: center
    position: relative

    +mq($until: 'mobile')
      margin: 5px

    >span
      padding: 20px 10px

      span
        display: block
        @extend .type-bold

  &-subInfo
    position: relative

    >span
      padding: 0 20px 20px
      display: inline-flex

      +mq($until: 'mobile')
        padding: 0 5px 5px

  &-chart
    background: $clPrimary
    padding: unitRes(20, 40)
</style>
