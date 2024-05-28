<template lang="pug">
.appHeader#appHeader(:class="{'is-open' : menu}")
  .container
    .appHeader-top(:class="{'is-search' : search}")
      nuxt-link.appHeader-logo(to="/")
        AppIcon(name="appLogo")
      //- .appHeader-bn(style="width:100%")
      //- a.appHeader-bn(href="/")
      //-   img(src="a/2.jpg" alt="3" title="الرئيسيه")


      //- .appHeader-search
      //-   input.input.is-static.appHeader-search-input(@keyup.enter="goToSearchPage(), goSearch=true" type="text" v-model="text" placeholder="هل تبحث عن شيئ ؟")
      //-   button.button.is-static.appHeader-search-button(v-if="!goSearch"): AppIcon(name="search")
      //-   button.button.is-static.appHeader-search-button(v-else :class="is-loading") تح


      ul.appHeader-menu
        //- li: nuxt-link(to="/") #[img(src="~assets/img/icons/1.png" alt="الرئيسيه" title="الرئيسيه")] #[span الرئيسية]
        //- li: nuxt-link(to="/news") #[img(src="~assets/img/icons/1.png")] #[span الأخبار]
        li
          a(href="#0") #[img(src="~assets/img/icons/6.png" alt="الثروة" title="الثروة")] #[span الثروة ]
          ul.homeIntro-chart-header
            li: nuxt-link(to="/category/investment") الاستثمار
            li: nuxt-link(to="/category/saving") الادخار
            li: nuxt-link(to="/category/spending") الانفاق
            li: nuxt-link(to="/category/economy") الاقتصاد
            li: nuxt-link(to="/category/banks") البنوك
        li
          a(href="#0") #[img(src="~assets/img/icons/2.png" alt="مال وأعمال" title="مال وأعمال")] #[span مال وأعمال]
          ul.homeIntro-chart-header
            li: nuxt-link(to="/category/ideas") أفكار مشاريع
            li: nuxt-link(to="/category/incomes")   دخل اضافى
            li: nuxt-link(to="/category/career") مسارك المهنى
            li: nuxt-link(to="/category/jobs") ابحث عن وظيفة
            li: nuxt-link(to="/category/entrepreneurship") ريادة الأعمال
        li
          a(href="#0") #[img(src="~assets/img/icons/4.png" alt="دع الحياة تتحسن" title="دع الحياة تتحسن")] #[span دع الحياة تتحسن]
          ul.homeIntro-chart-header
            li: nuxt-link(to="/category/culture") ثقافة مالية
            li: nuxt-link(to="/category/summary") خلاصة الكتب
            li: nuxt-link(to="/category/health") الصحة
            li: nuxt-link(to="/category/family") الأسرة
            li: nuxt-link(to="/category/woman")  المرأة

        li
          a(href="#0") #[img(src="~assets/img/icons/5.png" alt="نجاحات" title="نجاحات")] #[span نجاحات]
          ul.homeIntro-chart-header
            li: nuxt-link(to="/stories") قصص
            li: nuxt-link(to="/characters") شخصيات
        //- li: nuxt-link(to="/contact") #[img(src="~assets/img/icons/6.png")] #[span سؤال وجواب]
        //- li: nuxt-link(to="/characters") #[img(src="~assets/img/icons/4.png")] #[span شخصيات]
        //- li: nuxt-link(to="/opinion") #[img(src="~assets/img/icons/5.png")] #[span رأي]
        //- li: nuxt-link(to="/events") #[img(src="~assets/img/icons/6.png")] #[span الفعاليات]
        li
          a(href="#0") #[img(src="~assets/img/icons/9.png" alt="حاسبات مقترحة" title="حاسبات مقترحة")] #[span حاسبات مقترحة]
          ul.homeIntro-chart-header
            li: nuxt-link(to="/compound-interest-calculator") حاسبة الفائدة المركبة
            li: nuxt-link(to="/credit-card-calculator") حاسبة بطاقة الائتمان
            li: nuxt-link(to="/personal-loan-calculator") حاسبة القرض الشخصي
        //- li: nuxt-link(to="/contact") #[img(src="~assets/img/icons/8.png" alt="اتصل بنا" title="اتصل بنا")] #[span اتصل بنا ]
        //- li: nuxt-link.appHeader-menu-cta(to="/publish") #[span انشر مقالك]

      .appHeader-icons
        .appHeader-icons-search(@click="openSearchPopup = true")
          AppIcon(name="search")
        AppSocials
      .appHeader-triggers
        .appHeader-search-trigger(@click.prevent="search = !search"): AppIcon(name="search")
        .appHeader-menu-trigger(@click.prevent="menu = !menu"): AppIcon(name="menu")

  AppPopup(v-if="openSearchPopup" @close="openSearchPopup = false")
    .appHeader-search
      input.input.is-static.appHeader-search-input(@keyup.enter="goToSearchPage(), goSearch=true,openSearchPopup = false" type="text" v-model="text" placeholder="هل تبحث عن شيئ ؟")
      button.button.is-static.appHeader-search-button(v-if="!goSearch"): AppIcon(name="search")
      button.button.is-static.appHeader-search-button(v-else :class="is-loading") تح


</template>

<script>
import AppSocials from "~/components/AppSocials";
import ArabicLocal from "date-fns/locale/ar/";
import AppPopup from "~/components/AppPopup";

import bus from "~/plugins/bus";

