<template lang="pug">
.appNew
  nuxt-link.appNew-url(v-if="url" :to='url' :title="title")
  .appNew-body
    AppImage.appNew-thumb(:src="img" :alt="title" :title="title")
    .appNew-footer
      h2.appNew-title {{ title }}
      span.appNew-more  {{ desc }}
</template>

<script>
import AppImage from "~/components/AppImage";
export default {
  name: "AppNew",
  props: {
    title: String,
    url: String,
    desc: String,
    img: String,
    date: String
  },
  components: {
    AppImage
  }
};
</script>

<style lang="stylus">
.appNew
  background-color: #F1F5F8
  position relative
  padding: 20px
  margin-bottom: 10px
  &-title
    transition: color 200ms
    font-size: 16px;
    margin-top: 0;

  &-url
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    display: block
    z-index: 2
    font-size: 12px
  &-more
    color: #0088C6
    font-size: 14px
    font-weight: bold
  &-body
    display: flex
    align-items: center
  &-footer
    margin-right: 10px
  &-thumb
    height: 50px !important
    width: 50px !important
    background-repeat: no-repeat
    background-size: cover
    background-position: center center
    transition: 200ms
    position: relative !important
</style>
