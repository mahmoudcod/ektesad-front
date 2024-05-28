<template lang="pug">
div
  section.u-mt-sm
    .container
      .u-textCenter
        h1.u-title.u-mb-xs {{ this.tag.name }}
      .grid.is-desktop-4.is-tablet-6
        template(v-for="(post, index) in posts")
          .column
            AppCard(:title="post.title" :img="getImageUrl(post.featureImage)" :cat="post.category" :url="getPostUrl(post)" :catColor="getColor(post)")

</template>

<script>
import AppCard from "~/components/AppCard";
import { GET_TAGS, GET_POSTS } from "~/graphql/query";

export default {
  head() {
    return {
      title: this.tag.name
    };
  },

  components: {
    AppCard
  },

  async asyncData({ app, store, error, query, redirect }) {
    try {
      const {
        data: { Tags }
      } = await app.$client.query({
        query: GET_TAGS,
        variables: {
          where: {
            name: query.tag
          },
          wherePost: {
            published: true
          },
          sortPost: "-createdAt",
          limit: 1
        }
      });
      if (!Tags.values || !Tags.values.length) redirect("/");
      const {
        data: { Posts }
      } = await app.$client.query({
        query: GET_POSTS,
        variables: {
          sort: "-createdAt",
          limit: 20,
          start: 0,
          where: { tags: Tags.values[0].id }
        }
      });
      return { tag: Tags.values[0], posts: Posts.values };
    } catch (err) {
      console.log(err);
      return error();
    }
  },

  methods: {
    getPostUrl(post) {
      // if (
      //   post.category === "event" ||
      //   post.category === "opinion" ||
      //   post.category === "story"
      // ) {
      return `/opinion/${post.slug}`;
      // } else {
      //   return `/opinion/${post.slug}`;
      // }
    },
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
