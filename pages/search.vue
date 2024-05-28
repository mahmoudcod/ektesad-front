<template lang="pug">
div
  section.u-mt-sm
    .container
      .u-textCenter
        h1.u-title.u-mb-xs نتيجة البحث
      .grid.is-desktop-4.is-tablet-6
        template(v-for="(post, index) in posts")
          .column
            AppCard(:title="post.title" :img="getImageUrl(post.featureImage)" :cat="post.category" :url="`/opinion/${post.slug}`" :catColor="getColor(post)")

</template>

<script>
import AppCard from "~/components/AppCard";
import bus from "~/plugins/bus";

export default {
  head() {
    return {
      title: "البحث"
    };
  },

  components: {
    AppCard
  },

  async asyncData({ app, store, error, query }) {
    try {
      let text = query && query.text;
      let { data } = await app.$axiosApi.get(
        `/posts?_sort=createdAt:desc&body_contains=${text}`
      );
      bus.$emit("stopLoading");
      return { posts: data };
    } catch (err) {
      console.log(err);
      return error();
    }
  },

  watch: {
    async $route(to, from) {
      try {
        let text = this.$route.query && this.$route.query.text;
        let { data } = await this.$axiosApi.get(
          `/posts?_sort=createdAt:desc&body_contains=${text}`
        );
        bus.$emit("stopLoading");
        this.posts = data;
        return;
      } catch (err) {
        console.log(err);
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
    }
  }
};
</script>
<style lang="stylus"></style>
