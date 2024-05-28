const { getPosts } = require("./graphql/query/instantPosts");
const axios = require("axios");

const modifyHtml = html => {
  // Add amp-custom tag to added CSS
  html = html.replace(/<style data-vue-ssr/g, "<style amp-custom data-vue-ssr");
  // Remove every script tag from generated HTML
  html = html.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
  // Add AMP script before </head>
  const ampScript =
    '<script async src="https://cdn.ampproject.org/v0.js"></script>';
  html = html.replace("</head>", ampScript + "</head>");
  return html;
};

module.exports = {
  // render: {
  //   resourceHints: false
  // },
  // hooks: {
  //   // This hook is called before generatic static html files for SPA mode
  //   'generate:page': page => {
  //     if (/^\/amp\//gi.test(page.route)) {
  //       page.html = modifyHtml(page.html);
  //     }
  //   },
  //   // This hook is called before rendering the html to the browser
  //   'render:route': (url, page, { req, res }) => {
  //     if (/^\/amp\//gi.test(url)) {
  //       page.html = modifyHtml(page.html);
  //     }
  //   }
  // },
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: "إقتصاد",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "keywords", content: "ektesad, اقتصاد" },
      { property: "fb:pages", content: "2224139551153524" },
      { name: "google-adsense-account", content: "ca-pub-4066044653984909" },
      {
        hid: "description",
        name: "description",
        content:
          "منصة اقتصاد هي مبادرة مالية تهدف لتحسين قدرة المجتمع على ادارة الأموال ونشر الوعي المالي، تقدم لك نصائح وتحليلات حول أساليب الاستثمار والادخار."
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      // {
      //   src: "notification.js"
      // },
      {
        "data-ad-client": "ca-pub-4066044653984909",
        // src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
        src:
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4066044653984909",
        async: true
      },
      {
        "custom-element": "amp-auto-ads",
        src: "https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js",
        async: true
      }
      // {
      //   src:
      //     "//www.topcreativeformat.com/5fea176892ebdd849a53fd0a1dd4c837/invoke.js",
      //   type: "text/javascript",
      //   async: true
      // }
    ]
  },

  publicRuntimeConfig: {
    API_BASE: process.env.API_BASE
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#FFFFFF" },

  /*
   ** Global CSS
   */
  css: ["swiper/dist/css/swiper.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/globals",
    { src: "~/plugins/apexcharts.js", mode: "client" },
    { src: "~/plugins/swiper.js", mode: "client" },
    "~/plugins/apollo.js",
    "~/plugins/axios",
    "~/plugins/vee-validate.js",
    "~/plugins/vue-social-sharing.js"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/style-resources",
    "@nuxtjs/dotenv",
    "@nuxtjs/pwa",
    "@nuxtjs/google-adsense",
    "@nuxtjs/google-analytics",
    "@nuxtjs/feed",
    "@nuxtjs/google-analytics"
  ],
  feed: [
    {
      path: "/feed",
      async create(feed) {
        const api = axios.create({
          baseURL: `https://api.ektesad.com`
        });

        const {
          data: {
            data: { Posts }
          }
        } = await api.post("/graphql", {
          query: getPosts
        });

        Posts.values.forEach(post => {
          const url = `${process.env.FRONTEND_BASE}/opinion/${post.slug}`;
          feed.addItem({
            title: post.title,
            link: url,
            id: post.id,
            published: new Date(post.createdAt),
            author: [
              {
                name: post.userName,
                email: post.userEmail
              }
            ],
            description: post.body ? `${post.body.slice(0, 100)}...` : "فارغ",
            content: `<html lang="ar" dir="rtl" prefix="op: http://media.facebook.com/op#">
                      <head> <meta charset="utf-8">
                        <link rel="canonical" href="${
                          process.env.FRONTEND_BASE
                        }/opinion/${post.slug}">
                        <meta property="op:markup_version" content="v1.0">
                      </head>
                      <body>
                        <article>
                          <header>
                            <img src="${
                              post.featureImage
                                ? `${process.env.API_BASE}${post.featureImage.url}`
                                : ""
                            }" alt="${post.slug}"/>
                           </header>
                            <p>${post.body ? post.body : "فارغ"}</p>
                        </article>
                      </body>
                    </html>`
          });
        });

        feed.options = {
          title: "Ektesad",
          link: "https://ektesad.com/feed.xml",
          language: "ar",
          description: "Ektesad blog"
        };

        // await API call with our posts data
      },
      cacheTime: 1000 * 60 * 15,
      type: "rss2"
    }
  ],
  googleAnalytics: {
    id: "UA-214443957-1"
  },
  /*
   ** Global variables
   */
  styleResources: {
    stylus: "~assets/css/global.styl"
  },
  "google-analytics": {
    id: "UA-129370517-1"
  },
  "google-adsense": {
    id: "ca-pub-4066044653984909"
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ["axios", "vee-validate"],
    optimizeCSS: true,
    minify: {
      minifyCSS: true,
      minifyJS: true
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
