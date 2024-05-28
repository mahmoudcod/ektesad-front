<template lang="pug">
div#shareableNews
  section.u-mt-sm
    .container
        .grid
          .column.is-widescreen-8.is-desktop-8
            .grid.is-12(v-for="post in posts")
              .column
                AppSingle(:currentPost="post" :title="post.title" :excerpt="post.excerpt" :img="getImageUrl(post.featureImage)" :date="getDate(post.createdAt)" :author="getAuthorObject(post)")
                  vue-markdown(html) {{ post.body }}
                  .tags
                    .tagLabel(v-for="tag in post.tags")
                      nuxt-link(:to="`/tags/?tag=${tag.name}`" target="blank") {{ tag.name }}

                  b-share.u-mt-sm(
                    :title="post.title"
                    :url="postLink(post.slug)"
                    :image="getImageUrl(post.featureImage)"
                  )
          //- .column.is-widescreen-4.is-desktop-4
          //-   template(v-for="(post, index) in posts")
          //-     .column
          //-       AppCard(:title="post.title" :img="getImageUrl(post.featureImage)" :cat="post.category" :url="`/opinion/${post.slug}`" :catColor="getColor(post)")

        .u-divider.u-mh-sm(v-if="!dataEnded")

</template>

<script>
import AppCard from "~/components/AppCard";
import AppSingle from "~/components/AppSingle";
import AppComment from "~/components/AppComment";
import { GET_POSTS } from "~/graphql/query";
import dateFns from "date-fns";
import ar from "date-fns/locale/ar";
import VueMarkdown from "vue-markdown";
import BShare from "~/components/Share";
import BIcon from "~/components/icon";
import bus from "~/plugins/bus";
import SocialShare from "~/components/SocialShare";
import shareThis from "share-this";
const ShareThisViaTwitter = require("share-this/dist/sharers/twitter");
const ShareThisViaFacebook = require("share-this/dist/sharers/facebook");

export default {
  head() {
    return {
      title: this.postTitle,
      meta: [
        {
          hid: `og:title`,
          property: "og:title",
          content: this.currentPost.title
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: this.postLink(this.currentPost.slug)
        },
        {
          hid: `og:image`,
          property: "og:image",
          content: this.getImageUrl(this.currentPost.featureImage)
        }
      ]
    };
  },

  components: {
    AppCard,
    AppSingle,
    AppComment,
    VueMarkdown,
    BShare,
    SocialShare,
    BIcon
  },

  data() {
    return {
      dataStartIn: 1,
      bottom: false,
      loading: false,
      dataEnded: false
    };
  },

  async asyncData({ app, store, error, params, redirect }) {
    try {
      const {
        data: { Posts }
      } = await app.$client.query({
        query: GET_POSTS,
        variables: {
          where: {
            category: "news",
            slug: params.slug,
            published: true
          },
          sort: "-createdAt",
          limit: 1,
          start: 0
        }
      });
      if (!Posts.values.length) {
        redirect("/");
      }
      return {
        posts: Posts.values,
        postTitle: Posts.values[0].title,
        currentPost: Posts.values[0]
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
    bus.$on("getCurrentPost", post => {
      this.currentPost = post;
      this.postTitle = post.title;
      window.history.pushState(null, null, `/news/${post.slug}`);
      this.$forceUpdate();
    });

    const selectionShare = shareThis({
      selector: "#shareableNews",
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
    getDate(date) {
      return dateFns.distanceInWords(date, Date.now(), {
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
    postLink(slug) {
      return `${process.env.FRONTEND_BASE}/news/${slug}`;
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
            limit: 1,
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
            vm.currentPost = el;
          }
        });
        this.dataStartIn += 1;
        if (Posts.values.length < 1) {
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
li[data-share-via='twitter'], li[data-share-via='facebook']
  width: 35px
  list-style-type: none
  float: left
  background-color: black
  border: 1px solid #fff
  border-radius: 3px

  a
    color: white

.tags
  display: flex
  margin-top: 10px

  .tagLabel
    background: #0088c6
    color: #fff
    width: max-content
    -webkit-transform: skew(-40deg)
    transform: skew(-40deg)
    padding: 4px 15px
    margin-left: 5px

    &:hover
      background: $clSecondary

    a
      color: #fff
      -webkit-transform: skew(40deg)
      transform: skew(40deg)
      display: block
      white-space: nowrap
      font-size: 11px

.twitter-share-button
  margin-right: 20px
  background-color: #4ab3f4
  padding: 0px 20px
  color: #fff
  display: -webkit-box
  display: -ms-flexbox
  display: flex
  -webkit-box-align: center
  -ms-flex-align: center
  align-items: center
  height: 30px
  border-radius: 3px

.twitter-share-button svg
  fill: #fff
  margin-left: 5px

.facebook-share
  width: 70px
  height: 30px
  display: flex
  align-items: center
  background-color: #4267b2
  padding: 0px 20px
</style>
