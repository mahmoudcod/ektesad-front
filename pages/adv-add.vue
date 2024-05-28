<template lang="pug">
div#index
  loader(:status="processing")

  span.label.is-danger.alert-block(v-if="messages.fail") {{ messages.fail }}
  span.label.is-success.alert-block(v-if="messages.success") {{ messages.success }}

  app-popup(v-if="confirm" @close="confirmToggle()")
    .whiteBox.u-textCenter
      h4.u-mb-xs لقد تم إرسال طلبك بنجاح وسيتم التواصل معكم من قبل الإدارة
      .popup-footer
        button.button.is-primary.is-rounded.is-wide(@click.prevent="confirmToggle()") موافق

  section.u-mt-sm.whyEktesad
    .container
      .grid.is-ultrawide-6.is-widescreen-8.is-desktop-10.is-center
        .column

          h1.u-title.u-mb-xs لماذا اقتصاد
          p تعتبر اقتصاد هي المنصة المصرية الأولى المتخصصة في الاخبار الاقتصادية والتي تقدم اخبار ومقالات تحليلية ونصائح في عالم الاقتصاد. تهدف اقتصاد الى تقديم مادة علمية وتحليل كامل للسوق الاقتصادي للمساعدة على كيفية التأقلم مع الموقف الاقتصادي الحالي في العالم بأكمله.
          p تسعى منصة اقتصاد لنشر التوعية وتغيير الثقافة الاقتصادية لدى الشعوب.

          h2.u-mb-xs.u-mt-sm.u-text-md زيارات الموقع
          .visitBox
            span المستخدمون #[span 2230]
            span  المشاهدات  #[span 2230]
            span  عدد الجلسات #[span 2230]
            span  مدة الجلسة  #[span 2230]

          h2.u-mb-ts.u-mt-sm.u-text-md الاعلانات
          p.u-mb-xs يستعرض الجدول التالي اماكن واسعار الاعلانات المقدمة من اقتصاد
          AppTable.is-striped.ads-table
            thead
              tr
                th المساحة الاعلانية
                th المكان
                th القيمة
                th النتيجة
            tbody
              tr
                td 468x60- All
                td اسفل القائمة
                td 2230
                td 100K

              tr
                td 728x90- F2
                td اسفل القائمة
                td 2230
                td 100K

              tr
                td 728x90- F4
                td اسفل القائمة
                td 2230
                td 100K
              tr
                td 468x60- F5
                td اسفل القائمة
                td 2230
                td 100K


          .adForm.u-mt-md
            .adForm-info
              p طلب الاعلان
            form(@submit.prevent="addAdv")
              .grid.is-tablet-6
                .column
                  label.input-label اختر نوع المساحة الاعلانية
                  select.select.is-static(
                    name ="type"
                    :class="{ 'has-error': errors.has('type') }"
                    v-validate="'required'"
                    v-model="advInput.type"
                    )
                    option 468x60- All
                    option 728x90- F4
                    option 728x90- F2
                    option 468x60- F5
                  span.input-message(v-if="errors.has('type')")  {{ errors.first('type') }}
                .column
                  label.input-label اختر المدينة
                  input.input.is-static(
                    type="text"
                    name ="city"
                    :class="{ 'has-error': errors.has('city') }"
                    v-validate="'required'"
                    v-model="advInput.city"
                    )
                  span.input-message(v-if="errors.has('city')")  {{ errors.first('city') }}
                .column
                  label.input-label الميزانية (شهريا)
                  input.input.is-static(
                    type="text"
                    name ="budget"
                    :class="{ 'has-error': errors.has('budget') }"
                    v-validate="'required|numeric'"
                    v-model="advInput.budget"
                    )
                  span.input-message(v-if="errors.has('budget')")  {{ errors.first('budget') }}
                .column
                  label.input-label البريد الالكتروني
                  input.input.is-static(
                    type="email"
                    name ="email"
                    :class="{ 'has-error': errors.has('email') }"
                    v-validate="'required|email'"
                    v-model="advInput.email"
                    )
                  span.input-message(v-if="errors.has('email')")  {{ errors.first('email') }}
                .column
                  label.input-label اسم الشركة
                  input.input.is-static(
                    type="text"
                    name ="company"
                    :class="{ 'has-error': errors.has('company') }"
                    v-model="advInput.company"
                    )
                .column
                  label.input-label رقم الهاتف
                  input.input.is-static(
                    type="text"
                    name ="phone"
                    :class="{ 'has-error': errors.has('phone') }"
                    v-validate="'required|numeric'"
                    v-model="advInput.phone"
                    )
                  span.input-message(v-if="errors.has('phone')")  {{ errors.first('phone') }}
              label.input-label ملاحظات
              textarea.textarea(
                rows="5"
                name ="notes"
                :class="{ 'has-error': errors.has('notes') }"
                v-model="advInput.notes"
                )

              button.button.is-primary.is-block.is-static.u-mt-ts ارسال

</template>


<script>
import AppTable from "~/components/AppTable";
import AppPopup from "~/components/AppPopup";
import { ADD_ADV } from "~/graphql/mutation";
import Loader from "~/components/Loader";

export default {
  head() {
    return {
      title: "طلب الاعلان"
    };
  },

  $_veeValidate: {
    validator: "new"
  },

  data() {
    return {
      messages: {
        success: null,
        fail: null
      },
      confirm: false,
      processing: false,
      advInput: {
        type: null,
        city: null,
        budget: null,
        company: null,
        phone: null,
        notes: null,
        email: null
      }
    };
  },

  components: {
    AppTable,
    Loader,
    AppPopup
  },

  methods: {
    confirmToggle() {
      this.confirm = !this.confirm;
      if (!this.confirm) {
        this.$router.push("/");
      }
    },
    async addAdv() {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) return;
        this.processing = true;
        let advInput = this.advInput;
        const {
          data: { Post }
        } = await this.$client.mutate({
          mutation: ADD_ADV,
          variables: {
            advInput
          }
        });
        this.processing = false;
        this.confirmToggle();
        setTimeout(() => {
          this.confirmToggle();
        }, 7000);
        return;
      } catch (error) {
        console.log(error);
        this.processing = false;
        this.messages.false = "لقد حدث خطأ ما";
        setTimeout(() => {
          this.messages.false = null;
        }, 5000);
        return;
      }
    }
  }
};
</script>

<style lang="stylus">
.ads-table
  thead
    tr
      th
        font-size: 16px

  tbody
    td
      font-size: 14px

label.input-label
  font-size: 14px !important

.whyEktesad
  p
    line-height: 1.6

.adForm
  background: $clGray
  padding: 60px
  position: relative

  +mq($until: 'mobile')
    padding: 60px 20px

  &-info
    background: $clPrimary
    color: $clWhite
    position: absolute
    top: 0
    left: 50%
    transform: translate(-50%, -50%) skew(40deg)
    padding: 10px 40px
    display: flex

    p
      color: $clWhite
      transform: skew(-40deg)
      display: block
      white-space: nowrap
      font-size: 24px
      @extend .type-bold

.visitBox
  background: $clBlack
  padding: 60px
  position: relative
  display: flex
  flex-wrap: wrap
  justify-content: space-around
  text-align: center

  +mq($until: 'mobile')
    padding: 20px

  >span
    color: $clWhite
    font-size: 24px
    flex: 0 0 50%
    padding: 20px 0

    span
      display: block
</style>
