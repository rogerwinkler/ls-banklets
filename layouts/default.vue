<template>
  <div class="cont">
    <v-app class="vapp">
      <v-app-bar absolute app color="primary" dark>
        <img
          id="img-logo"
          src="img/logo-mx-cubic-grey.svg"
          alt="Logo Monex AG"
          width="50px"
          height="30px"
        />
        <v-spacer />
        <v-toolbar-title>MX Banklets</v-toolbar-title>
        <v-spacer />
        <v-menu
          transition="slide-y-transition"
          v-model="shown"
          :close-on-click="true"
          :close-on-content-click="true"
          attach=".cont"
          nudge-right="130"
          nudge-bottom="100"
        >
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon class="mxnavicon" v-on="on" />
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click.stop="menuItemClicked(index)"
              :disabled="item.disabled"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-main>
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
      <v-footer
        class="vfooter"
        v-if="page === 'login'"
        absolute
        app
        color="primary"
        dark
        height="80px"
      >
        <v-spacer />
        <span
          >&copy; {{ new Date().getFullYear() }} Monex AG, Liechtenstein</span
        >
        <v-spacer />
      </v-footer>
      <v-footer
        v-else
        class="vfooter"
        style="justify-content: space-around;"
        absolute
        app
        color="primary"
        dark
        height="80px"
      >
        <div class="nav-icon">
          <hr :class="`hr ${page === 'home' ? '' : 'hidden'}`" />
          <v-icon
            :disabled="page === 'home'"
            class="secondary--text"
            size="30px"
            @click.stop="$router.push('home')"
            >mdi-home-outline</v-icon
          >
        </div>
        <div class="nav-icon">
          <hr :class="`hr ${page === 'qr-payment' ? '' : 'hidden'}`" />
          <v-icon
            :disabled="page === 'qr-payment'"
            class="secondary--text"
            size="30px"
            @click.stop="$router.push('qr-payment')"
            >mdi-qrcode</v-icon
          >
        </div>
        <div class="nav-icon">
          <hr :class="`hr ${page === 'card-admin' ? '' : 'hidden'}`" />
          <v-icon
            :disabled="page === 'card-admin'"
            class="secondary--text"
            size="30px"
            @click.stop="$router.push('card-admin')"
            >mdi-credit-card-multiple-outline</v-icon
          >
        </div>
        <div class="nav-icon">
          <hr :class="`hr ${page === 'card-application' ? '' : 'hidden'}`" />
          <v-icon
            :disabled="page === 'card-application'"
            class="secondary--text"
            size="30px"
            @click.stop="$router.push('card-application')"
            >mdi-credit-card-plus-outline</v-icon
          >
        </div>
        <div class="nav-icon">
          <v-icon
            class="secondary--text"
            size="30px"
            @click.stop="$router.push('/')"
            >mdi-logout</v-icon
          >
        </div>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shown: false
    };
  },

  computed: {
    page() {
      return this.$store.state.currentPage;
    },

    items() {
      return this.$store.state.menuItems;
    }
  },

  mounted() {
    this.$store.commit("translateMenuItems");
  },

  methods: {
    menuItemClicked(itemNo) {
      // console.log("menuItemClicked::itemNo=", itemNo);

      switch (itemNo) {
        case 0:
          this.$router.push("home");
          break;
        case 1:
          this.$router.push("qr-payment");
          break;
        case 2:
          this.$router.push("card-admin");
          break;
        case 3:
          this.$router.push("card-application");
          break;
        case 4:
          this.$router.push("settings");
          break;
        case 5:
          this.$router.push("quick-tour");
          break;
        case 6:
          this.$router.push("about");
          break;
        case 7:
          this.$router.push("logout");
          this.$router.push("/");
          break;
        default:
          break;
      }
      this.shown = false;
    }
  }
};
</script>

<style lang="scss">
.cont {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  height: calc(100vh + 30px);
  background: #cccccc;
}
.vapp {
  border: 12px solid #777777;
  border-radius: 16px;
  width: 380px;
  height: 700px; // 676 + 2x12px (border-width)
  position: relative;
}
.vfooter {
  position: absolute;
  top: 596px; // 676 - 80 = 550
  left: 0;
}
.nav-icon {
  display: flex;
  flex-direction: column;
}
.hidden {
  visibility: hidden;
}
.hr {
  border-color: $mx-success;
  margin-bottom: 4px;
}
</style>
