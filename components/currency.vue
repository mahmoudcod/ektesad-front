<template lang="pug">
  div
    .currency
      .currency-item
        select.select(v-model="input_currency" @change="exchange()")
          option(v-for="currency in currencies" :value="currency.value") {{currency.name}}
        input.input(type='number' value='1' v-model="input_amount" @input="exchange()")
      .currency-item
        select.select(v-model="output_currency" @change="exchange()")
          option(v-for="currency in currencies" :value="currency.value") {{currency.name}}
        input.input(type='number' placeholder='0' v-model="output_amount" @input="exchange()")

</template>

<script>
export default {
  name: "Currency",
  data: () => ({
    input_currency: "USD",
    output_currency: "EGP",
    input_amount: "",
    output_amount: "",
    currencies: [
      {
        name: "دولار",
        value: "USD"
      },
      {
        name: "جنيه مصري",
        value: "EGP"
      },
      {
        name: "يورو",
        value: "EUR"
      },
      {
        name: "ليرة تركية",
        value: "TRY"
      },
      {
        name: "ين",
        value: "JPY"
      },
      {
        name: "يوان",
        value: "CNY"
      }
    ],
    exchangeApi: "https://api.exchangerate-api.com/v4/latest"
  }),
  methods: {
    exchange() {
      fetch(`${this.exchangeApi}/${this.input_currency}`)
        .then(res => res.json())
        .then(res => {
          const new_rate = res.rates[this.output_currency];
          this.output_amount = (this.input_amount * new_rate).toFixed(2);
        });
    }
  }
};
</script>

<style lang="stylus">
.currency
  display: flex
  justify-content: center
  flex-wrap: wrap
  align-items: center
  gap: 1em
  &-item
    display: flex
    align-items: center
    gap: 1em
    .select
      text-align: right
</style>
