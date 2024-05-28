<template lang="pug">
.appVisitor
  nuxt-link.appVisitor-url(v-if="url" :to='url' :title="title")
  .appVisitor-header(v-if="img")
    AppImage.appVisitor-thumb(:src="img" :alt="title" :title="title")
  .appVisitor-body
    h1.appVisitor-subtitle {{ subTitle }}
    h2.appVisitor-title {{ title }}


</template>

<script>
import AppImage from "~/components/AppImage";
export default {
  name: "AppVisitor",
  props: {
    title: String,
    img: String,
    url: String,
    subTitle: String
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

.appVisitor
  position: relative
  background: #F1F5F8
  padding: 20px
  display: flex
  margin-bottom: 10px

  &-header
    position: relative
    height: 100px
    width: 120px
    flex: 0 0 120px
    margin-left: unitRes(10, 20)
  &-title
    transition: color 200ms
    font-size: 16px
    font-weight: bold

  &-subtitle
    font-size: 16px
    font-weight: 500
    margin-bottom: 10px
    display: flex
    align-items: center

    &::before
      display: inline-block;
      content: "";
      border-right: .3rem solid #0088c6;
      height: 1.5rem;
      margin-left: 0.5rem;


  &-thumb
    height: 100%
    width: 100%
    background-repeat: no-repeat
    background-size: cover
    background-position: center center
    transition: 200ms
    position: relative
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)

  &-url
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    display: block
    z-index: 2
    font-size: 12px

  &-body
    padding: unitRes(10, 20) 0

    +mq($until: 'tablet')
      padding: 20px 0
</style>
