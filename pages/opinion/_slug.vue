<template lang="pug">
div#shareableOpinion
  loader(:status="processing")

  span.label.is-danger.alert-block(v-if="messages.fail") {{ messages.fail }}
  span.label.is-success.alert-block(v-if="messages.success") {{ messages.success }}

  section.u-mt-sm
    .container
      .grid.is-desktop-4.is-tablet-6
        .column.is-tablet-8
          div(v-for="p in post")
            AppSingle(
              :title="p.title"
              :excerpt="p.excerpt"
              :img="getImageUrl(p.featureImage)"
              :date="getDate(p.createdAt)"
              :author="getAuthorObject(p)"
              :category="getCategory(p.category)"
            )

              vue-markdown(html) {{ p.body }}
              .tags
                .tagLabel(v-for="tag in p.tags")
                  nuxt-link(:to="`/tags/?tag=${tag.name}`" target="blank") {{ tag.name }}

              b-share.u-mt-xs(
                :title="p.title"
                :url="postLink(p.slug)"
                :image="getImageUrl(p.featureImage)"
                :description="p.excerpt"
              )

            div(class="sharethis-inline-share-buttons")
            //- adsbygoogle(
            //-   class="adsbygoogle"
            //-   style="display:block ;text-align:center; margin-bottom: 60px;"
            //-   data-ad-client="ca-pub-2440369596668454"
            //-   data-ad-slot="3676895945"
            //-   data-ad-format="auto"
            //-   data-full-width-responsive="true"
            //-   )
        .column.is-tablet-4.mobile-hide
          .sidebar
            div(v-if="posts.length && posts.length > 0")
              h2.sidebar-secondtHead.u-mb-xs.u-title محتوي ذات صلة
              div(v-for="post in posts")
                AppCard(
                  :title="post.title"
                  :img="getImageUrl(post.featureImage)"
                  :url="`/opinion/${post.slug}`"
                )
            h2.sidebar-secondtHead.u-mt-sm.u-mb-xs.u-title شخصيات ملهمة
            div(v-for="figure in figures")
              AppNew(:title="figure.name"  :desc="figure.job" :img="getImageUrl(figure.featureImage)" :url="`/characters/${figure.slug}`")
            h2.sidebar-secondtHead.u-mt-sm.u-mb-xs.u-title  زورارنا يتصفحون الآن
            div(v-for="post in lastPosts.slice(0, 4)")
              AppVisitor(
                :title="post.title"
                :img="getImageUrl(post.featureImage)"
                :url="`/opinion/${post.slug}`"
                :subTitle="getCategory(post.category)"
              )


  //- .container
  //-   .u-divider.u-mh-sm
  //- section
  //-   .container
  //-     .grid.is-widescreen-8.is-desktop-10.is-center
  //-       .column
  //-         template(v-if="post.comments && post.comments.length")
  //-           h2.h1.u-mb-xs التعليقات ({{ $store.getters['post/GET_COMMENT_NUM'] }})
  //-           template(v-for="comment in $store.getters['post/GET_COMMENTS']")
  //-             AppComment(:title="comment.anonymusUser" :comment="comment.text" :postId="post.id" :commentId="comment.id" :key="comment.id")
  //-             AppComment(v-if="comment.child" v-for="child in comment.child" child class="is-child" :title="child.anonymusUser" :comment="child.text" :postId="post.id" :key="child.id")
  //-         template(v-else)
  //-           h2 لا يوجد تعليقات حتى اﻵن

  //-         h3.h2.u-mt-sm.u-mb-xs انشر تعليقك
  //-         form(@submit.prevent="addComment")
  //-           input.input.is-static(
  //-             name ="name"
  //-             placeholder="اسم المعلق"
  //-             :class="{ 'has-error': errors.has('name') }"
  //-             type="text"
  //-             v-validate="'required'"
  //-             v-model="commentInput.anonymusUser"
  //-             )
  //-           span.input-message(v-if="errors.has('name')")  {{ errors.first('name') }}
  //-           textarea.textarea(
  //-             placeholder="اكتب تعليقك هنا"
  //-             name ="text"
  //-             :class="{ 'has-error': errors.has('text') }"
  //-             v-validate="'required'"
  //-             v-model="commentInput.text"
  //-             )
  //-           span.input-message(v-if="errors.has('text')")  {{ errors.first('text') }}
  //-           button.is-rounded.button.is-primary.is-static.is-wide نشر التعليق

  section.u-mt-sm(v-if="otherPosts.length")
    .container
      h2.h1.u-mb-xs مقالات أخرى
      .grid.is-desktop-4.is-tablet-6
        .column(v-for="post in otherPosts")
          AppCard(:title="post.title" :img="getImageUrl(post.featureImage)" :cat="post.category" :url="`/opinion/${post.slug}`" :catColor="getColor(post)")


</template>

