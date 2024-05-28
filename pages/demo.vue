<template lang="pug">
div
  section.u-mt-lg
    .container
      .u-textCenter
        h1.u-title.u-mb-sm العناصر

  section.u-mt-lg
    .container
      .grid.is-4
        .column(v-for="c in 10")
          AppCard(title="شركة مصرية تفتح أبوابها لتعليم النساء الحياكة" :img="`/dummy/${c}.jpeg`" date="قبل 22 ساعة" cat="انفوجراف" url="/" :catColor="(c === 2) ? '#fbb040' : ''")
      .grid.is-4.has-mb
        .column(v-for="c in 10")
          AppCard.is-wide(title="شركة مصرية تفتح أبوابها لتعليم النساء الحياكة" :img="`/dummy/${c}.jpeg`" date="قبل 22 ساعة"  url="/")
  section.u-mt-lg
    .container
      .u-textCenter
        h1.u-title.u-mb-sm الايقونات
      ul.allIcons
        li(v-for="i , key in allIcons")
          AppIcon(:name="key")
          span {{key}}
</template>

<script>
import icons from "~/assets/data/icons.json";
import AppCard from "~/components/AppCard";

export default {
  head: () => ({
    title: "Elements"
  }),
  components: {
    AppCard
  },
  data: () => ({
    allIcons: icons
  })
};
</script>

<style lang="stylus" scoped>
.allIcons
  list-style-type: none
  display: flex
  flex-wrap: wrap

  li
    background: $clWhite
    padding: 20px
    margin: 5px
    font-size: 20px
    display: inline-flex
    justify-content: center
    align-items: center
    flex-direction: column
    border: $borderSize solid $clBlack
    width: 140px

    span
      font-size: 12px
      display: block
      margin-top: 5px

    .icon
      width: 100%
      height: auto
</style>
