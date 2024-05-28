<template lang="pug">
div


  section.u-mt-sm
    .container
      .grid.is-widescreen-8.is-desktop-10.is-center
        .column
          h1.u-title حاسبة بطاقة الائتمان
          //- h2.u-mt-xs ستساعدكَ الآلة الحاسبة على:
          //- p حساب الوقت الذي ستستغرقهُ لتسديد أو دفع بطاقتك الائتمانيَّة من خلال الحدّ الأدنى من التسديد.
          //- p حساب الوقت، والمال الذي ستوفِّرهُ من خلال تسديد أقساط أعلى.
          //- p Your card: بطاقتُك
          //- p Amount owing: المبلغ المُستحقّ (الحدّ الائتماني / المبلغ الموجود في بطاقتك).
          //- p Interest rate: معدَّل / سعر الفائدة.
          //- p Results: النتائج
          //- p ادَّخر من خلال تسديد أقساط أعلى.
          //- p Higher repayments أقساط أعلى
          //- p Higher repayment: (per month): السداد الأعلى (كل شهر).
          //- p Advanced settings إعدادات متقدمة
          //- p البطاقة (اضبط الحد الأدنى لنسبة السداد على هذه الآلة الحاسبة لمطابقة المبلغ المُوضَّح في آخر كشف حساب لبطاقتك الائتمانيّة(.
          //- p •	Repaying a higher amount – سداد مبلغ أعلى: إذا قُمتَ بسداد مبلغ أعلى من الحد الأدنى للسَّداد؛ ستفترضُ الآلة الحاسبة أنَّ هذا المبلغ ثابت كل شهر، والتسديد بمبالغ أعلى سيُقلِّل من رصيد البطاقة، ومن تكاليف أو رسوم الفائدة. أيضاً؛ تفترض الآلة الحاسبة أنَّ السداد بمبلغ أكبر أو أعلى سيدفع مستحقات رصيد البطاقة خلال عامَين؛ إلَّا إذا كان الحد الأدنى للسّداد سيدفع مستحقات رصيد البطاقة خلال أقل من عامَين، وهذا يتوافق مع الرسائل الموجودة في كشف حساب بطاقتك الائتمانية.

          .form.u-mt-xs
            form(@submit.prevent="calc")
              .grid.is-tablet-12
                .column
                  label.input-label المبلغ المستحق
                  input.input.is-static(
                    name ="amount"
                    :class="{ 'has-error': errors.has('amount') }"
                    type="number"
                    step="any"
                    v-validate="'required'"
                    v-model.number="form.amount"
                    )
                .column
                  label.input-label معدل الفائدة(%)
                  input.input.is-static(
                    name ="interestRate"
                    :class="{ 'has-error': errors.has('interestRate') }"
                    type="number"
                    step="any"
                    v-validate="'required'"
                    v-model.number="form.interestRate"
                    )
                .column
                  label.input-label  سنوات السداد
                  input.input.is-static(
                    name ="years"
                    :class="{ 'has-error': errors.has('years') }"
                    type="number"
                    v-validate="'required'"
                    step="any"
                    v-model.number="form.years"
                    )
              button.button.is-primary.is-block.is-static.u-mt-ts حساب
              p.result.u-mt-ts {{result}}

</template>

<script>
import Loader from "~/components/Loader";

export default {
  head() {
    return {
      title: "حاسبة بطاقة الائتمان"
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
      result: ""
    };
  },

  methods: {
    calc() {
      const isValid = this.$validator.validateAll();
      if (!isValid) return;

      let result = this.calculateTotal(
        this.form.amount,
        this.form.interestRate,
        this.form.years
      );

      if (result) {
        this.result = `الدفع الشهري: ${result.monthlyPayment}, المبلغ الإجمالي: ${result.totalPayment}, مجموع الفوائد: ${result.totalInterest}`;
      } else {
        this.result = "يرجى التحقق من أرقامك";
      }
    },

    calculateTotal(amount, interestRate, years) {
      const principal = parseFloat(amount);
      const calculatedInterest = parseFloat(interestRate) / 100 / 12;
      const calculatedPayment = parseFloat(years) * 12;

      const x = Math.pow(1 + calculatedInterest, calculatedPayment);
      const monthly = (principal * x * calculatedInterest) / (x - 1);

      if (isFinite(monthly)) {
        let monthlyPayment = monthly.toFixed(2);
        let totalPayment = (monthly * calculatedPayment).toFixed(2);
        let totalInterest = (monthly * calculatedPayment - principal).toFixed(
          2
        );

        return {
          monthlyPayment: monthlyPayment,
          totalPayment: totalPayment,
          totalInterest: totalInterest
        };
      } else {
        return false;
      }
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
