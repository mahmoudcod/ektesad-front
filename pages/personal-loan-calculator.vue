<template lang="pug">
div


  section.u-mt-sm
    .container
      .grid.is-widescreen-8.is-desktop-10.is-center
        .column
          h1.u-title حاسبة القرض الشخصي
          //- h2.u-mt-xs كم ستكون الأقساط لتسديد القرض الشخصي؟ - How much will my personal loan repayments be؟
          //- p Personal loan details: تفاصيل القرض الشخصي
          //- p Amount borrowed: المبلغ المُقترَض (المبلغ الأساسي الذي ستتراكم عليه الفائدة أو المبلغ الأساسي الذي تمَّ الحصول عليه من البنك).
          //- p Interest rate: معدَّل / سعر الفائدة.
          //- p Repayment frequency: تكراريَّة/دوريَّة السداد (الوقت الذي ستسدِّد به المال: سنوي Yearly/ كل ربع سنة Quarterly/ شهري Monthly/ نصف شهري Fortnightly/ أسبوعي Weekly).
          //- p Length of loan: مدَّة القرض.
          //- p Fees: رسوم.
          //- p Fees frequency: تكراريَّة الرسوم (سنوي Yearly/ كل ربع سنة Quarterly/ شهري Monthly/ نصف شهري Fortnightly/ أسبوعي Weekly).
          //- p Total repayments: إجمالي المدفوعات.
          //- p Your repayments will be: ستكون مدفوعاتك
          //- p Compare alternative – مقارنة البديل
          //- p Interest rate: معدَّل / سعر الفائدة.
          //- p Amount borrowed: المبلغ المُقترَض.
          //- p Repayment frequency: تكراريَّة/دوريَّة السداد (الوقت الذي ستسدِّد به المال: سنوي Yearly/ كل ربع سنة Quarterly/ شهري Monthly/ نصف شهري Fortnightly/ أسبوعي Weekly).
          //- h2.u-mt-xs كيف يمكنني تسديد القرض في وقتٍ أقل من المدة الزمنية المُحدَّدة؟ - How can I repay my loan sooner?
          //- p Current personal loan: القرض الشخصيّ الحاليّ.
          //- p Amount owing: المبلغ المُستحقّ (المبلغ النهائي الذي يجب عليك دفعهُ للبنك بعد تراكم الفائدة على المبلغ المُقتَرَض).
          //- p Repayment: السداد (المبلغ الذي يجبُ تسديدهُ كل فترة).
          //- p Repayment frequency: تكراريَّة/دوريَّة السداد (الوقت الذي ستسدِّد به المال: سنوي Yearly/ كل ربع سنة Quarterly/ شهري Monthly/ نصف شهري Fortnightly/ أسبوعي Weekly).
          //- p Interest rate: معدَّل / سعر الفائدة.
          //- p Fees: رسوم.
          //- p Fees frequency: تكراريَّة الرسوم (سنوي Yearly/ كل ربع سنة Quarterly/ شهري Monthly/ نصف شهري Fortnightly/ أسبوعي Weekly).
          //- h2.u-mt-xs ملاحظات:
          //- p •	الآلة الحاسبة ستعطي نتائج تقريبيَّة للأرقام الحقيقيَّة.
          //- p •	الحد الأقصى للقروض قد يكون 15 سنة.
          //- p •	الحاسبة لا تتضمَّن رسوم الحساب البنكي.
          //- p •	يمكن تطبيق الآلة الحاسبة على القروض التي يتضمّن سدادك المُنتَظم على كُلٍّ من الفائدة، والتسديد التدريجي gradual repayment للمبلغ المُقتَرَض، ولا تنطبق على القروض ذات الفائدة فقط.
          //- p Note: Your minimum monthly repayment amount is calculated as a percentage of your closing balance, or a minimum dollar amount of your closing balance - whichever is higher. Check your PDS and change these amounts if your lender's amounts are different from these defaults.
          //- p يتمُّ حساب الحد الأدنى للسداد الشهري كنسبة مئويَّة من ميزانيّتك الختاميَّة closing balance أو كحدٍّ أدنى للمبلغ من ميزانيّتك الختاميَّة أو رصيدك الختاميّ
          //- p تحقق من بيان الكشف أو بيان الإفصاح وقُم بتغيير هذه المبالغ إذا كان المبلغ الضي سيتمُّ إعطاؤك إياه مختلفٌ عن الضبط الأساسيّ للآلة الحاسبة.
          //- p Minimum repayment of outstanding balance – الحد الأدنى من السَّداد للرَّصيد المُستحق
          //- p Minimum repayment - الحد الأدنى للسَّداد.
          //- h2.u-mt-xs ملاحظات:
          //- p •	الآلة الحاسبة ستعطي نتائج تقريبيَّة للأرقام الحقيقيَّة.
          //- p •	لم تؤخَذ رسوم بطاقة الائتمان بعين الاعتبار.
          //- p •	Additional spending الإنفاق الإضافي: لا يوجد إنفاق إضافي على البطاقة، ولا يوجد سَلَف نقدي.
          //- p •	رصيد / ميزانيَّة بطاقتك: الرصيد الختامي في آخر كشف حساب لبطاقتك الائتمانية + أيّةُ أموال يتمُّ إنفاقها على بطاقتك + أيَّة فائدة ورسوم منذ نهاية فترة كشف حسابك الأخيرة.
          //- p •	Interest rate - معدل الفائدة: معدل الفائدة السنوي على بطاقتك الائتمانية (يمكنك الحصول عليه من مزوِّد الخدمة).
          //- p •	الحد الأدنى للسَّداد (الشهر الأول): يتمُّ حسابه باستخدام رصيد البطاقة، والحدّ الأدنى لنسبة السَّداد التي تُدخِلُها (أو الحد الأدنى للمبلغ)، ويتناقص الحد الأدنى للسداد كل شهر مع انخفاض رصيد البطاقة (اضبط الحد الأدنى لنسبة السداد على هذه الآلة الحاسبة لمطابقة المبلغ المُوضَّح في آخر كشف حساب لبطاقتك الائتمانيّة(.
          //- p Length of loan: مدَّة القرض.
          //- h2.u-mt-xs كمية المال التي يمكنني أن أقترضها؟ - How much can I borrow؟

          .form.u-mt-xs
            form(@submit.prevent="calc")
              .grid.is-tablet-12
                .column
                  label.input-label مبلغ القرض
                  input.input.is-static(
                    name ="amount"
                    :class="{ 'has-error': errors.has('amount') }"
                    type="number"
                    step="any"
                    v-validate="'required'"
                    v-model.number="form.amount"
                    )

                .column
                  label.input-label السنوات
                  input.input.is-static(
                    name ="amount"
                    :class="{ 'has-error': errors.has('amount') }"
                    type="number"
                    step="any"
                    v-validate="'required'"
                    v-model.number="form.years"
                    )
                .column
                  label.input-label %معدل الفائدة
                  input.input.is-static(
                    name ="years"
                    :class="{ 'has-error': errors.has('years') }"
                    type="number"
                    step="any"
                    v-validate="'required'"
                    v-model.number="form.interestRate"
                    )
              button.button.is-primary.is-block.is-static.u-mt-ts احسب
              p.result.u-mt-ts(v-if="!hidden") قيمة القسط : {{result.mainPayment}}
              p.result.u-mt-ts(v-if="!hidden") الفائدة الكلية : {{result.totalInterest}}
              p.result.u-mt-ts(v-if="!hidden") المبلغ الكلي المدفوع : {{result.totalpay}}


