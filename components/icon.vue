<template lang="pug">
svg.icon(version="1.1" xmlns="http://www.w3.org/2000/svg" :class="`icon-${name}`" :viewBox='icon.viewBox' :id='`icon-${name}`')
  path(d='M0 0h24v24H0z' fill='none' v-if="icon.viewBox")
  path(:d="icon.path")
</template>

<script>
import icons from "~/assets/data/icons.json";
import gql from 'graphql-tag';

export const GET_SETTINGS = gql`
  query getSettings {
    settings {
      appLogo
    }
  }
`;

export default {
  name: "appIcon",
  inheritAttrs: true,
  props: {
    name: {
      type: String,
      required: true,
      validator: val => val in icons || val === 'appLogo'
    }
  },
  data() {
    return {
      appLogoPath: null
    };
  },
  computed: {
    icon() {
      if (this.name === 'appLogo') {
        const path = this.appLogoPath || "M10 10 H 90 V 90 H 10 Z"; // Default to 'empty' path if appLogoPath is null
        return {
          path: path,
          viewBox: "0 0 24 24"
        };
      }
      const icon = icons[this.name];
      if (typeof icon === "string") {
        return {
          path: icon,
          viewBox: "0 0 24 24"
        };
      }
      return icon;
    }
  },
  async created() {
    if (this.name === 'appLogo') {
      try {
        const response = await this.$apollo.query({ query: GET_SETTINGS });
        this.appLogoPath = response.data.settings.appLogo || "M10 10 H 90 V 90 H 10 Z"; // Default to 'empty' path if the response is empty
      } catch (error) {
        console.error("Error fetching appLogo path:", error);
      }
    }
  }
};
</script>
<style lang="stylus"></style>
