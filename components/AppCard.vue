<template lang="pug">
.appCard
  nuxt-link.appCard-url(v-if="url" :to='url' :title="title")
  .appCard-header(v-if="img")
    AppImage.appCard-thumb(:src="img" :alt="title" :title="title")
    .appCard-cat(v-if="customizeCat" :style="{backgroundColor: catColor}") {{ customizeCat }}
  .appCard-body
    h2.appCard-title {{ title }}
    //- span.appCard-date(v-if="date") #[AppIcon(name="time")]  {{ date }}


</template>

<script>
import AppImage from "~/components/AppImage";
export default {
  name: "AppCard",
  props: {
    title: String,
    img: String,
    url: String,
    date: String,
    cat: String,
    catColor: {
      type: String,
      default: "#0088c6"
    }
  },
  components: {
    AppImage
  },
  computed: {
    customizeCat() {
      if (this.cat) {
        if (this.cat === "news") {
          return "أخبار";
        } else if (this.cat === "opinion") {
          return "مقالات";
        } else if (this.cat === "success") {
          return "نجاحات";
        } else if (this.cat === "event") {
          return "فعاليات";
        } else if (this.cat === "culture") {
          return "ثقافة مالية";
        } else if (this.cat === "investment") {
          return "الاستثمار";
        } else if (this.cat === "saving") {
          return "الادخار";
        } else if (this.cat === "spending") {
          return "الانفاق";
        } else if (this.cat === "economy") {
          return "الاقتصاد";
        } else if (this.cat === "ideas") {
          return "أفكار مشاريع";
        } else if (this.cat === "incomes") {
          return "دخل اضافى";
        } else if (this.cat === "career") {
          return "مسارك المهنى";
        } else if (this.cat === "jobs") {
          return "ابحث عن وظيفة";
        } else if (this.cat === "summary") {
          return "خلاصة الكتب";
        } else if (this.cat === "health") {
          return "الصحة";
        } else if (this.cat === "family") {
          return "الأسرة";
        } else if (this.cat === "woman") {
          return "المرأة";
        } else if (this.cat === "banks") {
          return "البنوك";
        }
      }
      return false;
    }
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

.appCard
  position: relative

  &-header
    position: relative

  &-title
    transition: color 200ms
    font-size: 18px;

  &-cat
    position: absolute
    bottom: -5px
    left: 0
    background: $clPrimary
    color: $clWhite
    font-size: 16px
    padding: 8px 15px
    transform: skewY(-20deg)

  &-thumb
    height: auto
    padding-top: 50%
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

  &-date
    font-size: 12px
    margin-top: 10px
    opacity: 0.5

  &.is-wide
    display: flex

    .appCard
      &-header
        width: 120px
        flex: 0 0 120px
        margin-left: unitRes(10, 20)
        height: 80px
      &-thumb
        padding-top: 0
        height: 100%
      &-cat
        transform: none
        font-size: 14px
        padding: 5px
        bottom: 0

      &-body
        padding: 0

  &.is-list
    border-top: 1px solid rgba(0, 0, 0, 0.1)

    &:last-child
      border-bottom: 1px solid rgba(0, 0, 0, 0.1)

    .appCard
      &-title
        font-size: unitRes(16, 18)

  &:hover
    .appCard
      &-thumb
        clip-path: polygon(0 10%, 100% 0, 100% 90%, 0 100%)
        // clip-path: polygon(0 0, 100% 10%, 100% 100%, 0 90%);

      &-title
        color: $clPrimary
</style>
