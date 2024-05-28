<template lang="pug">
div#index
  .container
    .grid
      .column.is-12.u-mt-xs
        .grid.is-tiny
          .column.is-tablet-8
            section.homeIntro(v-if="posts && posts.length")
              .homeIntro-slider
                div(v-swiper:bnSliderswiper='bnOptions')
                  .swiper-wrapper
                    .swiper-slide(v-for="p in posts.slice(0, 6)")
                      nuxt-link(:to="`/opinion/${p.slug}`").homeIntro-slider-item
                        .homeIntro-slider-item-thumb(:style="{backgroundImage: `url(${getImageUrl(p.featureImage)})` }")
                        .homeIntro-slider-item-content
                          h4.h4 {{ p.title }}
                  .swiper-button-prev(slot='button-prev')
                  .swiper-button-next(slot='button-next')
          .column.is-tablet-4.mobile-hide
            //- .grid.is-tiny
            div(v-for="p in posts.slice(7, 9)" style="margin-bottom: 6px;")
              nuxt-link(:to="`/opinion/${p.slug}`").homeIntro-slider-item
                .homeIntro-slider-item-thumb(:style="{backgroundImage: `url(${getImageUrl(p.featureImage)})` }")
                .homeIntro-slider-item-content
                  h4.h4 {{ p.title }}


        div(style="margin-top: 2rem;" v-if="!posts.length")
          no-data

  //- section.u-mt-xs
  //-   .container.u-textCenter
  //-     h2.u-title.h1.u-mb-xs العملات
  //-     Currency

  section.finance.u-mt-xs(v-if="currencies && currencies['EGP']")
    .container
      .grid
        .column.is-12
          .finance-content
            finance-n(text="EGP / USD" :number="currencies['EGP'].toFixed(2)")
            finance-n(text="EUR / USD" :number="currencies['EUR'].toFixed(2)")
            finance-n(text="TRY / USD" :number="currencies['TRY'].toFixed(2)")
            finance-n(text="JPY / USD" :number="currencies['JPY'].toFixed(2)")
            finance-n(text="CNY / USD" :number="currencies['CNY'].toFixed(2)")

  section.u-mt-sm.flex
    .container
      h1.u-title.h1.u-mb-xs مقالات مميزة
      .grid(v-if="posts && posts.length")
        .column.is-widescreen-5.is-desktop-4.is-tablet-6
          AppCard(:cat="arrangePosts.first.category" :catColor="getColor(arrangePosts.first)" v-if="arrangePosts.first" :title="arrangePosts.first.title" :date="getDate(arrangePosts.first.createdAt)" :img="getImageUrl(arrangePosts.first.featureImage)" :url="`/opinion/${arrangePosts.first.slug}`" :key="arrangePosts.first.id")
          template(v-if="arrangePosts.inline")
            AppCard.is-list(:cat="inline.category" :catColor="getColor(inline)" v-for="inline in arrangePosts.inline" :date="getDate(inline.createdAt)" :title="inline.title" :url="`/opinion/${inline.slug}`" :key="arrangePosts.inline.id")
        .column.is-widescreen-3.is-desktop-3.is-tablet-6(v-if="arrangePosts.second")
          AppCard(:cat="second.category" :catColor="getColor(second)" v-for="second in arrangePosts.second" :date="getDate(second.createdAt)" :title="second.title" :img="getImageUrl(second.featureImage)" :url="`/opinion/${second.slug}`" :key="arrangePosts.second.id")
        .column.is-widescreen-4.is-desktop-5(v-if="arrangePosts.left")
          .grid.is-desktop-12.is-tablet-6
            .column
              AppCard.is-wide.u-mb-col(:cat="left.category" :catColor="getColor(left)" v-for="left in arrangePosts.left" :title="left.title" :date="getDate(left.createdAt)" :img="getImageUrl(left.featureImage)" :url="`/opinion/${left.slug}`" :key="arrangePosts.left.id")
      no-data(v-else)


  //- section.u-mt-xs
  //-   .container
  //-     nuxt-link(to="/"): img.u-img(src="/a/1.jpg" alt="اقتصاد")
  //- section.u-mt-xs
  //-   .container
  //-     h2.u-title.h1.u-mb-xs مقالات مميزة
  //-     .grid.is-desktop-3.is-tablet-6(v-if="featuredPosts && featuredPosts.length")
  //-       .column(v-for="post in featuredPosts")
  //-         AppCard(:title="post.title" :url="`opinion/${post.slug}`" :img="getImageUrl(post.featureImage)" :cat="post.category" :catColor="getColor(post)")
  //-     no-data(v-else)

  //- adsbygoogle(
  //-    class="adsbygoogle"
  //-    style="display:block ; text-align:center; margin-bottom: 60px;"
  //-    data-ad-client="ca-pub-4066044653984909"
  //-    data-ad-slot="6628325552"
  //-    data-ad-format="auto"
  //-    data-full-width-responsive="true"
  //-   )

  section.u-mt-sm
    .container
      h2.u-title.h1.u-mb-xs الثروة
      .grid.is-desktop-3(v-if="success && success.length")
        .column(v-for="s in success")
          AppCard(:cat="s.category" :catColor="getColor(s)" :title="s.title" :img="getImageUrl(s.featureImage)" :url="`/opinion/${s.slug}`")
      no-data(v-else)

  //- adsbygoogle(
  //-    class="adsbygoogle"
  //-    style="display:block ; text-align:center; margin-bottom: 60px;"
  //-    data-ad-client="ca-pub-4066044653984909"
  //-    data-ad-slot="3000620474"
  //-    data-ad-format="auto"
  //-    data-full-width-responsive="true"
  //-   )
  //- section.banner.u-mt-sm
  //-   .container
  //-     a.banner-img(href="https://yaabusiness.com/" target="_blank" style="display:flex;justify-content: center;")
  //-       img(src="/ads/970-x-300.jpg" title="يابزنس" alt="يابزنس")

  section.u-mt-sm.charactersSection
    .container
      .charactersSection-header.u-textCenter
        h2.u-title.h1: nuxt-link(to="/characters/")  الشخصيات
        p.u-text-lg.u-mb-xs الشخصيات العربية والعالمية المؤثرة في جميع مجالات الحياة
      .grid.is-6.is-tablet-4.is-desktop-2.is-ultrawide-2(v-if="figures && figures.length")
        .column.u-mb-sm(v-for="figure in figures")
          AppCardUser(:title="figure.name" :desc="figure.job" :img="getImageUrl(figure.featureImage)" :url="`/characters/${figure.slug}`")
      no-data(v-else)

    img.charactersSection-bg1(src="~assets/img/c1.png" alt="الشخصيات")
    img.charactersSection-bg2(src="~assets/img/c2.png" alt="الشخصيات")

  section.u-mt-sm
    .container
      h2.u-title.h1.u-mb-xs دع الحياة تتحسن
      .grid(v-if="events && events.length")
        .column.is-tablet-6(v-for="upper in arrangeEvents.upper")
          AppCard(:cat="upper.category" :catColor="getColor(upper)" :title="upper.title" :img="getImageUrl(upper.featureImage)" :url="`/opinion/${upper.slug}`")
        .column.is-tablet-6.is-desktop-3(v-for="lower in arrangeEvents.lower")
          AppCard(:cat="lower.category" :catColor="getColor(lower)" :title="lower.title" :img="getImageUrl(lower.featureImage)" :url="`/opinion/${lower.slug}`" )
      no-data( v-else)

  section.u-mt-sm
    .container
      h2.u-title.h1.u-mb-xs مال وأعمال
      .grid.is-desktop-3(v-if="works && works.length")
        .column(v-for="s in works")
          AppCard(:cat="s.category" :catColor="getColor(s)" :title="s.title" :img="getImageUrl(s.featureImage)" :url="`/opinion/${s.slug}`")
      no-data(v-else)

  //- adsbygoogle(
  //-    class="adsbygoogle"
  //-    style="display:block ; text-align:center; margin-bottom: 60px;"
  //-    data-ad-client="ca-pub-4066044653984909"
  //-    data-ad-slot="7633399042"
  //-    data-ad-format="auto"
  //-    data-full-width-responsive="true"
  //-   )

  //- section.u-mt-sm
  //-   .container
  //-     nuxt-link(to="/"): img.u-img(src="/a/2.jpg" alt="اقتصاد")
  section.u-mt-sm.u-mb-md.infoSection
    .container
      .infoSection-header.u-textCenter
        p.u-text-md#holaaaa إن المعلومات الاستثمارية والتعليقات والأفكار الواردة هنا ليست ضمن الاستشارات أو التوصيات الإستثمارية. والغرض منها هو توضيح الأفكار وتسهيلها دون الأخذ بها كتوصيات مالية. تستند التعليقات الواردة والشروحات على الآراء الشخصية لمن يقدمون المشورة وقد لا تكون هذه الآراء مناسبة لوضعك المالي والإستثماري وتفصيلاتك المتعلقة بالمخاطرة والعائد. بالنسبة للمعلومات المكتوبة والرسوم التوضيحية ضمن نطاق موقعنا، فإنها قد كُتبت لإثراء الثقافة المالية والحصول على معلومات تُفيد المستخدم العربي، وهي تخلي مسئوليتنا من أي قرار استثماري وما قد يترتب عليه.

  div(id="atContainer-5fea176892ebdd849a53fd0a1dd4c837")
  //- section.homeBanner
    //- div.homeBanner-img-left
  //-   a.homeBanner-img-left(href="https://yaabusiness.com/" target="_blank")
  //-     img(src="/ads/160-x-600-option-6.jpg" title="يابزنس" alt="يابزنس")
  //-   a.homeBanner-img-right(href="https://yaabusiness.com/" target="_blank")
  //-     img(src="/ads/160-x-600.jpg" title="يابزنس" alt="يابزنس")
