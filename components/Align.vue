<template lang="pug">
  div(@input="onInput" class="align" ref="container")
    p اكتب موضوعك ....
</template>

<script>
import Align from '@baianat/align';
import '@baianat/align/dist/css/align.css';
import '@baianat/align/dist/css/default-theme.css';
import bus from '~/plugins/bus';

export default {
  name: 'bi-align-editor',
  $_veeValidate: {
    value() {
      return this.value;
    },
    name() {
      return this.name;
    }
  },
  props: {
    value: null,
    name: String,
    imagePath: String
  },
  methods: {
    onInput() {
      this.$emit('input', this.$editor.content);
    }
  },
  data() {
    return {
      files: [],
      update: null
    };
  },
  async mounted() {
    await import('@baianat/colorpicker');
    bus.$on('getUpdateFunc', () => {
      bus.$emit('updateFunc', { update: this.update, files: this.files });
    });
    bus.$on('emptyFiles', () => {
      this.files = [];
    });
    if (this.value) {
      this.$refs.container.innerHTML = this.value;
    }
    Align.extend('headers', {
      element: 'select',
      command: 'formatblock'
    });

    this.$editor = new Align(this.$el, {
      shortcuts: true,
      toolbar: {
        tooltip: true, // show or hide commands tooltip, default is (false)
        commands: [
          { fontSize: [false, 1, 2, 3, 4, 5, 6, 7] },
          { headers: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] },
          'separator',
          'bold',
          'italic',
          'underline',
          'strikeThrough',
          'separator',
          'justifyLeft',
          'justifyCenter',
          'justifyRight',
          'justifyFull',
          'separator',
          'h1',
          'h2',
          'p',
          'blockquote',
          'pre',
          'separator',
          'createLink',
          'separator',
          'color',
          'fullscreen'
        ]
      },
      bubble: {
        commands: [
          'bold',
          'italic',
          'underline',
          'strikeThrough',
          'separator',
          'justifyLeft',
          'justifyCenter',
          'justifyRight',
          'justifyFull',
          'createLink'
        ]
      },
      creator: {
        theme: 'light',
        commands: [
          'createFigure',
          'createColumn',
          'createLine',
          'createVideo',
          'createEmbed'
        ]
      }
    });

    this.$editor.$bus.on('imageAdded', ({ file, update }) => {
      this.$emit('imageAdded', { file, update });
      // this.update = update;
      // this.files.push(file);
    });
  }
};
</script>


<style lang="stylus">
.align-content
  padding: 0
  border: $borderSize solid $clBlack
  padding: 20px

.align .icon
  width: 20px
  height: 29px

.styler
  &.is-bubble
    border-radius: 0
    box-shadow: 0
    border: $borderSize solid $clBlack
    line-height: 1

  &.is-toolbar
    border: $borderSize solid $clBlack

  .picker-guide
    display: inline-flex

  .styler-button
    display: inline-flex

  .styler-select
    display: flex

.align-content
  border: 0

.overlay
  &.overlay-editor
    .overlay-close
      top: 4px
      z-index: 999
      position: fixed

      +mq($until: 'desktop')
        top: 6px

  .styler.is-toolbar
    border: 0
    border-bottom: $borderSize solid $clBlack

    +mq($until: 'desktop')
      padding-right: 60px

.align-section
  max-width: 1000px
  margin: 0 auto

  &.is-full
    max-width: 100%
    padding: 20px
</style>
