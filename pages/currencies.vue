<template lang="pug">
div
  section.u-mt-md
    .container
      .u-textCenter
        h1.u-title.u-mb-sm  العملات

      h2.u-mb-xs العملات العربية مقابل الدولار الامريكي
      AppTable.is-striped
        thead
          tr
            th.u-none-mobile الدولة
            th العملة
            th السعر
            th التغيير
        tbody
          tr
            td.u-none-mobile: img(src="~assets/img/flags/egp.jpg" alt="الجنيه المصري" title="الجنيه المصري")
            td الجنيه المصري
            td {{ UsdToEgp }}
            td {{ changeUsdToEgp > 0 ? `+${changeUsdToEgp}` : changeUsdToEgp }}
          tr
            td.u-none-mobile: img(src="~assets/img/flags/sar.jpg" alt="الريال السعودي" title="الريال السعودي")
            td الريال السعودي
            td {{ UsdToSar }}
            td {{ changeUsdToSar > 0 ? `+${changeUsdToSar}` : changeUsdToSar }}
          tr
            td.u-none-mobile: img(src="~assets/img/flags/aed.jpg" alt="الدرهم الإماراتي" title="الدرهم الإماراتي")
            td الدرهم الإماراتي
            td {{ UsdToAed }}
            td {{ changeUsdToAed > 0 ? `+${changeUsdToAed}` : changeUsdToAed }}
          tr
            td.u-none-mobile: img(src="~assets/img/flags/qar.jpg" alt="الريال القطري" title="الريال القطري")
            td الريال القطري
            td {{ UsdToQar }}
            td {{ changeUsdToQar > 0 ? `+${changeUsdToQar}` : changeUsdToQar }}
          tr
            td.u-none-mobile: img(src="~assets/img/flags/kwdusd.jpg" alt="الدينار الكويتي" title="الدينار الكويتي")
            td الدينار الكويتي
            td {{ UsdToKwd }}
            td {{ changeUsdToKwd > 0 ? `+${changeUsdToKwd}` : changeUsdToKwd }}
          tr
            td.u-none-mobile: img(src="~assets/img/flags/mad.jpg" alt="الدرهم المغربي" title="الدرهم المغربي")
            td الدرهم المغربي
            td {{ UsdToMad }}
            td {{ changeUsdToMad > 0 ? `+${changeUsdToMad}` : changeUsdToMad }}

      h2.u-mb-xs.u-mt-sm العملات الاجنبية مقابل الدولار الامريكي
      AppTable.is-striped
        thead
          tr
            th.u-none-mobile الدولة
            th العملة
            th السعر
            th التغيير
        tbody
          tr
            td.u-none-mobile: img(src="~assets/img/flags/aud.jpg" alt="دولار أسترالي" title="دولار أسترالي")
            td دولار أسترالي
            td {{ UsdToAud }}
            td {{ changeUsdToAud > 0 ? `${changeUsdToAud}+` : changeUsdToAud }}
          tr
            td.u-none-mobile: img(src="~assets/img/flags/cad.jpg" alt="الدولار الكندي" title="الدولار الكندي")
            td الدولار الكندي
            td {{ UsdToCad }}
            td {{ changeUsdToCad > 0 ? `+${changeUsdToCad}` : changeUsdToCad }}
          tr
            td.u-none-mobile: img(src="~assets/img/flags/chf.jpg" alt="الفرنك السويسري" title="الفرنك السويسري")
            td الفرنك السويسري
            td {{ UsdToChf }}
            td {{ changeUsdToChf > 0 ? `+${changeUsdToChf}` : changeUsdToChf }}
          tr
            td.u-none-mobile: img(src="~assets/img/flags/cny.jpg" alt="الدولار / يوان" title="الدولار / يوان")
            td الدولار / يوان
            td {{ UsdToCny }}
            td {{ changeUsdToCny > 0 ? `+${changeUsdToCny}` : changeUsdToCny }}
          tr
            td.u-none-mobile: img(src="~assets/img/flags/eur.jpg" alt="اليورو" title="اليورو")
            td اليورو
            td {{ UsdToEur }}
            td {{ changeUsdToEur > 0 ? `+${changeUsdToEur}` : changeUsdToEur }}
          tr
            td.u-none-mobile: img(src="~assets/img/flags/gbp.jpg" alt="الاسترليني" title="الاسترليني")
            td الاسترليني
            td {{ UsdToGbp }}
            td {{ changeUsdToGbp > 0 ? `+${changeUsdToGbp}` : changeUsdToGbp }}
          tr
            td.u-none-mobile: img(src="~assets/img/flags/jpy.jpg" alt="الدولار / الين" title="الدولار / الين")
            td الدولار / الين
            td {{ UsdToJpy }}
            td {{ changeUsdToJpy > 0 ? `+${changeUsdToJpy}` : changeUsdToJpy }}

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
import dateFns from "date-fns";
import { GET_POSTS } from "~/graphql/query";

