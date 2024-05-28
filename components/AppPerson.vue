<template lang="pug">
.appPerson
  .appPerson-header(v-if="img")
    AppImage.appPerson-thumb(:src="img")
    img.appPerson-header-bg1(src="~assets/img/u1.png" alt="bg" title="shape")
    img.appPerson-header-bg2(src="~assets/img/u2.png" alt="bg" title="shape")
  //- adsbygoogle(
  //-    class="adsbygoogle"
  //-    style="display:block ;text-align:center; margin-bottom: 60px;"
  //-    data-ad-client="ca-pub-2440369596668454"
  //-    data-ad-slot="7633399042"
  //-    data-ad-format="auto"
  //-    data-full-width-responsive="true"
  //-   )
  .appPerson-body
    h1 {{ title }}
    p(v-if="desc")  {{ desc }}
</template>

<script>
import AppImage from "~/components/AppImage";

export default {
  name: "AppPerson",
  components: {
    AppImage
  },
  props: {
    title: String,
    img: String,
    desc: String
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

.appPerson
  display: flex
  align-items: center
  justify-content: center

  +mq($until: 400px)
    flex-wrap: wrap
    flex-direction: column
    text-align: center

  &-thumb
    width: 140px
    height: 140px
    background-repeat: no-repeat
    background-size: cover
    background-position: center center
    transition: 200ms
    position: relative
    clip-path: polygon(0 10%, 100% 0, 100% 90%, 0 100%)

  &-header
    flex: 0 0 140px
    margin-left: 40px
    position: relative

    +mq($until: 400px)
      margin: 0 0 80px

    &-bg1
      position: absolute
      bottom: -60px
      right: -40px

    &-bg2
      position: absolute
      top: -40px
      left: -10px

  &-body
    h1
      line-height: 1.5

    p
      max-width: 400px
      line-height: 1.6

  &:hover
    .appPerson
      &-thumb
        clip-path: polygon(0 0, 100% 10%, 100% 100%, 0 90%)
</style>
