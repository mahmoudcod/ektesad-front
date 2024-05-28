<template lang="pug">
.about
  div(v-if="about")
    section.about-header
      .container
        .grid.is-widescreen-8.is-desktop-10
          .column
            h1.u-title.u-mb-xs عن اقتصاد
            p.u-text-md(v-html="about.description")
      img.about-header-bg(src="~assets/img/about.png" alt="عن اقتصاد" title="عن اقتصاد")
    section.about-body.u-mt-lg
      .container
        .grid.is-tablet-6
          .column.u-mb-col
            .about-card
              .about-card-header
                img(src="~assets/img/about-ico1.png" alt="رؤيتنا" title="رؤيتنا")
              .about-card-body
                h2.h1 رؤيتنا
                p {{ about.vision }}

          .column.u-mb-col
            .about-card
              .about-card-header
                img(src="~assets/img/about-ico2.png" alt="رسالتنا" title="رسالتنا")
              .about-card-body
                h2.h1 رسالتنا
                p {{ about.mission }}

    section.about-video.u-mt-md
      .container
        div(style='padding:56.25% 0 0 0;position:relative;')
          iframe(src='https://player.vimeo.com/video/159990731', style='position:absolute;top:0;left:0;width:100%;height:100%;', frameborder='0', webkitallowfullscreen='', mozallowfullscreen='', allowfullscreen='')
        script(src='https://player.vimeo.com/api/player.js')
  div(style="margin-top: 2rem;" v-else)
    no-data

</template>

<script>
import { GET_ABOUT } from "~/graphql/query";
import noData from "~/components/noData";
export default {
  head() {
    return {
      title: "عن اقتصاد"
    };
  },
  components: {
    noData
  },
  async asyncData({ app, store, error }) {
    try {
      const {
        data: { abouts }
      } = await app.$client.query({
        query: GET_ABOUT
      });
      return { about: abouts[0] };
    } catch (err) {
      return error();
    }
  }
};
</script>

<style lang="stylus">
.about
  &-header
    background: $clPrimary
    padding: unitRes(150, 200) 0
    position: relative

    p
      line-height: 1.6

    &-bg
      position: absolute
      left: -140px
      bottom: -178px
      width: 915px
      max-width: unset

    .container
      position: relative
      z-index: 2

    *
      color: $clWhite

  &-card
    display: flex

    &-header
      flex: 0 0 100px

    &-body
      p
        line-height: 1.4

      h1
        color: $clPimary
</style>
