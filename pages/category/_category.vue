<template lang="pug">
div#cateogry
  section.u-mt-sm
    .container
      .u-textCenter
        h1.u-title.u-mb-xs {{categoryTitle}}
      .grid.is-desktop-4.is-tablet-6(v-if="posts && posts.length")
        .column.is-tablet-6(v-for="post in arrangePosts.top")
          AppCard(:title="post.title" :img="getImageUrl(post.featureImage)" :url="`/opinion/${post.slug}`" :catColor="getColor(post)")
        .column.is-tablet-6.is-desktop-3(v-for="post in arrangePosts.lower")
          AppCard(:title="post.title" :img="getImageUrl(post.featureImage)" :url="`/opinion/${post.slug}`" :catColor="getColor(post)")

        //- .column.is-12.u-mt-col.u-mb-xs
        //-     nuxt-link(to="/"): img.u-img(src="/a/1.jpg" alt="اقتصاد")

        template(v-for="(post, index) in arrangePosts.other")
          .column.is-tablet-6.is-desktop-3
            AppCard(:title="post.title" :img="getImageUrl(post.featureImage)" :url="`/opinion/${post.slug}`" :catColor="getColor(post)")

          //- .column.is-12.u-mt-col.u-mb-xs(v-if="(index+1) % 6 === 0")
          //-   nuxt-link(to="/"): img.u-img(src="/a/1.jpg" alt="اقتصاد")
      div(style="margin-top: 2rem;" v-else)
        no-data
      .u-textCenter.u-mt-xs(v-if="loading && !dataEnded")
        button.button.is-secondary.is-rounded(:class="loading && 'is-loading'") تح
      .u-textCenter.u-mt-xs(v-if="!loading && !dataEnded")
        button.button.is-secondary.is-rounded(@click="loadMorePosts()") عرض المزيد
  //- adsbygoogle(
  //-    class="adsbygoogle"
  //-    style="display:block ;text-align:center; margin-bottom: 60px;"
  //-    data-ad-client="ca-pub-2440369596668454"
  //-    data-ad-slot="7633399042"
  //-    data-ad-format="auto"
  //-    data-full-width-responsive="true"
  //-   )
</template>

<script>
import AppCard from "~/components/AppCard";
import { GET_POSTS } from "~/graphql/query";
import noData from "~/components/noData";

export default {
  head() {
    return {
      title: this.categoryTitle,
      meta: [
        {
          hid: `og:title`,
          property: "og:title",
          content: this.categoryTitle
        },
        {
          hid: `description`,
          property: "og:description",
          content: `مقالات من قسم ${this.categoryTitle} في اقتصاد دوت كوم`
        },
        {
          hid: `og:description`,
          property: "og:description",
          content: `مقالات من قسم ${this.categoryTitle} في اقتصاد دوت كوم`
        }
      ]
    };
  },

  components: {
    AppCard,
    noData
  },

  data() {
    return {
      dataStartIn: 10,
      bottom: false,
      loading: false,
      dataEnded: false,

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
        },
        {
          en: "entrepreneurship",
          ar: "ريادة الأعمال"
        }
      ]
    };
  },
  async asyncData({ app, store, error, params }) {
    try {
      const {
        data: { Posts }
      } = await app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            category: params.category,
            published: true
          },
          sort: "-createdAt",
          limit: 10,
          start: 0
        }
      });
      return { posts: Posts.values };
    } catch (err) {
      console.log(err);
      return error();
    }
  },

  // created() {
  //   if (process.browser) {
  //     window.addEventListener("scroll", () => {
  //       this.bottom = this.bottomVisible();
  //     });
  //   }
  // },

  // watch: {
  //   bottom(val) {
  //     if (val) {
  //       this.loadMorePosts();
  //     }
  //   }
  // },

  computed: {
    arrangePosts() {
      let arrangedPosts = {
        top: [],
        lower: [],
        other: []
      };
      if (this.posts && this.posts.length) {
        this.posts.map((post, index) => {
          if (index === 0 || index === 1) {
            arrangedPosts.top.push(post);
          }
          if (index > 1 && index < 6) {
            arrangedPosts.lower.push(post);
          }
          if (index >= 6) {
            arrangedPosts.other.push(post);
          }
        });
      }
      return arrangedPosts;
    },
    categoryTitle() {
      return this.categories.find(
        item => item.en == this.$route.params.category
      ).ar;
    }
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
    getImageUrl(featureImage) {
      if (featureImage && featureImage.url) {
        return `${process.env.API_BASE}${featureImage.url}`;
      } else {
        return "/emptyPost.jpg";
      }
    },
    // bottomVisible() {
    //   const scrollY = window.scrollY;
    //   const visible = document.documentElement.clientHeight;
    //   const pageHeight = document.documentElement.scrollHeight - 200;
    //   const bottomOfPage = visible + scrollY >= pageHeight;
    //   return bottomOfPage || pageHeight < visible;
    // },
    async loadMorePosts() {
      try {
        this.loading = true;
        const {
          data: { Posts }
        } = await this.$client.query({
          query: GET_POSTS,
          variables: {
            where: {
              category: this.$route.params.category,
              published: true
            },
            sort: "-createdAt",
            limit: 12,
            start: this.dataStartIn
          }
        });
        let vm = this;
        Posts.values.map(el => {
          let exist = vm.posts.find(post => {
            return String(post.id) === String(el.id);
          });
          if (!exist) {
            vm.posts.push(el);
          }
        });
        this.dataStartIn += 12;
        if (Posts.values.length < 10) {
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
#cateogry
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
</style>
