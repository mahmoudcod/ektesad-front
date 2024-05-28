<template lang="pug">
div


  section.u-mt-sm
    .container
      .grid.is-widescreen-8.is-desktop-10.is-center
        .column
          h1.u-title حاسبة الفائدة المركبة
          //- h2.u-mt-xs حاسبة الفائدة المركبة The Compound Interest Calculator:
          //- p إذا قُمتَ بإيداعِ مبلغٍ مالي في بنك، وزاد هذا المبلغُ بعد سنة؛ فتلك هي الفائدة المُركَّبة. على سبيل المثال: لنفرض أنك قمت بإيداع 10.000 دولار في حساب توفير بفائدة مُركَّبة 3% شهريَّاً:
          //- p - بعد 5 سنوات سيصبحُ لديك 11.616 دولار؛ أي أنك ربحت 1.616 دولار بالفائدة.
          //- p - بعد 10 سنوات سيصبح لديك 13494 دولار؛ أي أنك ربحت 3.494 دولار بالفائدة... وهكذا.
          //- h2.u-mt-xs ما الذي ستساعدك به حاسبة الفائدة المركَّبة؟
          //- p •	حساب كمية المال الذي ستحصلُ عليه إن استثمرتَ مبلغاً ثابتاً لفترة محددة، وبفائدة سنويَّة معيَّنة.
          //- p •	حساب كميَّة المال الذي ستحصلُ عليه إن قُمتَ بادّخار مبلغ بشكلٍ منتظم.
          //- p • كيف سيزيدُ تراكم رأس المال من فائدة مدّخراتك.
          //- p •	الفرق بينَ حفظِ أموالك الآن وحفظها غداً.
          //- p • كيفيَّة حساب الفائدة المُركبة.
          //- h2.u-mt-xs مصطلحات:
          //- p Initial deposit: إيداع أوَّلي أو مبدئي (رأس المال الأوَّلي).
          //- p Regular deposit: إيداعُك المُنتَظم (مبلغ المال الذي ستودِعهُ كلَّ فترة).
          //- p Deposit frequency: تواتر الإيداع (هل ستودعُ المال بشكلٍ سنوي/ شهري/ نصف شهريّ/ أسبوعي/ يوميّ).
          //- p Compound frequency: التردُّد المُركَّب (يشير إلى عدد المرات التي ستضيف الفائدة إلى المبلغ الأولي "رأس المال").
          //- p Number of years (max 50): عدد السنوات (كحد أقصى 50 سنة).
          //- p Annual interest rate (max 20%): معدَّل الفائدة السنوي (كحد أقصى 20%).
          //- p Effective interest rate (5.12%): معدَّل الفائدة الفعلي (5.12%).
          //- h2.u-mt-xs ملاحظات:
          //- p •	النتائج التي ستحصلُ عليها من الآلة الحاسبة هي مبالغ تقديريَّة، والمبالغ الحقيقيَّة هي أكبر أو أقل بقليل.
          //- p •	سيكون من الجيد الحصول على استشارة مالية، وليس الاعتماد فقط على النتيجة من الآلة الحاسبة للفائدة المركبة.
          .form.u-mt-xs
            form(@submit.prevent="calc")
              .grid.is-tablet-6
                .column
                  label.input-label المبلغ الأساسي
                  input.input.is-static(
                    name ="principal"
                    :class="{ 'has-error': errors.has('principal') }"
                    type="number"
                    step="any"
                    v-validate="'required'"
                    v-model.number="form.principal"
                    )
                .column
                  label.input-label معدل الفائدة السنوي(%)
                  input.input.is-static(
                    name ="rate"
                    :class="{ 'has-error': errors.has('rate') }"
                    type="number"
                    step="any"
                    v-validate="'required'"
                    v-model.number="form.rate"
                    )
                .column
                  label.input-label مبلغ المساهمة
                  input.input.is-static(
                    name ="r"
                    :class="{ 'has-error': errors.has('r') }"
                    type="number"
                    step="any"
                    v-validate="'required'"
                    v-model.number="form.r"
                    )
                .column
                  label.input-label التردد
                  select.input.is-static(
                    name ="frequency"
                    :class="{ 'has-error': errors.has('frequency') }"
                    v-validate="'required'"
                    step="any"
                    v-model="form.frequency"
                  )
                    option(selected value="0") كل سنة
                    option(value="1") نصف سنوي
                    option(value="2") كل ثلاثة أشهر
                    option(value="3") كل شهر
                .column
                  label.input-label عدد سنوات فترة الاستثمار الكلية
                  input.input.is-static(
                    name ="time"
                    :class="{ 'has-error': errors.has('time') }"
                    type="number"
                    v-validate="'required'"
                    step="any"
                    v-model.number="form.time"
                    )
                .column
                  label.input-label عدد فترات استحقاق الفائدة
                  input.input.is-static(
                    name ="n"
                    :class="{ 'has-error': errors.has('n') }"
                    type="number"
                    v-validate="'required'"
                    step="any"
                    v-model.number="form.n"
                    )
              button.button.is-primary.is-block.is-static.u-mt-ts حساب
              p.result.u-mt-ts {{interest}}
</template>

<script>
import Loader from "~/components/Loader";

export default {
  head() {
    return {
      title: "حاسبة الفائدة المركبة"
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
        principal: null,
        time: null,
        rate: null,
        n: null,
        r: null,
        frequency: null
      },
      interest: null
    };
  },

  methods: {
    calc() {
      const isValid = this.$validator.validateAll();
      if (!isValid) return;
      let final = 0;
      switch(this.form.frequency ){
        case '0': {
          let amount = Math.pow((1 + this.form.rate / 100 / this.form.n) , (this.form.n * this.form.time)).toFixed(2);
          let L1 = this.form.principal * amount;
          let L2 = this.form.r * 1 *(amount - 1) / ((this.form.rate / 100) / this.form.n);
          final = L1 + L2;
        break;
        }
        case '1': {
          let amount = Math.pow((1 + this.form.rate / 100 / this.form.n) , (this.form.n * this.form.time)).toFixed(2);
          let L1 = this.form.principal * amount;
          let L2 = this.form.r * 2 *(amount - 1) / ((this.form.rate / 100) / this.form.n);
          final = L1 + L2;
        break;
        }
        case '2': {
          let amount = Math.pow((1 + this.form.rate / 100 / this.form.n) , (this.form.n * this.form.time)).toFixed(2);
          let L1 = this.form.principal * amount;
          let L2 = this.form.r * 4 *(amount - 1) / ((this.form.rate / 100) / this.form.n);
          final = L1 + L2;
        break;
        }
        case '3': {
          let amount = Math.pow((1 + this.form.rate / 100 / this.form.n) , (this.form.n * this.form.time)).toFixed(2);
          let L1 = this.form.principal * amount;
          let L2 = this.form.r * 12 *(amount - 1) / ((this.form.rate / 100) / this.form.n);
          final = L1 + L2;
        break;
        }
      }
      this.interest = "المبلغ الذي ستحصل عليه في نهاية الفترة: " + final.toFixed(2);
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
