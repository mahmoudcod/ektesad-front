<template lang="pug">
div(v-show="isActive")
  slot

</template>

<script>
export default {
  name: "AppTabItem",

  props: {
    name: { required: true },
    selected: { default: false }
  },

  data() {
    return {
      isActive: false
    };
  },

  computed: {
    href() {
      return "#" + this.name.toLowerCase().replace(/ /g, "-");
    }
  },

  mounted() {
    this.isActive = this.selected;
  }
};
</script>
<style lang="stylus"></style>
