<template lang="pug">
.app
  TheHeader
  //- adsbygoogle(
  //-    class="adsbygoogle"
  //-    style="display:block ; max-height : 250px;text-align:center; margin-bottom: 60px;"
  //-    data-ad-client="ca-pub-4066044653984909"
  //-    data-ad-slot="7633399042"
  //-    data-ad-format="auto"
  //-    data-full-width-responsive="true"
  //-   )
  .appBody
    nuxt

    arrow-up
    //- amp-auto-ads(type='adsense' data-ad-client='ca-pub-4066044653984909')
  //- adsbygoogle(
  //-    class="adsbygoogle"
  //-    style="display:block ; max-height : 250px;text-align:center; margin: 60px 0;"
  //-    data-ad-client="ca-pub-4066044653984909"
  //-    data-ad-slot="6628325552"
  //-    data-ad-format="auto"
  //-    data-full-width-responsive="true"
  //-   )
  TheFooter
</template>

<script>
import TheHeader from "~/components/TheHeader";
import TheFooter from "~/components/TheFooter";
import ArrowUp from "~/components/ArrowUp";

export default {
  components: { TheFooter, TheHeader, ArrowUp }
};
</script>

<style lang="stylus">
@import '~@baianat/base.framework/base.styl'
@import '~assets/css/app.styl'

.appBody{
  min-height: 500px
}
</style>
