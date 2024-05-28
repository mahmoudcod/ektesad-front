<template lang="pug">
div
  section.u-mt-md
    .container
      .u-textCenter
        h1.u-title.u-mb-sm  اسواق الأسهم
      .grid.is-tablet-6
        .column.u-mb-col
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
        .column.u-mb-col
          .appCardStock
            .appCardStock-header
              nuxt-link(to="/stocks/single").appCardStock-url
              span.u-bold بورصة مصر
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
        .column.u-mb-col
          .appCardStock
            .appCardStock-header
              nuxt-link(to="/stocks/single").appCardStock-url
              span.u-bold سوق أبوظبي
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






  //- section.u-mt-sm
  //-   .container
  //-     h2.h1.u-mb-xs المقالات
  //-     .grid.is-desktop-4.is-tablet-6
  //-       .column
  //-         AppCard(title="شركة بريطانية تلغي مشروعا ضخما للطاقة في إيران" :img="`/dummy/9.jpeg`" cat="مقالات" url="/" catColor="#fbb040")
  //-       .column
  //-         AppCard(title="انهيار الليرة التركية يهوي بالعملة الهندية لأدنى مستوياتها" :img="`/dummy/10.jpeg`" cat="انفوجراف"  url="/")
  //-       .column
  //-         AppCard(title="الذهب يتعافى واليورو يعاني بسبب الليرة التركية" :img="`/dummy/11.jpeg`" url="/" )
  //-       .column
  //-         AppCard(title="بيان  من رجال الأعمال في تركيا عقب انهيار الليرة" :img="`/dummy/12.jpeg`" url="/" )
  //-       .column
  //-         AppCard(title="مصر توقع 3 اتفاقيات للتنقيب عن النفط والغاز" :img="`/dummy/13.jpeg`" url="/" )
  //-       .column
  //-         AppCard(title="ضربة لأكبر شركة بناء كندية عقب الإجراءات السعودية" :img="`/dummy/14.jpeg`" url="/" )
</template>
<script>
import AppCard from "~/components/AppCard";
import AppTable from "~/components/AppTable";
import AppCardStock from "~/components/AppCardStock";
import AppChart from "~/components/AppChart";
export default {
  head() {
    return {
      title: "العملات"
    };
  },
  components: {
    AppCard,
    AppTable,
    AppCardStock,
    AppChart
  },
  data: () => ({}),
  mounted() {}
};
</script>
<style lang="stylus"></style>
