<template lang="pug">
#media
  section.u-mt-sm.terms(v-if="about")
    .container
      .grid.is-ultrawide-6.is-widescreen-8.is-desktop-10.is-center
        .column
          vue-markdown.terms(:source="about.mediaCh")
  div(style="margin-top: 2rem", v-else)
    no-data
</template>

<script>
import { GET_ABOUT } from "~/graphql/query";
import noData from "~/components/noData";
import VueMarkdown from "vue-markdown";

export default {
  head() {
    return {
      title: "الميثاق الإعلامي",
    };
  },
  components: {
    noData,
    VueMarkdown,
  },
  async asyncData({ app, store, error }) {
    try {
      const {
        data: { abouts },
      } = await app.$client.query({
        query: GET_ABOUT,
      });
      return { about: abouts[0] };
    } catch (err) {
      return error({ statusCode: 500, message: "Internal Server Error" });
    }
  },
};
</script>

<style lang="stylus">
#media {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.terms {
  p {
    line-height: 30px !important;
    font-size: 18px;
  }

  h1 {
    font-family: 'IBMPlexSansArabic';
    font-weight: 900;
    line-height: 1.5 !important;
    font-size: calc(21.71429px + 0.08929vw);
    margin-bottom: calc(17.14286px + 0.89286vw);
  }

  h2 {
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }

  ol[type='A'] {
    list-style-type: arabic-indic;
  }

  ol[type='a'] {
    list-style-type: arabic-indic;
  }

  ol[type='i'] {
    list-style-type: arabic-indic;
  }

  ol {
    padding-right: 40px;
    font-size: 16px;
    line-height: 30px;

    li {
      line-height: 1.6;
      margin-bottom: 10px;
    }
  }

  .u-mb-xs {
    margin-bottom: 10px;
  }

  .u-mt-sm {
    margin-top: 20px;
  }

  .u-text-md {
    font-size: 16px;
  }
}
</style>