export default {
  name: "appHeader",
  components: {
    AppSocials,
    AppPopup
  },
  data: () => ({
    menu: false,
    search: false,
    goSearch: false,
    text: "",
    openSearchPopup: false
  }),
  methods: {
    goToSearchPage() {
      this.$router.push(`/search?text=${this.text}`);
    }
  },
  mounted() {
    bus.$on("stopLoading", () => {
      this.goSearch = false;
    });
  },
  watch: {
    $route(to, from) {
      if (this.menu) this.menu = !this.menu;

      from.name == "search" ? (this.text = "") : "";
    }
  }
};
</script>

<style lang="stylus">
body
  .appHeader
    -webkit-touch-callout: none
    -webkit-user-select: none
    -khtml-user-select: none
    -moz-user-select: none
    -ms-user-select: none
    user-select: none
    z-index: 999999
    position: relative
    top: 0
    right: 0
    left: 0
    background: $clWhite

    &.is-open
      .appHeader
        &-menu
          transform: none

    &.is-scroll
      .appHeader
        &-menu
          +mq($from: 'desktop')
            height: 0px
            overflow: hidden
            padding-top: 0
            padding-bottom: 0
            margin-top: 0
            margin-bottom: 0

    &-triggers
      display: flex
      align-items: center
      margin: 0 -5px

      +mq($from: 'desktop')
        display: none

      >div
        margin: 0 5px

    &-top
      display: flex
      border-bottom: 1px solid rgba(0, 0, 0, 0.1)
      padding: 15px 0
      justify-content: space-between
      align-items: center

      +mq($until: 'desktop')
        flex-wrap: wrap

      &.is-search
        .appHeader
          &-search
            display: block

    &-logo
      display: block

      .icon
        width: 140px
        height: 47px
        fill: $clPrimary
        transition: fill 200ms

        &:hover
          fill: $clSecondary

    &-search
      position: relative
      // width: 220px

      +mq($until: 'desktop')
        display: none

      +mq($until: 'widescreen')
        width: 170px

      &-input
        padding-left: 35px !important
        // height: 30px !important
        height: 64px !important
        line-height: 30px !important
        margin: 0
        width: 100%
        // border-radius: 20em
        background: #ffff

      &-button
        // height: 30px !important
        height: 64px !important
        line-height: 30px !important
        position: absolute
        left: 0
        top: 0
        margin: 0
        background: none
        border: none

        .icon
          fill: $clBorder

      &-trigger
        cursor: pointer
        font-size: 30px
        display: none

        +mq($until: 'desktop')
          display: block

      +mq($until: 'desktop')
        position: absolute
        top: 100%
        left: 0
        right: 0
        width: 100%

        .appHeader-search
          &-input
            background: $clWhite
            border-radius: 0

    &-bn
      display: block
      max-width: 550px

      +mq($until: 'widescreen')
        max-width: 300px

      img
        width: 100%
        height: auto
        display: block
    &-icons
      display: flex
      align-items: center
      &-search
        display: inline-flex;
        flex: 0 0 30px;
        height: 30px;
        width: 30px;
        margin: 0 5px;
        opacity: 0.9;
        transition: opacity 200ms;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        cursor: pointer;
        +mq($until: 'desktop')
          display: none;
    &-menu
      list-style-type: none
      display: flex
      justify-content: space-between
      align-items: center
      font-size: 16px
      @extend .type-bold
      // border-bottom: 1px solid rgba(0, 0, 0, 0.1)
      padding: 20px 0
      margin: 0 15px
      transition: 200ms
      width: 100%
      max-width: 800px

      +mq($until: 'desktop')
        flex-wrap: wrap

      +mq($until: 'widescreen')
        font-size: 14px
        max-width: 500px


      img
        width: 20px
        height: auto
        flex: 0 0 20px
        margin-left: 10px
        display: block

      li
        position: relative

        &:hover, &:focus, &:active
          >ul
            max-height: 400px
            opacity: 1

        >a
          display: flex
          align-items: center

        >ul
          position: absolute
          top: calc(100% + 28px)
          right: 0
          width: 200px
          background: $clWhite
          list-style-type: none
          max-height: 0px
          transition: 300ms ease-in-out
          overflow: hidden
          border: 1px solid rgba(0, 0, 0, 0.1)
          opacity: 0
          z-index: 3

          +mq($until: 'desktop')
            top: 100%

          a
            padding: 10px 25px 10px 10px

          li
            &:first-child
              a
                padding-top: 20px

            &:last-child
              a
                padding-bottom: 20px

      &-cta
        background: $clSecondary
        color: $clWhite
        padding: 8px 20px
        transition: 200ms
        border-radius: 20em

        // transform: skewX(-30deg)

        // span
        // transform: skewX(30deg)
        &:hover
          color: $clWhite
          background: $clPrimary

      &-trigger
        cursor: pointer
        font-size: 30px
        display: none

        +mq($until: 'desktop')
          display: block

    +mq($until: 'desktop')
      .appHeader
        &-top
          z-index: 999999
          position: relative

        &-bn
          display: none

        &-menu
          position: fixed
          top: 0
          bottom: 0
          right: 0
          width: 300px
          padding: 20px
          background: $clWhite
          display: block
          z-index: 999999
          padding-top: 120px
          transform: translateX(100%)
          transition: transform 200ms
          height: 100vh

          li
            margin-bottom: 20px

      .appSocials
        display: none

input.input.is-static.appHeader-search-input::placeholder
  font-size: 12px
</style>
