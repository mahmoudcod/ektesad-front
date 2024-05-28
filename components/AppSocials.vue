<template lang="pug">
 .appSocials
  a.is-facebook(href="https://www.facebook.com/ektesd" target="blank" rel="no-opener" title="Facebook") #[AppIcon(name='facebook')]
  a.is-twitter(href="https://twitter.com/Ektesad" title="Twitter" target="_blank" rel="noopener") #[AppIcon(name='twitter')]
  a.is-isinstagram(href="https://www.instagram.com/ektesad1/" target="blank" rel="no-opener" title="instagram") #[AppIcon(name='instagram')]
  a.is-linkedin(href="https://www.linkedin.com/company/ektesad" target="blank" rel="no-opener" title="linkedIn") #[AppIcon(name='linkedin')]

</template>

<script>
export default {
  name: "AppSocials"
};
</script>

<style lang="stylus">
.appSocials
  position: relative
  display: flex
  margin: 0 -5px

  a
    display: inline-flex
    flex: 0 0 30px
    height: 30px
    width: 30px
    border-radius: 44em
    color: $clWhite
    background: $clPrimary
    margin: 0 5px
    opacity: 0.9
    transition: opacity 200ms

    .icon
      margin: auto
      fill: $clWhite

    &.is-facebook
      background: #3b5998

    &.is-twitter
      background: #1da1f2

    &.is-instagram
      background: rgb(0, 100, 120)
      font-size: 16px

    &.is-linkedin
      background: #0077B5
      font-size: 16px

    &:hover
      opacity: 1
</style>