</template>

<script>
import Loader from "~/components/Loader";
export default {
  head() {
    return {
      title: "حاسبة القرض الشخصي"
    };
  },
  $_veeValidate: {
    validator: "new"
  },

  components: {
    Loader
  },

  data() {
    return {
      form: {
        amount: null,
        interestRate: null,
        years: null
      },
      hidden: true,
      result: {}
    };
  },

  methods: {
    async calc() {
      // const totalpay = (this.form.amount * ((1 + (this.form.interestRate / 100 )) ** this.form.years)).toFixed(2)
      // const payPerYear =  (totalpay * ((this.form.interestRate / 100 )/(((1 + this.form.interestRate/100) ** this.form.years) - 1))).toFixed(2)
      // const mainPayment = (payPerYear / this.form.months).toFixed(2)

      const principal = parseFloat(this.form.amount);
      const calculatedInterest = parseFloat(this.form.interestRate) / 100 / 12;
      const calculatedPayments = parseFloat(this.form.years) * 12;

      //Calculating the monthly payment
      const x = Math.pow(1 + calculatedInterest, calculatedPayments);
      const monthly = (principal * x * calculatedInterest) / (x - 1);
      const monthlyPayment = monthly.toFixed(2);

      //calculating the total interest
      const totalInterest = (monthly * calculatedPayments - principal).toFixed(
        2
      );

      //calculating the total payment
      const totalPayment = (monthly * calculatedPayments).toFixed(2);
      console.log(monthlyPayment, totalInterest, totalPayment);

      this.result = {
        totalpay: totalPayment,
        totalInterest,
        mainPayment: monthlyPayment
      };
      this.hidden = false;
    }
  }
};
</script>

<style lang="stylus">
.form
  background: $clGray
  padding: 60px
  position: relative

  +mq($until: 'mobile')
    padding: 60px 20px

  &-info
    background: $clBlack
    color: $clWhite
    position: absolute
    top: 0
    left: 50%
    transform: translate(-50%, -50%) skew(40deg)
    padding: 10px 30px
    display: flex

    +mq($until: 600px)
      flex-wrap: wrap
      padding: 10px 10px

    a
      color: $clWhite
      padding: 5px 20px
      transform: skew(-40deg)
      display: block
      white-space: nowrap

      &:hover
        color: $clSecondary

label.input-label
  font-size: 14px !important
.result
  color: $clPrimary
</style>
