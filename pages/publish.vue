<template lang="pug">
div#index
  loader(:status="processing")

  span.label.is-danger.alert-block(v-if="messages.fail") {{ messages.fail }}
  span.label.is-success.alert-block(v-if="messages.success") {{ messages.success }}

  section.u-mt-sm
    .container
      .grid.is-widescreen-8.is-desktop-10.is-center
        .column
          .u-textCenter
            h1.u-title.u-mb-xs نشر مقالك
            p.u-text-md من خلال "رأي"، يمكنك كتابة مواضيع في كافة المجالات قم  #[br] بإرسال موضوعك الآن

          .publishForm.u-mt-sm
            .publishForm-info
              p يفضل قراءة الميثاق الاعلامي قبل ارسال المقال
            form
              .grid.is-tablet-6
                .column
                  label.input-label الاسم بالكامل
                  input.input.is-static(
                    name ="userName"
                    :class="{ 'has-error': errors.has('userName') }"
                    type="text"
                    v-validate="'required|min:2'"
                    v-model="postInput.userName"
                    )
                  span.input-message(v-if="errors.has('userName')")  {{ errors.first('userName') }}
                .column
                  label.input-label السن
                  input.input.is-static(
                    name ="userAge"
                    :class="{ 'has-error': errors.has('userAge') }"
                    type="number"
                    v-validate="'required'"
                    v-model="postInput.userAge"
                    )
                  span.input-message(v-if="errors.has('userAge')")  {{ errors.first('userAge') }}
                .column
                  label.input-label البريد الالكتروني
                  input.input.is-static(
                    name ="userEmail"
                    :class="{ 'has-error': errors.has('userEmail') }"
                    type="email"
                    v-validate="'required'"
                    v-model="postInput.userEmail"
                    )
                  span.input-message(v-if="errors.has('userEmail')")  {{ errors.first('userEmail') }}
                .column
                  label.input-label نوع المقالة
                  select.select.is-static(
                    name ="format"
                    :class="{ 'has-error': errors.has('format') }"
                    v-validate="'required'"
                    v-model="postInput.format"
                    )
                    option(v-for="format in formats" :value="format.id") {{ format.name }}
                  span.input-message(v-if="errors.has('format')")  {{ errors.first('format') }}
              label.input-label عنوان الموضوع
              input.input.is-static(
                name ="title"
                :class="{ 'has-error': errors.has('title') }"
                type="text"
                v-validate="'required|min:2'"
                v-model="postInput.title"
                )
              span.input-message(v-if="errors.has('title')")  {{ errors.first('title') }}

            label.input-label.u-mt-xs الموضوع
            align(v-model="postInput.body" @imageAdded="onAddImage")

            button.button.is-primary.is-block.is-static.u-mt-ts(@click.prevent="add") ارسال

</template>

<script>
import Align from "~/components/Align";
import bus from "~/plugins/bus";
import { ADD_POST } from "~/graphql/mutation";
import { GET_FORMATS } from "~/graphql/query";
import Loader from "~/components/Loader";

export default {
  head() {
    return {
      title: "نشر مقالك"
    };
  },

  $_veeValidate: {
    validator: "new"
  },

  components: {
    Align,
    Loader
  },

  data() {
    return {
      messages: {
        success: null,
        fail: null
      },
      processing: false,
      postInput: {
        userName: null,
        userAge: null,
        userEmail: null,
        format: null,
        title: null,
        body: null
      }
    };
  },

  async asyncData({ app, store, error }) {
    try {
      const {
        data: { Formats }
      } = await app.$client.query({
        query: GET_FORMATS
      });
      return { formats: Formats };
    } catch (err) {
      return error();
    }
  },

  // mounted() {
  //   bus.$on('updateFunc', async function({ update, files }) {
  //     let data = new FormData();
  //     files.forEach(file => {
  //       data.append('files', file);
  //     });
  //     let fileE = await this.$axiosApi.post('/upload', data);
  //     bus.$emit('emptyFiles');
  //   });
  // },

  methods: {
    async add() {
      // bus.$emit('getUpdateFunc');
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) return;
        if (!this.postInput.body) {
          return;
        }
        this.processing = true;
        let postInput = this.postInput;
        postInput.category = "opinion";
        postInput.published = false;
        postInput.slug = this.postInput.title.replace(/\s/gi, "-");
        const res = await this.$client.mutate({
          mutation: ADD_POST,
          variables: {
            postInput
          }
        });
        this.processing = false;
        if (res.errors && res.errors.length) {
          this.processing = false;
          if (res.errors[0].message.includes("E11000")) {
            this.messages.fail = "عنوان المقال موجود بالفعل ، يرجى تغييره";
            setTimeout(() => {
              this.messages.fail = null;
            }, 7000);
            return;
          }
          this.messages.fail = "Error";
          setTimeout(() => {
            this.messages.fail = null;
          }, 7000);
          return;
        }
        this.messages.success = "تم إضافة المقال بنجاح";
        this.$router.push("/");
        setTimeout(() => {
          this.messages.success = null;
        }, 5000);
        return;
      } catch (error) {
        console.log(error);
        this.processing = false;
        this.messages.false = "لقد حدث خطأ ما";
        setTimeout(() => {
          this.messages.false = null;
        }, 5000);
        return;
      }
    },
    async onAddImage({ update, file }) {
      let vm = this;
      const ext = file.name.match(/\.[0-9a-z]+$/i)[0];
      const fileName = `${file.name.replace(ext, "")}_${Number(
        Date.now()
      )}${ext}`;
      let formData = new FormData();
      formData.append("files", file);
      let uploadedFile = await this.$axiosApi.post("/upload", formData, {
        headers: {
          "Content-type": file.type
        }
      });
      update(uploadedFile.data[0].url);
    }
  }
};
</script>

<style lang="stylus">
.publishForm
  background: $clGray
  padding: 60px
  position: relative

  +mq($until: 'mobile')
    padding: 60px 20px

  &-info
    background: $clPrimary
    color: $clWhite
    position: absolute
    top: 0
    left: 50%
    transform: translate(-50%, -50%) skew(40deg)
    padding: 10px 40px
    display: flex

    p
      color: $clWhite
      transform: skew(-40deg)
      display: block
      white-space: nowrap

.input-label
  font-size: 14px
</style>