<script>
import AppVisitor from "~/components/AppVisitor";
import AppNew from "~/components/AppNew";
import AppCard from "~/components/AppCard";
import AppSingle from "~/components/AppSingle";
import AppComment from "~/components/AppComment";
import { GET_POSTS, GET_FIGURES } from "~/graphql/query";
import { ADD_COMMENT } from "~/graphql/mutation";
import dateFns from "date-fns";
import ar from "date-fns/locale/ar";
import VueMarkdown from "vue-markdown";
import Loader from "~/components/Loader";
import BShare from "~/components/Share";
import SocialShare from "~/components/SocialShare";
import shareThis from "share-this";
const ShareThisViaTwitter = require("share-this/dist/sharers/twitter");
const ShareThisViaFacebook = require("share-this/dist/sharers/facebook");

export default {
  head() {
    return {
      title: this.singlePost.title,
      meta: [
        {
          hid: "ia:markup_url",
          property: "ia:markup_url",
          content: `${this.$config.API_BASE}${this.$route.path}`
        },
        {
          hid: `og:site_name`,
          property: "og:site_name",
          content: `ektesad`
        },
        {
          hid: `og:type`,
          property: "og:type",
          content: `article`
        },
        {
          hid: `og:title`,
          property: "og:title",
          content: `${this.singlePost.title} | اقتصاد`
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: this.postLink(this.singlePost.slug)
        },
        {
          hid: `og:image`,
          property: "og:image",
          content: this.getImageUrl(this.singlePost.featureImage)
        },
        {
          hid: `og:description`,
          property: "og:description",
          content: this.singlePost.excerpt
        }
      ]
    };
  },

  $_veeValidate: {
    validator: "new"
  },

  components: {
    AppCard,
    AppNew,
    AppSingle,
    AppComment,
    VueMarkdown,
    Loader,
    BShare,
    SocialShare,
    AppVisitor
  },

  data() {
    return {
      messages: {
        success: null,
        fail: null
      },
      processing: false,
      dataStartIn: 4,
      bottom: false,
      loading: false,
      dataEnded: false,
      commentInput: {
        text: null,
        anonymusUser: null
      },
      categories: [
        {
          en: "investment",
          ar: "الاستثمار"
        },
        {
          en: "saving",
          ar: "الادخار"
        },
        {
          en: "spending",
          ar: "الانفاق"
        },
        {
          en: "economy",
          ar: "الاقتصاد"
        },
        {
          en: "ideas",
          ar: "أفكار مشاريع"
        },
        {
          en: "incomes",
          ar: " دخل اضافى"
        },
        {
          en: "career",
          ar: "مسارك المهنى"
        },
        {
          en: "jobs",
          ar: "ابحث عن وظيفة"
        },
        {
          en: "culture",
          ar: "ثقافة مالية"
        },
        {
          en: "summary",
          ar: "خلاصة الكتب"
        },
        {
          en: "health",
          ar: "الصحة"
        },
        {
          en: "family",
          ar: "الأسرة"
        },
        {
          en: "woman",
          ar: "المرأة"
        },
        {
          en: "banks",
          ar: "البنوك"
        }
      ]
    };
  },

  async asyncData({ app, store, error, params, redirect }) {
    try {
      let getPost = await app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            slug: params.slug,
            published: true
          },
          limit: 1,
          whereComment: {
            accepted: true
          }
        }
      });
      let getPost2 = await app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            category: "opinion",
            published: true
          },
          limit: 3
        }
      });
      let getPost3 = await app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            published: true
          },
          limit: 3,
          sort: "-createdAt"
        }
      });
      let getPost5 = app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            published: true
          },
          limit: 15,
          sort: "-createdAt"
        }
      });
      let [
        {
          data: { Posts: post }
        },
        {
          data: { Posts: otherPosts }
        },
        {
          data: { Posts: newsPosts }
        },
        {
          data: { Posts: lastPosts }
        }
      ] = await Promise.all([getPost, getPost2, getPost3, getPost5]);
      if (!post.values.length) {
        redirect("/");
      }
      if (
        post.values[0] &&
        post.values[0].comments &&
        post.values[0].comments.length
      ) {
        store.dispatch("post/CUSTOMIZE_COMMENTS", post.values[0].comments);
      }
      const {
        data: { Posts: posts }
      } = await app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            published: true,
            category: post.values[0].category
          },
          start: 3,
          limit: 6,
          sort: "-createdAt"
        }
      });
      const {
        data: { Figures }
      } = await app.$client.query({
        query: GET_FIGURES,
        variables: {
          where: {
            published: true
          },
          sort: "-createdAt",
          limit: 5
        }
      });
      return {
        singlePost: post.values[0],
        post: [post.values[0]],
        otherPosts: otherPosts.values,
        newsPosts: newsPosts.values.filter(item => item != null),
        posts: posts.values.filter(
          item => item != null && item.id != post.values[0].id
        ),
        lastPosts: lastPosts.values.filter(item => item != null),
        figures: Figures.values
      };
    } catch (err) {
      console.log(err);
      return error();
    }
  },

  created() {
    if (process.browser) {
      window.addEventListener("scroll", () => {
        this.bottom = this.bottomVisible();
      });
    }
  },

  watch: {
    bottom(val) {
      if (val) {
        this.loadMorePosts();
      }
    }
  },

  mounted() {
    const selectionShare = shareThis({
      selector: "#shareableOpinion",
      sharers: [ShareThisViaTwitter, ShareThisViaFacebook]
    });
    selectionShare.init();
  },

  methods: {
    getColor(post) {
      if (post.category === "event") {
        return "#fbb040";
      } else if (post.category === "opinion") {
        return "#0089c7";
      } else if (post.category === "news") {
        return "#0089c7";
      } else if (post.category === "success") {
        return "#fbb040";
      }
    },
    getCategory(category) {
      if (category === "incomes") {
        return "دخل اضافى";
      } else if (category === "investment") {
        return "الاستثمار";
      } else if (category === "saving") {
        return "الادخار";
      } else if (category === "spending") {
        return "الانفاق";
      } else if (category === "economy") {
        return "الاقتصاد";
      } else if (category === "ideas") {
        return "أفكار مشاريع";
      } else if (category === "career") {
        return "مسارك المهنى";
      } else if (category === "jobs") {
        return "ابحث عن وظيفة";
      } else if (category === "culture") {
        return "ثقافة مالية";
      } else if (category === "summary") {
        return "خلاصة الكتب";
      } else if (category === "health") {
        return "الصحة";
      } else if (category === "family") {
        return "الأسرة";
      } else if (category === "woman") {
        return "المرأة";
      } else if (category === "banks") {
        return "البنوك";
      } else if (category === "success") {
        return "نجاحات";
      } else {
        return "";
      }
    },
    postLink(slug) {
      return `${process.env.FRONTEND_BASE}/opinion/${slug}`;
    },
    getAuthorObject(post) {
      if (post.user) {
        return {
          name: post.user.username ? post.user.username : "",
          bio: post.user.bio ? post.user.bio : "",
          img: post.user.profilePicture
            ? `${process.env.API_BASE}${post.user.profilePicture.url}`
            : "/user.png",
          url: post.user.slug
            ? `/author/${post.user.slug}`
            : `/author/${post.user.username}`
        };
      }
    },
    getImageUrl(featureImage) {
      if (featureImage && featureImage.url) {
        return `${process.env.API_BASE}${featureImage.url}`;
      } else {
        return "/emptyPost.jpg";
      }
    },
    getDate(date) {
      return dateFns.distanceInWords(date, Date.now(), {
        locale: ar
      });
    },
    async addComment() {
      try {
        const isValid = await this.$validator.validateAll();
        if (!isValid) return;
        this.processing = true;
        this.commentInput.post = this.post.id;
        console.log(this.commentInput, "comment input");
        let {
          data: { Comment }
        } = await this.$client.mutate({
          mutation: ADD_COMMENT,
          variables: {
            commentInput: this.commentInput
          }
        });
        this.processing = false;
        this.messages.success = "تم إضافة التعليق بنجاح";
        setTimeout(() => {
          this.messages.success = null;
        }, 5000);
        this.commentInput.anonymusUser = "";
        this.commentInput.text = "";
        return;
      } catch (err) {
        console.log(err);
        this.processing = false;
        this.messages.false = "لقد حدث خطأ ما";
        setTimeout(() => {
          this.messages.false = null;
        }, 5000);
        return;
      }
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight - 800;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    async loadMorePosts() {
      try {
        this.loading = true;
        const {
          data: { Posts }
        } = await this.$client.query({
          query: GET_POSTS,
          variables: {
            where: {
              published: true
            },
            sort: "-createdAt",
            limit: 1,
            start: this.dataStartIn
          }
        });
        let vm = this;
        Posts.values.map(el => {
          let exist = vm.post.find(post => {
            return String(post.id) === String(el.id);
          });
          if (!exist) {
            vm.post.push(el);
          }
        });
        this.dataStartIn += 4;
        if (Posts.values.length < 4) {
          this.dataEnded = true;
        }
        this.loading = false;
        return;
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="stylus">
#shareableOpinion
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
li[data-share-via='twitter'], li[data-share-via='facebook']
  width: 35px
  list-style-type: none
  float: left
  background-color: black
  border: 1px solid #fff
  border-radius: 3px

  a
    color: white

.tags
  display: flex
  margin-top: 40px
  flex-wrap: wrap

  .tagLabel
    background: #0088c6
    color: #fff
    width: max-content
    -webkit-transform: skew(-40deg)
    transform: skew(-40deg)
    padding: 4px 15px
    margin-left: 5px
    margin-bottom: 10px

    &:hover
      background: $clSecondary

    a
      color: #fff
      -webkit-transform: skew(40deg)
      transform: skew(40deg)
      display: block
      white-space: nowrap
      font-size: 11px

.sidebar
  &-firstHead
    color: #FBB040
    font-size: 20px
    font-weight: bold
  &-secondtHead
    color: #0088C6
    font-size: 20px
    font-weight: bold
.mobile-hide
  @media only screen and (max-width: 768px)
    display: none
</style>
