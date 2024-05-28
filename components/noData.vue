<template lang="pug">
  .noData
    .grid
        .column
          span.noData-icon: AppIcon(name='feed')
          p.noData-message {{message}}
</template>
<script>
export default {
  name: "no-data",
  props: {
    message: {
      type: String,
      default: "لا يوجد"
    }
  }
};
</script>

<style lang="stylus">
.noData
  text-align:center;
  &-icon
    display: inline-block;
    margin-bottom: 1rem;
  &-message
    color: rgba(0,0,0, .4);
</style>
