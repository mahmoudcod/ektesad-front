<template lang="pug">
div
  section.u-mt-sm
    .container
      h1.u-title.u-mb-ts  فريق المحررين
      section
        .grid.is-desktop-6.is-tablet-6
          .column
            .character-details
              .character-details-content
                h2 محمد زين الكُتبي
                p مُحاضِر وأكاديمي مصري. حاصل على ماجستير إدارة الأعمال ودبلومة الموارد البشرية. كتب العديد من المقالات حول الثقافة المالية والمال والأعمال. شغل عدة مناصب في كُبرى المؤسسات المصرية، وأسس منصة اقتصاد لإثراء الثقافة المالية ونشر العلوم المالية والاقتصادية وتطوير النظم الإدارية.
                a(href="mailto:Muhamad.alkotby@gmail.com") Muhamad.alkotby@gmail.com
          .column
            .character-details
              .character-details-content
                h2 سمر سليم
                p حاصلة على ماجستير في التخطيط وماجستير في ادارة الأعمال، أهتم بكل ما هو جديد ومؤثر في عالم المال والأعمال
                a(href="mailto:Saleem.samar16@gmail.com") Saleem.samar16@gmail.com
          .column
            .character-details
              .character-details-content
                h2 شادن سليم
                p ماستر في علوم الغذاء، ومتابعة لقضايا المرأة والصحة وقصص المؤثرين حول العالم
                a(href="mailto:Shaden199292@gmail.com") Shaden199292@gmail.com"
          .column
            .character-details
              .character-details-content
                h2 ريم اسماعيل
                p حائزة على إجازة في الصيدلة والكيمياء الصيدلانية من جامعة دمشق، ومدوِّنة في عدة مجالات، ومترجمة علمية.
                a(href="mailto:Ph.reem.esmail@gmail.com") Ph.reem.esmail@gmail.com

</template>

<script>
import AppPerson from "~/components/AppPerson";

export default {
  head() {
    return {
      title: "فريق المحررين"
    };
  },

  components: {
    AppPerson
  }
};
</script>

<style lang="stylus">
.character-details
  height: 90%
  background: $clGray
  padding: unitRes(40, 80)
  h2
    margin-bottom: 1.5em
  &-content
    font-size: unitRes(16, 18)
    line-height: 28px
    margin-bottom: 10px
</style>
