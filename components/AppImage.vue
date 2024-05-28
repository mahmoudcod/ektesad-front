<template lang="pug">
.AppImage(:class="{'is-loaded': loaded}")
  .AppImage-bg
  img.AppImage-img(ref="image" :src="srcset" :alt="altset" :title="titles")
</template>

<script>
let observer;

let callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.$notifyInView();
    }
  });
};

export default {
  name: "AppImage",
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      srcset: null,
      altset: null,
      loaded: false,
      titles: null
    };
  },
  mounted() {
    if (!observer) {
      observer = new IntersectionObserver(callback, { root: null });
    }
    this.$refs.image.$notifyInView = () => {
      this.$emit("inView");
    };
    this.$once("inView", () => {
      this.srcset = this.src;
      this.altset = this.alt;
      this.titles = this.title;
      observer.unobserve(this.$refs.image);
    });
    this.$refs.image.onload = () => {
      this.loaded = true;
    };
    observer.observe(this.$refs.image);
  }
};
</script>

<style lang="stylus">
.AppImage
  position: relative
  animation: shimmer 1.2s ease-in-out infinite
  height: 100%
  width: 100%

  &-bg
    background: #ddd
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    transition: 500ms
    transform-origin: bottom
    z-index: 2

  &-img
    opacity: 0
    height: 100%
    width: 100%
    object-fit: cover
    object-position: center
    position: absolute
    top: 0
    left: 0

  &.is-loaded
    animation: none

    .AppImage
      &-img
        opacity: 1

      &-bg
        transform: scaleY(0)

@keyframes shimmer
  0%
    opacity: 1

  50%
    opacity: 0.5

  100%
    opacity: 0.8
</style>
