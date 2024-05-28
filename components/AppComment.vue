<template lang="pug">
.appComment
  loader(:status="processing")

  span.label.is-danger.alert-block(v-if="messages.fail") {{ messages.fail }}
  span.label.is-success.alert-block(v-if="messages.success") {{ messages.success }}


  app-popup(v-if="confirm" @close="confirmToggle")
    .whiteBox
      h3.h2.u-mt-sm.u-mb-xs انشر ردك
      form(@submit.prevent="addComment")
        input.input.is-static(
          name ="name"
          placeholder="اسم المعلق"
          :class="{ 'has-error': errors.has('name') }"
          type="text"
          v-validate="'required'"
          v-model="commentInput.anonymusUser"
          )
        span.input-message(v-if="errors.has('name')")  {{ errors.first('name') }}
        textarea.textarea(
          placeholder="اكتب تعليقك هنا"
          name ="text"
          :class="{ 'has-error': errors.has('text') }"
          v-validate="'required'"
          v-model="commentInput.text"
          )
        span.input-message(v-if="errors.has('text')")  {{ errors.first('text') }}
        button.is-rounded.button.is-primary.is-static.is-wide نشر التعليق

  .appComment-header
    .appComment-thumb(v-if="child" :style="{backgroundImage:'url(/user-2.png)'}")
    .appComment-thumb(v-else :style="{backgroundImage:'url(/user.png)'}")

  .appComment-body
    h3 {{ title }}
    p(v-if="comment")  {{ comment }}
    a(v-if="!child" @click.prevent="confirm = true" href="#0", title="اكتب رد").u-title اكتب رد


</template>

<script>
import AppPopup from '~/components/AppPopup';
import { ADD_COMMENT } from '~/graphql/mutation';
import Loader from '~/components/Loader';

export default {
  name: 'AppComment',

  $_veeValidate: {
    validator: 'new'
  },

  props: {
    title: String,
    comment: String,
    commentId: String,
    postId: String,
    child: Boolean
  },

  data() {
    return {
      confirm: false,
      messages: {
        success: null,
        fail: null
      },
      processing: false,
      commentInput: {
        text: null,
        anonymusUser: null
      }
    };
  },

  components: {
    AppPopup,
    Loader
  },

  methods: {
    confirmToggle() {
      this.confirm = !this.confirm;
    },
    async addComment() {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) return;
        this.processing = true;
        this.commentInput.parent = this.commentId;
        this.commentInput.post = this.postId;
        let {
          data: { Comment }
        } = await this.$client.mutate({
          mutation: ADD_COMMENT,
          variables: {
            commentInput: this.commentInput
          }
        });
        this.processing = false;
        this.messages.success = 'تم إضافة الرد بنجاح';
        setTimeout(() => {
          this.messages.success = null;
        }, 5000);
        this.confirmToggle();
        this.commentInput.anonymusUser = null;
        this.commentInput.text = null;
        this.$emit('childAdded', Comment.comment);
        return;
      } catch (err) {
        console.log(err);
        this.processing = false;
        this.messages.false = 'لقد حدث خطأ ما';
        setTimeout(() => {
          this.messages.false = null;
        }, 5000);
        this.confirmToggle();
        return;
      }
    }
  }
};
</script>

<style lang="stylus">
.appComment
  display: flex

  &-thumb
    width: 40px
    height: 40px
    flex: 0 0 40px
    background-repeat: no-repeat
    background-size: cover
    background-position: center center
    transition: 200ms
    position: relative
    clip-path: polygon(0 15%, 100% 0, 100% 85%, 0 100%)
    margin-left: 20px

  &-body
    p
      max-width: 500px
      margin-top: 5px

    .u-title
      font-size: 24px
      margin-top: 5px
      @extend .type-bold

  &:not(:last-child)
    margin-bottom: 40px

  &.is-child
    margin-right: 60px

  &:hover
    .appComment
      &-thumb
        clip-path: polygon(0 0, 100% 15%, 100% 100%, 0 85%)
</style>
