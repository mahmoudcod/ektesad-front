<template lang="pug">
.appSingle(ref="intersectedPost")
  .appSingle-header
    h1.appSingle-category(v-if="category") {{category}}
    h1.appSingle-title(v-if="title") {{title}}
    h3.appSingle-excerpt(v-if="excerpt") {{excerpt}}
    //- ul.appSingle-meta
    //-   li(v-if="author" )
    //-     nuxt-link.appSingle-author(:to="author.url")
    //-       AppImage.appSingle-author-thumb(:src="author.img")
    //-       .appSingle-author-title {{author.name}}
      //- li(v-if="date")
      //-   span #[AppIcon(name="time")] {{date}}
  .appSingle-thumb(v-if="img")
    img(:src="img" :alt="title" :title="title")
    span.imgTitle {{title}}

  //- a.banner-img.u-mt-sm(href="https://yaabusiness.com/" target="_blank" style="display:flex;justify-content: center;")
  //-   img(src="/ads/468-X-60.jpg" title="يابزنس" alt="يابزنس")

  //- adsbygoogle(
  //-    class="adsbygoogle"
  //-    style="display:block; text-align:center; margin-top: 60px;"
  //-    data-ad-layout="in-article"
  //-    data-ad-format="fluid"
  //-    data-ad-client="ca-pub-4066044653984909"
  //-    data-ad-slot="7633399042"
  //-    )
  .appSingle-content
    .content
      slot
  //- adsbygoogle(
  //-    class="adsbygoogle"
  //-    style="display:block ; margin-bottom: 60px;"
  //-    data-ad-client="ca-pub-4066044653984909"
  //-    data-ad-slot="6628325552"
  //-    data-ad-format="auto"
  //-    data-full-width-responsive="true"
  //-    )
  .appSingle-user(v-if="author")
    .appSingle-user-header
      //- img(src="~assets/img/icons/user.png")
      AppImage.appSingle-author-thumb(:src="author.img" :alt="author.name" :title="author.name")
      span {{author.name}}
      //- span: nuxt-link(:to="author.url" target="blank") {{ author.name }}
    p {{author.bio}}
</template>

<script>
import AppImage from "~/components/AppImage";
import bus from "~/plugins/bus";

export default {
  name: "AppSingle",
  components: {
    AppImage
  },
  mounted() {
    let observer = null,
      callback = entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.$notifyInView();
          }
        });
      };
    let postId = this.$refs.intersectedPost.id;
    if (!observer) {
      observer = new IntersectionObserver(callback, {
        root: null,
        rootMargin: "10px 10px",
        threshold: 0.2
      });
    }
    this.$refs.intersectedPost.$notifyInView = () => {
      this.$emit("inView");
      bus.$emit("getCurrentPost", this.currentPost);
    };
    this.$refs.intersectedPost.onload = () => {
      this.loaded = true;
    };
    observer.observe(this.$refs.intersectedPost);
    // open urls in new tab
    let contents = document.getElementsByClassName("content");

    for (let index = 0; index < contents.length; index++) {
      let element = contents[index];
      let a = element.getElementsByTagName("a");
      let img = element.getElementsByTagName("img");
      let h2 = element.getElementsByTagName("h2");
      for (var i = 0; i < a.length; i++) {
        a[i].setAttribute("target", "_blank");
      }
      for (let k = 1; k < h2.length; k += 2) {
        let ins = document.createElement("ins");
        ins.setAttribute("class", "adsbygoogle");
        ins.setAttribute("style", "display:block");
        ins.setAttribute("data-ad-client", "ca-pub-2440369596668454");
        ins.setAttribute("data-ad-slot", "3000620474");
        ins.setAttribute("data-ad-format", "auto");
        ins.setAttribute("data-full-width-responsive", "true");
        function insertAfter(newElement, referenceElement) {
          referenceElement.parentNode.insertBefore(
            newElement,
            referenceElement.nextSibling
          );
        }
        insertAfter(ins, h2[k]);
      }
      for (let j = 0; j < img.length; j++) {
        let p = document.createElement("p");
        let title = img[j].getAttribute("alt");
        p.innerHTML = title;
        function insertAfter(newElement, referenceElement) {
          referenceElement.parentNode.insertBefore(
            newElement,
            referenceElement.nextSibling
          );
        }
        insertAfter(p, img[j]);
      }
    }
  },
  props: {
    title: String,
    category: String,
    img: String,
    author: Object,
    date: String,
    postId: String,
    currentPost: Object,
    excerpt: String,
    userName: String,
    userBio: String
  }
};
</script>

<style lang="stylus">
.fade
  animation-name: fade
  animation-duration: 2s

@keyframes fade
  from
    opacity: 0

  to
    opacity: 1

.appSingle
  position: relative
  &-category
    color: #0088c6;
    font-size: 20px;
    font-weight: bold;
  &-user
    margin-bottom: 100px
    &-header
      display: flex
      align-items: center
      margin-bottom: 20px

      img
        margin-left: 10px
    p
      font-size: 16px
      color: #8697AE
      margin-right: 30px

  &-thumb
    margin-top: 5px
    text-align : center

    img
      width: 100%
      height: auto
      display: block
      max-width: 100%
      height: 350px
      object-fit: contain
      @media only screen and (max-width: 600px)
        height: auto

    .imgTitle
      font-size :13px
      display : block
      margin-top : 3px

  &-header
    padding: 0 0
    margin-bottom: 1rem

  &-content
    padding-top: 60px
    padding-bottom: 20px
    font-size: 18px
    line-height: 30px

  &-meta
    display: flex
    flex-wrap: wrap
    list-style-type: none
    margin: 20px -20px 0

    li
      margin: 0 20px

  &-author
    display: flex

    &-thumb
      width: 50px !important
      height: 50px !important
      border-radius: 333em
      flex: 0 0 50px
      margin-left: 10px
      background-repeat: no-repeat
      background-size: cover
      background-position: center center

      img
        border-radius: 50%
  &-excerpt
    margin-top: 1rem
    font-weight: bold;
    font-size: 18px;
  &-title
    font-size: 2em !important;
.content
  position: relative
  font-size: 16px
  a
    color: #0088c6;
    text-decoration: underline;
  img
    max-height: 300px
  h3:not(:first-child)
    margin-top: 0em !important;
  h1:not(:first-child)
    margin-top: 0em !important;
  h2:not(:first-child)
    margin-top: 0em !important;
  ul  li  p
    font-size: 1em;
  p:has(img)
    text-align : center
    img
      width: 100%
      height: auto
      display: block
      max-width: 100%
      height: 350px
      object-fit: contain
      @media only screen and (max-width: 600px)
        height: auto

    p
      display : none
      &:first-of-type
        display : block
        margin-top : 3px
        font-size : 13px
</style>
