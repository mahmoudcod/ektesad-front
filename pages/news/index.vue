<template lang="pug">
div
  section.u-mt-sm
    .container
      .u-textCenter
        h1.u-title.u-mb-xs آخر الأخبار
      .grid.is-desktop-4.is-tablet-6(v-if="posts && posts.length")
        template(v-for="(post, index) in posts")
          .column
            AppCard(:title="post.title" :img="getImageUrl(post.featureImage)" :cat="post.category" :url="`/news/${post.slug}`" :catColor="getColor(post)")

          .column.is-12.u-mt-col.u-mb-xs(v-if="(index+1) % 6 === 0")
            nuxt-link(to="/"): img.u-img(src="/a/1.jpg" alt="اقتصاد" title="اقتصاد")
      no-data(v-else)

      .u-textCenter.u-mt-xs(v-if="loading && !dataEnded")
        button.button.is-secondary.is-rounded(:class="loading && 'is-loading'") تح

</template>

<script>
import AppCard from "~/components/AppCard";
import { GET_POSTS } from "~/graphql/query";
import noData from "~/components/noData";

export default {
  head() {
    return {
      title: "آخر الأخبار"
    };
  },

  components: {
    AppCard,
    noData
  },

  data() {
    return {
      dataStartIn: 6,
      bottom: false,
      loading: false,
      dataEnded: false
    };
  },

  async asyncData({ app, store, error }) {
    try {
      const {
        data: { Posts }
      } = await app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            category: "news",
            published: true
          },
          sort: "-createdAt",
          limit: 6,
          start: 0
        }
      });
      return { posts: Posts.values };
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
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight - 200;
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
              category: "news",
              published: true
            },
            sort: "-createdAt",
            limit: 6,
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
        this.dataStartIn += 6;
        if (Posts.values.length < 6) {
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
<style lang="stylus"></style>
