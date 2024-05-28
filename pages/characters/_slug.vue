<template lang="pug">
div#shareableFigure
  section.u-mt-md
    .container
      .grid.is-widescreen-8.is-center
        .column

          AppPerson(:title="figure.name" :desc="figure.job" :img="getImageUrl(figure.featureImage)")
          .character-details.u-mt-mi
            p الجنسية: {{ figure.nationality }}
            p بلد الاقامة: {{ figure.stayingCountry }}
            p تاريخ الميلاد: {{ getDate(figure.birthDate) }}
            p العمر: {{ figure.age }} سنة
            h2.u-mt-sm.u-mb-ts السيرة الذاتية
            vue-markdown(html) {{ figure.bio }}

          section.u-mt-sm(v-if="figure.posts.length")
            h2.h1.u-mb-xs مقالات
            .grid.is-tablet-6
              .column(v-for="post in figure.posts")
                AppCard(:title="post.title" :img="getImageUrl(post.featureImage)" :cat="post.category" :url="`/opinion/${post.slug}`" :catColor="getColor(post)")
                b-share.u-mt-sm(
                  :title="post.title"
                  :url="postLink(post.slug)"
                  :image="getImageUrl(post.featureImage)"
                )

            .u-textCenter.u-mt-xs(v-if="loading && !dataEnded")
              button.button.is-secondary.is-rounded(:class="loading && 'is-loading'") تحميل

          section.u-mt-sm(v-if="figures && figures.length")
            .u-textCenter
              h2.h1.u-title.u-mb-ts شخصيات أخري

            .grid.is-6.is-tablet-4.is-desktop-2.is-ultrawide-2
              .column.u-mb-sm(v-for="figure in figures")
                AppCardUser(:title="figure.name" :desc="figure.job" :img="getImageUrl(figure.featureImage)" :url="`/characters/${figure.slug}`")

          b-share.u-mt-sm(
            :title="figure.name"
            :url="postLink(figure.slug)"
            :image="getImageUrl(figure.featureImage)"
          )
</template>

<script>
import AppCardUser from "~/components/AppCardUser";
import AppCard from "~/components/AppCard";
import AppPerson from "~/components/AppPerson";
import { GET_FIGURE, GET_FIGURES } from "~/graphql/query";
import dateFns from "date-fns";
import ar from "date-fns/locale/ar";
import BShare from "~/components/Share";
import shareThis from "share-this";
const ShareThisViaTwitter = require("share-this/dist/sharers/twitter");
const ShareThisViaFacebook = require("share-this/dist/sharers/facebook");
import VueMarkdown from "vue-markdown";

export default {
  head() {
    return {
      title: this.figure.name,
      meta: [
        {
          hid: `og:title`,
          property: "og:title",
          content: this.figure.name
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: this.postLink(this.figure.slug)
        },
        {
          hid: `og:image`,
          property: "og:image",
          content: this.getImageUrl(this.figure.featureImage)
        },
        {
          hid: `og:description`,
          property: "og:description",
          content: this.figure.bio
        }
      ]
    };
  },

  components: {
    AppCard,
    AppPerson,
    BShare,
    VueMarkdown,
    AppCardUser
  },

  data() {
    return {
      dataStartIn: 4,
      bottom: false,
      loading: false,
      dataEnded: false
    };
  },

  async asyncData({ app, store, error, params, redirect }) {
    try {
      const {
        data: { Figure }
      } = await app.$client.query({
        query: GET_FIGURE,
        variables: {
          where: {
            slug: params.slug,
            published: true
          },
          sort: "-createdAt",
          limit: 4,
          start: 0
        }
      });
      if (!Figure.values.length) {
        redirect("/");
      }
      const {
        data: { Figures }
      } = await app.$client.query({
        query: GET_FIGURES,
        variables: {
          where: {
            published: true
          },
          sort: "-createdAt",
          limit: 13,
          start: 0
        }
      });
      return {
        figure: Figure.values[0],
        figures: Figures.values.filter(user => user.id != Figure.values[0].id)
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
      selector: "#shareableFigure",
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
    postLink(slug) {
      return `${process.env.FRONTEND_BASE}/characters/${slug}`;
    },
    getDate(date) {
      return dateFns.format(date, "dddd, Do / MMM / YYYY", {
        locale: ar
      });
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
          data: { Figures }
        } = await this.$client.query({
          query: GET_FIGURE,
          variables: {
            where: {
              slug: this.$route.params.slug,
              published: true
            },
            sort: "-createdAt",
            limit: 4,
            start: this.dataStartIn
          }
        });
        let vm = this;
        Figures.values[0].posts.map(el => {
          let exist = vm.figure.posts.find(post => {
            return String(post.id) === String(el.id);
          });
          if (!exist) {
            vm.figure.posts.push(el);
          }
        });
        this.dataStartIn += 4;
        if (Figures.values[0].posts.length < 4) {
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
#shareableFigure
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

.character-details
  background: $clGray
  padding: unitRes(40, 80)

  p
    font-size: unitRes(16, 18)
    line-height: 28px
    margin-bottom: 10px
</style>
