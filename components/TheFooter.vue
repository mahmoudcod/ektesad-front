<template lang="pug">
.appFooter
  .container
    ul.appFooter-menu
      //- li: nuxt-link(to="/stocks") الأسهم
      //- li: nuxt-link(to="/commodities") السلع
      li: nuxt-link(to="/characters") شخصيات
      li: nuxt-link(to="/priavcyPolicy") سياسة الخصوصية
      li: nuxt-link(to="/publish") انشر مقالك
      li: nuxt-link(to="/about") #[span من نحن ]
      li: nuxt-link(to="/stories") نجاحات
      li: nuxt-link(to="/usingConditions") شروط الاستخدام
      li: nuxt-link(to="/adv-add") أضف اعلانك
      li: nuxt-link(to="/contact") أتصل بنا
      li: nuxt-link(to="/mediaCharter") الميثاق الاعلامي
      //- li: a(href="/currencies") العملات
      li: a(href="/authors") فريق المحررين
      li: a(href="/compound-interest-calculator") حاسبة الفائدة المركبة
      li: a(href="/credit-card-calculator") حاسبة بطاقة الائتمان
      li: a(href="/personal-loan-calculator") حاسبة القرض الشخصي


    .appFooter-subscribe
      h2.u-mb-ts القائمة البريدية
      form.appFooter-subscribe-form(action="https://ektesad.us14.list-manage.com/subscribe/post?u=036dbfc3b6fe1b2daa9cc7460&amp;id=fb0242e775" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" rel="noopener" novalidate)
        input.input.is-white.is-static.u-mb-0(type="email" placeholder="البريد الالكتروني ")
        button.button.is-static.is-white اشتراك
    .appFooter-rights
      p.u-mt-xs حقوق الطبع والنشر محفوظةـ #[br] اقتصاد {{getYear}}
      p صمم بحب #[AppIcon(name="heart")] في  #[a(href="https://www.baianat.com/" target="_blank" rel="noopener") بيانات]
  img.appFooter-bg1(src="~assets/img/footer.png" alt="bg" title="footer")
  img.appFooter-bg2(src="~assets/img/footer.png" alt="bg" title="footer")


</template>

<script>
import AppSocials from "~/components/AppSocials";
export default {
  name: "appFooter",
  components: {
    AppSocials
  },
  computed: {
    getYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style lang="stylus">
.appFooter
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
  position: relative
  background-color: #202020
  padding: 100px 0
  color: $clWhite
  margin-top: 80px
  .container
    display: flex
    justify-content: space-between
    position: relative
    z-index: 2
    align-items: baseline
    gap: 20px

    +mq($until: 'desktop')
      flex-wrap: wrap

  a
    color: $clWhite

    &:hover
      color: $clPrimary

  &-menu
    display: flex
    list-style-type: none
    flex-wrap: wrap

    +mq($until: 'widescreen')
      flex: 0 0 32%

    +mq($until: 'desktop')
      flex: 0 0 100%
      margin-bottom: 40px

    li
      width: 25%
      margin-bottom: 5px
      font-size: 12px

      +mq($until: 'widescreen')
        width: 33%

  &-subscribe
    max-width: 470px;
    p
      font-size: 12px

    +mq($until: 'mobile')
      flex: 0 0 100%
      margin-bottom: 40px

    &-form
      display: flex
      width: 70%

      input::placeholder
        font-size: 12px

      button
        font-size: 12px

  &-rights
    +mq($until: 'mobile')
      flex: 0 0 100%

    .icon-heart
      fill: $clPrimary
      animation: heartbeat 1s infinite

    p
      font-size: 12px
      line-height: 1.5

  &-bg1
    position: absolute
    right: -180px
    top: -90px

  &-bg2
    position: absolute
    left: -240px
    bottom: 20px

@keyframes heartbeat
  0%
    transform: scale(0.75)

  20%
    transform: scale(1)

  40%
    transform: scale(0.75)

  60%
    transform: scale(1)

  80%
    transform: scale(0.75)

  100%
    transform: scale(0.75)
</style>
