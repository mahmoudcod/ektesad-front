<template lang="pug">
div#index
  section.u-mt-sm
    .container
      .u-textCenter
        h1.u-title.u-mb-ts الشخصيات
        p.u-text-md.u-mb-sm الشخصيات العربية والعالمية المؤثرة في جميع مجالات الحياة

      .grid.is-6.is-tablet-4.is-desktop-2.is-ultrawide-2(v-if="figures && figures.length")
        .column.u-mb-sm(v-for="figure in figures")
          AppCardUser(:title="figure.name" :desc="figure.job" :img="getImageUrl(figure.featureImage)" :url="`/characters/${figure.slug}`")
      div(style="margin-top: 2rem;" v-else)
        no-data
      .u-textCenter.u-mt-xs(v-if="loading && !dataEnded")
        button.button.is-secondary.is-rounded(:class="loading && 'is-loading'") تح
      .u-textCenter.u-mt-xs(v-if="!loading && !dataEnded")
        button.button.is-secondary.is-rounded(@click="loadMoreFigures()") عرض المزيد
</template>

<script>
import AppCardUser from "~/components/AppCardUser";
import { GET_FIGURES } from "~/graphql/query";
import noData from "~/components/noData";

export default {
  head() {
    return {
      title: "الشخصيات"
    };
  },

  components: {
    AppCardUser,
    noData
  },

  data() {
    return {
      dataStartIn: 12,
      bottom: false,
      loading: false,
      dataEnded: false
    };
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
  //       this.loadMoreFigures();
  //     }
  //   }
  // },

  async asyncData({ app, store, error }) {
    try {
      const {
        data: { Figures }
      } = await app.$client.query({
        query: GET_FIGURES,
        variables: {
          where: {
            published: true
          },
          sort: "-createdAt",
          limit: 12,
          start: 0
        }
      });
      return { figures: Figures.values };
    } catch (err) {
      console.log(err);
      return error();
    }
  },

  methods: {
    getImageUrl(featureImage) {
      if (featureImage && featureImage.url) {
        return `${process.env.API_BASE}${featureImage.url}`;
      } else {
        return "/user.png";
      }
    },
    // bottomVisible() {
    //   const scrollY = window.scrollY;
    //   const visible = document.documentElement.clientHeight;
    //   const pageHeight = document.documentElement.scrollHeight - 200;
    //   const bottomOfPage = visible + scrollY >= pageHeight;
    //   return bottomOfPage || pageHeight < visible;
    // },
    async loadMoreFigures() {
      try {
        this.loading = true;
        const {
          data: { Figures }
        } = await this.$client.query({
          query: GET_FIGURES,
          variables: {
            where: {
              published: true
            },
            sort: "-createdAt",
            limit: 12,
            start: this.dataStartIn
          }
        });
        let vm = this;
        Figures.values.map(el => {
          let exist = vm.figures.find(figure => {
            return String(figure.id) === String(el.id);
          });
          if (!exist) {
            vm.figures.push(el);
          }
        });
        this.dataStartIn += 12;
        if (Figures.values.length < 12) {
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