export default {
  head() {
    return {
      title: "العملات"
    };
  },

  async asyncData({ app, store, error }) {
    try {
      let getPost = await app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            subCategory: "currencies",
            published: true
          },
          limit: 6,
          sort: "-createdAt"
        }
      });

      let latestUsdToEgp = app.$axios.get(
          "http://currencies.apps.grandtrunk.net/getlatest/usd/egp"
        ),
        latestUsdToSar = app.$axios.get(
          "http://currencies.apps.grandtrunk.net/getlatest/usd/sar"
        ),
        latestUsdToAed = app.$axios.get(
          "http://currencies.apps.grandtrunk.net/getlatest/usd/aed"
        ),
        latestUsdToQar = app.$axios.get(
          "http://currencies.apps.grandtrunk.net/getlatest/usd/qar"
        ),
        latestUsdToKwd = app.$axios.get(
          "http://currencies.apps.grandtrunk.net/getlatest/usd/kwd"
        ),
        latestUsdToMad = app.$axios.get(
          "http://currencies.apps.grandtrunk.net/getlatest/usd/mad"
        ),
        latestUsdToAud = app.$axios.get(
          "http://currencies.apps.grandtrunk.net/getlatest/usd/aud"
        ),
        latestUsdToCad = app.$axios.get(
          "http://currencies.apps.grandtrunk.net/getlatest/usd/cad"
        ),
        latestUsdToChf = app.$axios.get(
          "http://currencies.apps.grandtrunk.net/getlatest/usd/chf"
        ),
        latestUsdToCny = app.$axios.get(
          "http://currencies.apps.grandtrunk.net/getlatest/usd/cny"
        ),
        latestUsdToEur = app.$axios.get(
          "http://currencies.apps.grandtrunk.net/getlatest/usd/eur"
        ),
        latestUsdToGbp = app.$axios.get(
          "http://currencies.apps.grandtrunk.net/getlatest/usd/gbp"
        ),
        latestUsdToJpy = app.$axios.get(
          "http://currencies.apps.grandtrunk.net/getlatest/usd/jpy"
        );

      let prevDay = dateFns.format(
        dateFns.subDays(Date.now(), 2),
        "YYYY-MM-DD"
      );

      let prevDayUsdToEgp = app.$axios.get(
          `http://currencies.apps.grandtrunk.net/getrate/${prevDay}/usd/egp`
        ),
        prevDayUsdToSar = app.$axios.get(
          `http://currencies.apps.grandtrunk.net/getrate/${prevDay}/usd/sar`
        ),
        prevDayUsdToAed = app.$axios.get(
          `http://currencies.apps.grandtrunk.net/getrate/${prevDay}/usd/aed`
        ),
        prevDayUsdToQar = app.$axios.get(
          `http://currencies.apps.grandtrunk.net/getrate/${prevDay}/usd/qar`
        ),
        prevDayUsdToKwd = app.$axios.get(
          `http://currencies.apps.grandtrunk.net/getrate/${prevDay}/usd/kwd`
        ),
        prevDayUsdToMad = app.$axios.get(
          `http://currencies.apps.grandtrunk.net/getrate/${prevDay}/usd/mad`
        ),
        prevDayUsdToAud = app.$axios.get(
          `http://currencies.apps.grandtrunk.net/getrate/${prevDay}/usd/aud`
        ),
        prevDayUsdToCad = app.$axios.get(
          `http://currencies.apps.grandtrunk.net/getrate/${prevDay}/usd/cad`
        ),
        prevDayUsdToChf = app.$axios.get(
          `http://currencies.apps.grandtrunk.net/getrate/${prevDay}/usd/chf`
        ),
        prevDayUsdToCny = app.$axios.get(
          `http://currencies.apps.grandtrunk.net/getrate/${prevDay}/usd/cny`
        ),
        prevDayUsdToEur = app.$axios.get(
          `http://currencies.apps.grandtrunk.net/getrate/${prevDay}/usd/eur`
        ),
        prevDayUsdToGbp = app.$axios.get(
          `http://currencies.apps.grandtrunk.net/getrate/${prevDay}/usd/gbp`
        ),
        prevDayUsdToJpy = app.$axios.get(
          `http://currencies.apps.grandtrunk.net/getrate/${prevDay}/usd/jpy`
        );

      const [
        UsdToEgp,
        UsdToSar,
        UsdToAed,
        UsdToQar,
        UsdToKwd,
        UsdToMad,
        UsdToAud,
        UsdToCad,
        UsdToChf,
        UsdToCny,
        UsdToEur,
        UsdToGbp,
        UsdToJpy,

        prevUsdToEgp,
        prevUsdToSar,
        prevUsdToAed,
        prevUsdToQar,
        prevUsdToKwd,
        prevUsdToMad,
        prevUsdToAud,
        prevUsdToCad,
        prevUsdToChf,
        prevUsdToCny,
        prevUsdToEur,
        prevUsdToGbp,
        prevUsdToJpy,

        {
          data: { Posts: posts }
        }
      ] = await Promise.all([
        latestUsdToEgp,
        latestUsdToSar,
        latestUsdToAed,
        latestUsdToQar,
        latestUsdToKwd,
        latestUsdToMad,
        latestUsdToAud,
        latestUsdToCad,
        latestUsdToChf,
        latestUsdToCny,
        latestUsdToEur,
        latestUsdToGbp,
        latestUsdToJpy,

        prevDayUsdToEgp,
        prevDayUsdToSar,
        prevDayUsdToAed,
        prevDayUsdToQar,
        prevDayUsdToKwd,
        prevDayUsdToMad,
        prevDayUsdToAud,
        prevDayUsdToCad,
        prevDayUsdToChf,
        prevDayUsdToCny,
        prevDayUsdToEur,
        prevDayUsdToGbp,
        prevDayUsdToJpy,

        getPost
      ]);

      let changeUsdToEgp = UsdToEgp.data - prevUsdToEgp.data,
        changeUsdToSar = UsdToSar.data - prevUsdToSar.data,
        changeUsdToAed = UsdToAed.data - prevUsdToAed.data,
        changeUsdToQar = UsdToQar.data - prevUsdToQar.data,
        changeUsdToKwd = UsdToKwd.data - prevUsdToKwd.data,
        changeUsdToMad = UsdToMad.data - prevUsdToMad.data,
        changeUsdToAud = UsdToAud.data - prevUsdToAud.data,
        changeUsdToCad = UsdToCad.data - prevUsdToCad.data,
        changeUsdToChf = UsdToChf.data - prevUsdToChf.data,
        changeUsdToCny = UsdToCny.data - prevUsdToCny.data,
        changeUsdToEur = UsdToEur.data - prevUsdToEur.data,
        changeUsdToGbp = UsdToGbp.data - prevUsdToGbp.data,
        changeUsdToJpy = UsdToJpy.data - prevUsdToJpy.data;

      return {
        UsdToEgp: UsdToEgp.data,
        UsdToSar: UsdToSar.data,
        UsdToAed: UsdToAed.data,
        UsdToQar: UsdToQar.data,
        UsdToKwd: UsdToKwd.data,
        UsdToMad: UsdToMad.data,
        UsdToAud: UsdToAud.data,
        UsdToCad: UsdToCad.data,
        UsdToChf: UsdToChf.data,
        UsdToCny: UsdToCny.data,
        UsdToEur: UsdToEur.data,
        UsdToGbp: UsdToGbp.data,
        UsdToJpy: UsdToJpy.data,

        changeUsdToEgp,
        changeUsdToSar,
        changeUsdToAed,
        changeUsdToQar,
        changeUsdToKwd,
        changeUsdToMad,
        changeUsdToAud,
        changeUsdToCad,
        changeUsdToChf,
        changeUsdToCny,
        changeUsdToEur,
        changeUsdToGbp,
        changeUsdToJpy,

        posts: posts.values
      };
    } catch (err) {
      return error();
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
  },

  components: {
    AppCard,
    AppTable
  }
};
</script>
<style lang="stylus"></style>
