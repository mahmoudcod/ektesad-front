<template lang="pug">
div
  section.u-mt-md
    .container

      AppPerson(:title="author.username" :desc="author.job" :img="getUserImageUrl(author.avatar)")

      section.u-mt-mi(v-if="posts.length")
        .grid.is-desktop-4.is-tablet-6
          .column(v-for="(post, index) in posts")
            AppCard(:title="post.title" :img="getImageUrl(post.featureImage)" :cat="post.category" :url="getPostUrl(post)" :catColor="getColor(post)")

        .u-textCenter.u-mt-xs(v-if="loading && !dataEnded")
          button.button.is-secondary.is-rounded(:class="loading && 'is-loading'") تح

      section.u-mt-mi(v-else)
        h3.h3 لا يوجد مقالات لهذا المستخدم

</template>

<script>
import AppCard from "~/components/AppCard";
import AppPerson from "~/components/AppPerson";
import { GET_POSTS, GET_USERS } from "~/graphql/query";

export default {
  head() {
    return {
      title: this.author.username
    };
  },

  components: {
    AppCard,
    AppPerson
  },

  data() {
    return {
      dataStartIn: 6,
      bottom: false,
      loading: false,
      dataEnded: false
    };
  },

  async asyncData({ app, store, error, redirect, params }) {
    try {
      const {
        data: { Users }
      } = await app.$client.query({
        query: GET_USERS,
        variables: {
          where: {
            slug: params.slug
          },
          sort: "-createdAt",
          limit: 1,
          start: 0
        }
      });
      if (!Users.values || !Users.values.length) {
        redirect("/");
        return;
      }
      const {
        data: { Posts }
      } = await app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            published: true,
            user: Users.values[0].id
          },
          sort: "-createdAt",
          limit: 6,
          start: 0
        }
      });
      return { posts: Posts.values, author: Users.values[0] };
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
    getPostUrl(post) {
      if (
        post.category === "event" ||
        post.category === "opinion" ||
        post.category === "story"
      ) {
        return `/opinion/${post.slug}`;
      } else {
        return `/news/${post.slug}`;
      }
    },
    getUserImageUrl(featureImage) {
      if (featureImage) {
        return featureImage;
      } else {
        return "/user.png";
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
              user: this.author.id,
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
        if (Posts.values.length) {
          this.dataStartIn += 6;
        }
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
