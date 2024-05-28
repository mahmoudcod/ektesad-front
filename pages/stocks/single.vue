<template lang="pug">
div
  section.u-mt-md
    .container
      .u-textCenter
        h1.u-title.u-mb-sm  اسواق الأسهم

      AppCardStock
        .appCardStock-header
          nuxt-link(to="/stocks/single").appCardStock-url
          span.u-bold السوق السعودي
          span الحجم : #[span 90.27M]
          span القيمة : #[span 2.51B]
        .appCardStock-info
          nuxt-link(to="/stocks/single").appCardStock-url
          span الشركات #[span 182]
          span الارتفاعات #[span 91]
          span الانخفاضات #[span 77]
          span لا تغيرات #[span 14]
        .appCardStock-subInfo
          span الافتتاح : #[b 7,865.68]
          span الإغلاق : #[b 7,865.68]
        .appCardStock-chart
          AppChart

</template>
<script>
import AppCard from "~/components/AppCard";
import AppTable from "~/components/AppTable";
import AppCardStock from "~/components/AppCardStock";
import AppChart from "~/components/AppChart";
export default {
  head() {
    return {
      title: "السوق السعودي"
    };
  },
  components: {
    AppCard,
    AppTable,
    AppCardStock,
    AppChart
  },
  data: () => ({})
};
</script>
<style lang="stylus"></style>
