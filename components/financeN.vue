<template lang="pug">
  div
    .finance-n
      ul
        li {{number}}
        li.finance-n-value
          span {{text}}
        li.finance-n-icon(v-if="status == true"): AppIcon(name='trending')
        li.finance-n-icon-down(v-else): AppIcon(name='trending-down')
</template>

<script>
export default {
  name: "finance-n",
  props: {
    text: {
      type: String,
      default: "DIST"
    },
    number: {
      type: String,
      default: "8.8721"
    },
    status: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="stylus">
.finance-n
  border: .1rem solid rgba(0,0,0, .1);
  padding: 1rem;
  height: 100%;
  &-icon
    color: rgb(55, 173, 113);
    svg
      fill: rgb(55, 173, 113);
    &-down
      svg
        fill: red;
  &-value
    span
      padding: 0rem .5rem;
      white-space: nowrap;
  ul
    list-style: none;
    width :100%;
    margin: 0rem;
    display:flex;
    justify-content: space-between;
    align-items: center;
    li
      display: inline-block;
      font-family:  "IBMPlexSansArabic", sans-serif;
      span
        font-family:  "IBMPlexSansArabic", sans-serif;
        font-size: 14px;
        font-weight: 600;
        border-left: .1rem solid rgba(0,0,0, .1);
        border-right: .1rem solid rgba(0,0,0, .1);
</style>
