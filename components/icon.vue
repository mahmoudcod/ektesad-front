<template lang="pug">
svg.icon(version="1.1" xmlns="http://www.w3.org/2000/svg" :class="`icon-${name}`" :viewBox='icon.viewBox' :id='`icon-${name}`' )
  path(d='M0 0h24v24H0z' fill='none' v-if="icon.viewBox")
  path(:d="icon.path")
</template>

<script>
import icons from "~/assets/data/icons.json";

export default {
  name: "b-icon",
  inheritAttrs: true,
  props: {
    name: {
      type: String,
      required: true,
      validator: val => val in icons
    }
  },
  computed: {
    icon() {
      const icon = icons[this.name];
      if (typeof icon === "string") {
        return {
          path: icon,
          viewBox: "0 0 24 24"
        };
      }

      return icon;
    }
  }
};
</script>
<style lang="stylus"></style>