</template>

<script>
import AppCard from "~/components/AppCard";
import AppCardUser from "~/components/AppCardUser";
import AppChart from "~/components/AppChart";
import Currency from "~/components/currency";

import { GET_POSTS, GET_FIGURES } from "~/graphql/query";
import dateFns from "date-fns";
import ar from "date-fns/locale/ar";
import noData from "~/components/noData";
import financeN from "~/components/financeN";

export default {
  head() {
    return {
      title: "اقتصاد",
      meta: [
        {
          hid: `og:title`,
          property: "og:title",
          content: "اقتصاد"
        },
        {
          hid: `og:image`,
          property: "og:image",
          content: `${process.env.FRONTEND_BASE}/icon.png`
        }
        // {
        //   hid: `og:description`,
        //   property: "og:description",
        //   content:
        //     "منصة اقتصاد هي مبادرة مالية تهدف لتحسين قدرة المجتمع على ادارة الأموال ونشر الوعي المالي، تقدم لك نصائح وتحليلات حول أساليب الاستثمار والادخار."
        // }
      ]
    };
  },

  components: {
    AppCard,
    AppCardUser,
    AppChart,
    noData,
    financeN,
    Currency
  },

  data: () => ({
    bnOptions: {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination"
      },
      breakpoints: {
        1024: {
          slidesPerView: 1,
          spaceBetween: 10
        },

        320: {
          slidesPerView: 1,
          spaceBetween: 10
        }
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    },
    currencies: []
  }),
  created() {},
  async asyncData({ app, store, error }) {
    try {
      const getPosts = app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            published: true
          },
          limit: 17,
          sort: "-createdAt"
        }
      });
      const getPosts2 = app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            featured: true,
            published: true
          },
          limit: 8,
          sort: "-createdAt"
        }
      });
      const getFigures = app.$client.query({
        query: GET_FIGURES,
        variables: {
          where: {
            featured: true,
            published: true
          },
          limit: 6,
          sort: "-createdAt"
        }
      });
      const getEvents = app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            category: ["culture", "summary", "health", "family", "woman"],
            published: true
          },
          limit: 6,
          sort: "-createdAt"
        }
      });
      const getSuccess = app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            category: ["saving", "investment", "spending", "economy", "banks"],
            published: true
          },
          limit: 8,
          sort: "-createdAt"
        }
      });
      // let { data: freeCurrency } = await app.$axiosApi.get(
      //   // "https://freecurrencyapi.net/api/v2/latest?apikey=184dee50-455d-11ec-b4da-41929778bb60"
      //   "https://currencyapi.com/api/v2/latest?apikey=184dee50-455d-11ec-b4da-41929778bb60"
      // );
      const getWorks = app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            category: ["ideas", "incomes", "career", "jobs"],
            published: true
          },
          limit: 8,
          sort: "-createdAt"
        }
      });
      let [
        {
          data: { Posts }
        },
        {
          data: { Posts: featuredPosts }
        },
        {
          data: { Figures }
        },
        {
          data: { Posts: events }
        },
        {
          data: { Posts: success }
        },
        {
          data: { Posts: works }
        }
      ] = await Promise.all([
        getPosts,
        getPosts2,
        getFigures,
        getEvents,
        getSuccess,
        getWorks
      ]);

      return {
        // posts: Posts.values,
        // featuredPosts: featuredPosts.values,
        // figures: Figures.values,
        // events: events.values,
        // success: success.values
        posts: Posts.values.filter(item => item != null),
        featuredPosts: featuredPosts.values.filter(item => item != null),
        figures: Figures.values.filter(item => item != null),
        events: events.values.filter(item => item != null),
        success: success.values.filter(item => item != null),
        works: works.values.filter(item => item !== null)
        // finance: freeCurrency.data,
      };
    } catch (err) {
      console.log(err);
      return error();
    }
  },
  mounted() {
    this.getRates();
    // let adScript = document.createElement("script");
    // adScript.type = "text/javascript";
    // adScript.text = `
    //   atOptions = {
    //     'key' : '5fea176892ebdd849a53fd0a1dd4c837',
    //     'format' : 'iframe',
    //     'height' : 600,
    //     'width' : 160,
    //     'params' : {}
    //   };
    //   document.write('<scr' + 'ipt type="text/javascript" src="//www.topcreativeformat.com/5fea176892ebdd849a53fd0a1dd4c837/invoke.js"></scr' + 'ipt>');
    // `;
    // document.getElementById("ad-container").appendChild(adScript);

    if (typeof atAsyncOptions !== "object") var atAsyncOptions = [];
    console.log(">>>>>>>>>>>1", typeof atAsyncOptions);
    atAsyncOptions.push({
      key: "5fea176892ebdd849a53fd0a1dd4c837",
      format: "js",
      async: true,
      container: "atContainer-5fea176892ebdd849a53fd0a1dd4c837",
      params: {}
    });
    console.log(">>>>>>>>>>>2", atAsyncOptions);
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "http" +
      (location.protocol === "https:" ? "s" : "") +
      "://www.topcreativeformat.com/5fea176892ebdd849a53fd0a1dd4c837/invoke.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    console.log(
      ">>>>>>>>>>>3",
      document.getElementById("atContainer-5fea176892ebdd849a53fd0a1dd4c837")
    );
  },
  computed: {
    arrangePosts() {
      let arrangedPosts = {
        first: {},
        second: [],
        left: [],
        inline: []
      };
      if (this.posts && this.posts.length) {
        this.posts.map((post, index) => {
          if (index === 0) {
            arrangedPosts.first = post;
          }
          if (index > 1 && index < 5) {
            arrangedPosts.second.push(post);
          }
          if (index > 5 && index < 12) {
            arrangedPosts.left.push(post);
          }
          if (index >= 12) {
            arrangedPosts.inline.push(post);
          }
        });
      }
      return arrangedPosts;
    },
    arrangeEvents() {
      let arrangedPosts = {
        upper: [],
        lower: []
      };
      this.events.map((post, index) => {
        if (index === 0 || index === 1) {
          arrangedPosts.upper.push(post);
        } else {
          arrangedPosts.lower.push(post);
        }
      });
      return arrangedPosts;
    }
  },

  methods: {
    async getRates() {
      const rates = await this.$axios.get(
        "https://api.exchangerate.host/latest",
        {
          params: { base: "USD" }
        }
      );
      this.currencies = rates.data.rates;
    },
    getColor(post) {
      if (
        post.category === "news" ||
        post.category === "banks" ||
        post.category === "opinion" ||
        post.category === "event"
      ) {
        return "#0089c7";
      } else if (post.category === "summary" || post.category === "spending") {
        return "#000000";
      } else if (
        post.category === "career" ||
        post.category === "culture" ||
        post.category === "success"
      ) {
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
    getDate(date) {
      return dateFns.distanceInWords(date, Date.now(), {
        locale: ar
      });
    }
  }
};
</script>

<style lang="stylus">

#index
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
  position: relative
.homeBanner
  &-img-left
    img
      position: fixed;
      left: 1.5rem;
      top: 15%;
  &-img-right
    img
      position: fixed;
      right: 1.5rem;
      top: 15%;
  +mq($until: 1700px)
    display: none
.finance
  &-content
    display: grid;
    grid-template-columns: repeat(5, auto);
    align-items:center;
    gap: 1rem;
    margin: 1rem 0rem;

    +mq($until: 991px)
      grid-template-columns: repeat(3, auto);
    +mq($until: 767px)
      grid-template-columns: repeat(2, auto);
    +mq($until: 576px)
      grid-template-columns: repeat(1, auto);

.homeIntro
  display: flex

  +mq($until: 'desktop')
    display: block
  &-slider
    flex: 0 0 100%
    width: 50%


    +mq($until: 'desktop')
      flex: 0 0 100%
      width: 100%

    &-item
      position: relative
      display: block

      &-content
        position: absolute
        left: 0
        right: 0
        bottom: 0
        background: #2b2e30
        color: $clWhite
        padding: unitRes(10, 20)
        width: 70%

        @media only screen and (max-width: 480px)
          width: 100%
          h4
            font-size: 15px

      &-thumb
        opacity: 1
        background-repeat: no-repeat
        background-size: cover
        background-position: center center
        width: 100%
        height: auto
        padding-top: 50%
    .swiper-pagination-progressbar .swiper-pagination-progressbar-fill
      background: $clSecondary

    .swiper-container-horizontal > .swiper-pagination-progressbar
      top: auto
      bottom: 0

  &-chart
    background: $clPrimary
    padding: unitRes(20, 40)
    flex: 0 0 50%
    width: 50%
    height: 500px
    display: flex
    align-items: center
    overflow-y: hidden;

    +mq($until: 'desktop')
      display: none
      flex: 0 0 100%
      width: 100%

    >div
      flex: 1

.charactersSection
  background: $clPrimary
  padding: 80px 0
  position: relative
  z-index: 0

  *
    color: $clWhite

  a
    &:hover
      color: $clSecondary

  .u-title
    &:after
      background: #49b7dd

  .appCardUser:hover .appCardUser-title
    color: $clSecondary

  // +mq($from: 'desktop', $until: 'ultrawide')
  //   .grid
  //     .column
  //       &:nth-child(1n+5)
  //         display: none

  &-bg1
    position: absolute
    right: 0
    top: -220px
    z-index: -1

    +mq($until: 'tablet')
      display: none

  &-bg2
    position: absolute
    left: 0
    bottom: -160px
    z-index: -1
    +mq($until: 'tablet')
      bottom: -50px

.swiper-button-prev
  width: 55px;
  background-size: 69px 100px;
  background-image: url('/icons/arrow-right.svg') !important;

.swiper-button-next
  width: 55px;
  background-size: 69px 100px;
  background-image: url('/icons/arrow-left.svg') !important;
.infoSection
  background-color: #dddd !important
.infoSection-header
    padding: unitRes(60, 80)
</style>
