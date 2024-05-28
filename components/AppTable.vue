<template lang="pug">
table.appTable
  slot
</template>

<script>
export default {
  name: 'AppTable'
};
</script>

<style lang="stylus">
.appTable
  width: 100%
  border: 1px solid $clBorder
  border-collapse: collapse

  td
    >img
      max-width: 30px
      height: auto
      display: block

  td, th
    text-align: right
    padding: 15px
    border: 0

    +mq($until: 'mobile')
      padding: 5px

  &.is-striped
    tbody tr:nth-of-type(odd)
      background-color: $clBorder
</style>
