import colors from "vuetify/es5/util/colors";

export default {
  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000"
    // baseUrl: process.env.BASE_URL || "https://www.logsem.com/apps/ls-banklets/"
  },

  router: {
    // base: process.env.ROUTER_BASE || "/"
    base: process.env.ROUTER_BASE || "/apps/ls-banklets/"
  },

  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s - ls-banklets",
    title: "ls-banklets",
    meta: [
      { name: "build", content: "24" },
      { charset: "utf-8" },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: "viewport",
        content:
          "initial-scale=1, user-scalable=no, width=device-width, height=device-height, viewport-fit=cover"
      },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      {
        rel: "icon",
        type: "image/svg",
        href: "/img/logsem-cube.svg"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/i18n", "~/plugins/vrcode"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa"
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    // default material colors...
    // theme: {
    //   themes: {
    //     light: {
    //       primary: colors.purple,
    //       secondary: colors.grey.darken1,
    //       accent: colors.shades.black,
    //       error: colors.red.accent3
    //     },
    //     dark: {
    //       primary: colors.blue.lighten3
    //     }
    //   }
    //   // options: { customProperties: true, variations: false }
    // }

    // ls color scheme...
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#002d82",
          secondary: "#c6eefa",
          accent: "#c3ef6f",
          info: "#a7e0f1",
          warning: "#fff600",
          error: "#ff7803",
          success: "#d5ed75"
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
