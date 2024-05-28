<template lang="pug">
div
  loader(:status="processing")

  span.label.is-danger.alert-block(v-if="messages.fail") {{ messages.fail }}
  span.label.is-success.alert-block(v-if="messages.success") {{ messages.success }}

  section.u-mt-sm
    .container
      .grid.is-widescreen-8.is-desktop-10.is-center(v-if="$store.getters['settings/GET_SETTINGS']")
        .column
          .u-textCenter
            h1.u-title.u-mb-xs اتصل بنا
            p.u-text-md استخدم نموذج الاتصال بنا للتواصل مع موقع اقتصاد، وتقديم مقترحاتك #[br] لتطوير خدماتنا

          .contactForm.u-mt-sm
            .contactForm-info
              a(:href="`mailto:${$store.getters['settings/GET_SETTINGS'].email}`")  #[span  البريد الالكتروني : ] {{ $store.getters['settings/GET_SETTINGS'].email }}
              a(:href="`tel:${$store.getters['settings/GET_SETTINGS'].phone}`")   #[span  الهاتف : ] {{ $store.getters['settings/GET_SETTINGS'].phone }}

            form(@submit.prevent="contact")
              .grid.is-tablet-6
                .column
                  label.input-label الاسم بالكامل
                  input.input.is-static(
                    name ="name"
                    :class="{ 'has-error': errors.has('name') }"
                    type="text"
                    v-validate="'required'"
                    v-model="contactInput.name"
                    )
                  span.input-message(v-if="errors.has('name')")  {{ errors.first('name') }}
                .column
                  label.input-label البريد الالكتروني
                  input.input.is-static(
                    name ="email"
                    :class="{ 'has-error': errors.has('email') }"
                    type="email"
                    v-validate="'required'"
                    v-model="contactInput.email"
                    )
                  span.input-message(v-if="errors.has('email')")  {{ errors.first('email') }}
              label.input-label الرسالة
              textarea.textarea(
                rows="5"
                name ="message"
                :class="{ 'has-error': errors.has('message') }"
                v-validate="'required'"
                v-model="contactInput.message"
                )
              span.input-message(v-if="errors.has('message')")  {{ errors.first('message') }}

              button.button.is-primary.is-block.is-static.u-mt-ts ارسال
      no-data(v-else)
</template>

<script>
import { CONTACT } from "~/graphql/mutation";
import Loader from "~/components/Loader";
import noData from "~/components/noData";

export default {
  head() {
    return {
      title: "اتصل بنا"
    };
  },
  $_veeValidate: {
    validator: "new"
  },

  components: {
    Loader,
    noData
  },

  data() {
    return {
      messages: {
        success: null,
        fail: null
      },
      processing: false,
      contactInput: {
        name: null,
        email: null,
        message: null
      }
    };
  },

  methods: {
    async contact() {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) return;
        this.processing = true;
        const {
          data: { Contact }
        } = await this.$client.mutate({
          mutation: CONTACT,
          variables: {
            contactInput: this.contactInput
          }
        });
        this.processing = false;
        this.messages.success = "تم إرسال الرسالة بنجاح";
        setTimeout(() => {
          this.messages.success = null;
        }, 5000);
        return;
      } catch (error) {
        console.log(error);
        this.processing = false;
        this.messages.fail = "لقد حدث خطأ أثناء إضافة الرسالة";
        setTimeout(() => {
          this.messages.fail = null;
        }, 5000);
        return;
      }
    }
  }
};
</script>

<style lang="stylus">
.contactForm
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
</style>
