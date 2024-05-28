<template lang="pug">
div
  .tabs.u-mb-xs
    ul
      li(v-for='tab in tabs', :class="{ 'is-active': tab.isActive }")
        a( @click='selectTab(tab)') {{ tab.name }}
  .tabs-body
    slot

</template>

<script>
export default {
  name: 'AppTabContainer',

  data() {
    return { tabs: [] };
  },
  created() {
    this.tabs = this.$children;
  },

  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.href === selectedTab.href;
      });
    }
  }
};
</script>
<style lang="stylus" >
.tabs
  > ul
    list-style-type: none
    display: flex
    align-items: center
    flex-wrap: wrap
    margin: 0 -20px

    li
      margin: 0 20px 10px

      a
        border-radius: 10em
        display: block
        transition: 200ms
        padding: 5px 0

      &.is-active
        a
          padding: 5px 30px
          background: $clPrimary
          color: $clWhite

.tabs-body
  position: relative
</style>
