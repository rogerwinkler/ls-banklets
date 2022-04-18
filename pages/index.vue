<template>
  <div class="content">
    <v-card width="400" class="ls-auto mt-5" elevation="6">
      <v-card-text>
        {{ $t("select-lang") }}
        <v-select
          v-model="locale"
          class="sel-lang"
          :items="locales"
          item-text="locale"
          item-value="abbr"
          return-object
          single-line
          @change="localeChanged(locale.abbr)"
          :menu-props="{ offsetY: true }"
          attach=".sel-lang"
        ></v-select>
      </v-card-text>
      <v-card-title>
        <h1 class="display-1">Login</h1>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="username"
          class="username"
          :label="$t('username')"
          required
          prepend-icon="mdi-account-circle"
        ></v-text-field>
        <v-text-field
          v-model="password"
          class="password"
          :type="showPassword ? 'text' : 'password'"
          :label="$t('password')"
          required
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="btn-group">
        <div class="rb">
          <v-btn
            color="info"
            disabled
            class="primary--text btn-register"
            elevation="6"
            >{{ $t("register") }}</v-btn
          >
        </div>
        <div class="lb">
          <v-btn
            color="primary"
            class="info--text btn-login"
            @click="login"
            elevation="6"
            >{{ $t("login") }}</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
    <v-alert
      class="alert"
      :value="alert"
      elevation="10"
      icon="mdi-alert"
      type="error"
      transition="scale-transition"
    >
      {{ $t("enter-username-pwd") }}
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "test",
      password: "test",
      locale: this.$store.state.locale,
      locales: this.$store.state.locales,
      showPassword: false,
      alert: false
    };
  },

  // computed: {
  //   locale() {
  //     return this.$store.state.locale;
  //   }
  // },

  mounted() {
    // console.log("mounted");
    this.$store.commit("setCurrentPage", "login");
    this.$store.commit("disableAllMenuItems");
    this.$store.commit("translateMenuItems");
    this.localeChanged(this.$store.state.locale.abbr);
  },

  methods: {
    localeChanged(localeAbbr) {
      // console.log("localeChanged::localeAbbr=", localeAbbr);
      this.$i18n.locale = localeAbbr;
      this.$store.commit(
        "setLocale",
        this.$store.state.locales.find(el => el.abbr === localeAbbr)
      );
      this.$store.commit("translateMenuItems");
    },

    login() {
      // console.log("login");
      if (this.username === "test" && this.password === "test") {
        this.$store.commit("setUser", "test");
        this.$router.push("home");
      } else {
        this.alert = true;
        setTimeout(this.closeAlert, 4000);
      }
    },

    closeAlert() {
      // console.log("closeAlert");
      this.alert = false;
    }
  }
};
</script>

<style scoped>
.content {
  position: relative;
}
.alert {
  position: absolute;
  width: 290px;
  top: 0;
  left: 50%;
  margin: 0 0 0 -145px;
}
.btn-register,
.btn-login {
  width: 80%;
  margin: 10%;
}
.btn-group {
  display: grid;
  grid-template: "rb lb" 100%;
}
.rb {
  grid-area: rb;
}
.lb {
  grid-area: lb;
}
</style>
