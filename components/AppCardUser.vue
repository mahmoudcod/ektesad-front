<template lang="pug">
.appCardUser
  nuxt-link.appCardUser-url(v-if="url" :to='url' :title="title")
  .appCardUser-header(v-if="img")
    AppImage.appCardUser-thumb(:src="img" :alt="title" :title="title")
  .appCardUser-body
    h2.appCardUser-title {{ title }}
    p.appCardUser-desc(v-if="desc")  {{ desc }}


</template>

<script>
import AppImage from "~/components/AppImage";
export default {
  name: "AppCardUser",

  props: {
    title: String,
    img: String,
    url: String,
    desc: String
  },
  components: {
    AppImage
  }
};
</script>

<style lang="stylus">
.fade
  animation-name: fade
  animation-duration: 2s

@keyframes fade
  from
    opacity: 0

  to
    opacity: 1

.appCardUser
  position: relative
  text-align: center

  &-header
    display: flex

  &-thumb
    height: 120px
    width: 120px
    background-repeat: no-repeat
    background-size: cover
    background-position: center center
    transition: 200ms
    position: relative
    clip-path: polygon(0 15%, 100% 0, 100% 85%, 0 100%)
    margin: auto

  &-url
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    display: block
    z-index: 2

  &-body
    p
      font-size: 14px

  &-title
    margin-top: unitRes(10, 20)

  &-desc
    margin-top: unitRes(5, 10)

  &:hover
    .appCardUser
      &-thumb
        clip-path: polygon(0 0, 100% 15%, 100% 100%, 0 85%)

      &-title
        color: $clPrimary
</style>
