<template lang="pug">
div
  section.u-mt-md
    .container
      .u-textCenter
        h1.u-title.u-mb-sm  السلع

      AppCardStock
        .appCardStock-header
          nuxt-link(to="/stocks/single").appCardStock-url
          span.u-bold السوق السعودي
          span الحجم : #[span 90.27M]
          span القيمة : #[span 2.51B]
        .appCardStock-info
          nuxt-link(to="/stocks/single").appCardStock-url
          span الشركات #[span 182]
          span الارتفاعات #[span 91]
          span الانخفاضات #[span 77]
          span لا تغيرات #[span 14]
        .appCardStock-subInfo
          span الافتتاح : #[b 7,865.68]
          span الإغلاق : #[b 7,865.68]
        .appCardStock-chart
          AppChart

      h2.u-mb-xs.u-mt-sm مؤشرات الطاقة
      AppTable.is-striped
        thead
          tr
            th السلعة
            th السعر
            th التغيير
            th التغيير ٪
            th.u-none-mobile الافتتاح
            th.u-none-mobile الاغلاق
        tbody
          tr
            td خام برنت
            td 75.00
            td 75.00
            td 17.8500
            td.u-none-mobile 17.8500
            td.u-none-mobile 17.8500
          tr
            td النفط الامريكي
            td 75.00
            td 75.00
            td 17.8500
            td.u-none-mobile 17.8500
            td.u-none-mobile 17.8500

      h2.u-mb-xs.u-mt-sm مؤشرات المعادن
      AppTable.is-striped
        thead
          tr
            th السلعة
            th السعر
            th التغيير
            th التغيير ٪
            th.u-none-mobile الافتتاح
            th.u-none-mobile الاغلاق
        tbody
          tr
            td الفضة
            td 75.00
            td 75.00
            td 17.8500
            td.u-none-mobile 17.8500
            td.u-none-mobile 17.8500
          tr
            td الذهب
            td 75.00
            td 75.00
            td 17.8500
            td.u-none-mobile 17.8500
            td.u-none-mobile 17.8500
          tr
            td البلاديوم
            td 75.00
            td 75.00
            td 17.8500
            td.u-none-mobile 17.8500
            td.u-none-mobile 17.8500
          tr
            td البلاتين
            td 75.00
            td 75.00
            td 17.8500
            td.u-none-mobile 17.8500
            td.u-none-mobile 17.8500


      h2.u-mb-xs.u-mt-sm مؤشرات التغذية
      AppTable.is-striped
        thead
          tr
            th السلعة
            th السعر
            th التغيير
            th التغيير ٪
            th.u-none-mobile الافتتاح
            th.u-none-mobile الاغلاق
        tbody
          tr
            td السكر
            td 75.00
            td 75.00
            td 17.8500
            td.u-none-mobile 17.8500
            td.u-none-mobile 17.8500
          tr
            td السكر
            td 75.00
            td 75.00
            td 17.8500
            td.u-none-mobile 17.8500
            td.u-none-mobile 17.8500

  //- section.u-mt-sm(v-if="posts && posts.length")
  //-   .container
  //-     h2.h1.u-mb-xs المقالات المتعلقة
  //-     .grid.is-desktop-4.is-tablet-6
  //-       .column(v-for="post in posts")
  //-         AppCard(:title="post.title" :img="getImageUrl(post.featureImage)" :cat="post.category" :url="getPostUrl(post)" :catColor="getColor(post)")

</template>

<script>
import AppCard from "~/components/AppCard";
import AppTable from "~/components/AppTable";
import AppCardStock from "~/components/AppCardStock";
import AppChart from "~/components/AppChart";
import { GET_POSTS } from "~/graphql/query";

export default {
  head() {
    return {
      title: "السلع"
    };
  },

  async asyncData({ app, store, error, params, redirect }) {
    try {
      let getPost = await app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            subCategory: "items",
            published: true
          },
          limit: 6,
          sort: "-createdAt"
        }
      });
      let [
        {
          data: { Posts: posts }
        }
      ] = await Promise.all([getPost]);
      return { posts: posts.values };
    } catch (err) {
      console.log(err);
      return error();
    }
  },

  components: {
    AppCard,
    AppTable,
    AppCardStock,
    AppChart
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
    postLink(slug) {
      return `${process.env.FRONTEND_BASE}/opinion/${slug}`;
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
    getAuthorObject(post) {
      if (post.user) {
        return {
          name: post.user.username && post.user.username,
          img: post.user.avatar ? post.user.avatar : "/user.png",
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
    }
  }
};
</script>
<style lang="stylus"></style>
