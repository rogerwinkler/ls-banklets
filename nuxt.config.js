export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "mx-banklets",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/css/global.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  // plugins: [{src: "~/plugins/vue-notification.js", ssr: false}],
  // plugins: ["~/plugins/vue-notification.client.js"],
  plugins: ["~/plugins/vue-notification.js", "~/plugins/vue-confirm-dialog", "~/plugins/vrcode"],
  // plugins: [{src: "~/plugins/vue-notification.js", mode: 'client'}],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa"
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
