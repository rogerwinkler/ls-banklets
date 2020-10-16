<template>
  <div class="container">
    <div class="content">
      <div class="div-logo">
        <Logo />
        <h1 class="title">
          Banklets
        </h1>
      </div>
      <div class="div-lang">{{ $t("select-lang") }}:</div>
      <div class="div-input-lang">
        <select id="select-lang" name="lang" @change="changeLang">
          <option id="de" value="de">Deutsch</option>
          <option id="en" value="en">English</option>
          <option id="fr" value="fr">Français</option>
          <option id="it" value="it">Italiano</option>
        </select>
      </div>
      <div class="div-user">
        <label class="label-username">{{ $t("username") }}:</label>
      </div>
      <div class="div-input-user">
        <input id="input-username" type="Text" />
        <button class="btn-clear-input" @click="clearUsername">
          <img
            class="img-clear-input"
            src="img/270-cancel-circle-blue.svg"
            alt="Clear input field"
          />
        </button>
      </div>
      <div class="div-pwd">
        <label class="label-div-pwd">{{ $t("password") }}:</label>
      </div>
      <div class="div-input-pwd">
        <input id="input-pwd" type="Password" />
        <button class="btn-clear-input" @click="clearPwd">
          <img
            class="img-clear-input"
            src="img/270-cancel-circle-blue.svg"
            alt="Clear input field"
          />
        </button>
      </div>
      <div class="div-login">
        <button class="cta full-screen" @click="login">Login</button>
      </div>
    </div>
    <notifications position="top center" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$store.state.locale
    };
  },

  // props: ["slug", "attributes", "target"],

  mounted() {
    // console.log("index.vue::mounted");
    document.addEventListener("keypress", this.handleKeyPressEvent);
    const lang = document.getElementById("select-lang");
    lang.value = this.lang;
  },

  destroyed() {
    // console.log("index.vue::destroyed");
    document.removeEventListener("keypress", this.handleKeyPressEvent);
  },

  methods: {
    changeLang() {
      // console.log("index.vue::changeLang");
      const lang = document.getElementById("select-lang");
      this.$store.commit("setLocale", lang.value);
      this.$i18n.locale = lang.value;
    },

    clearUsername() {
      // console.log("index.vue::clearUsername");
      const username = document.getElementById("input-username");
      username.value = "";
    },

    clearPwd() {
      // console.log("index.vue::clearPassword");
      const pwd = document.getElementById("input-pwd");
      pwd.value = "";
    },

    login() {
      // console.log("login");
      const username = document.getElementById("input-username");
      const pwd = document.getElementById("input-pwd");
      if (
        username &&
        username.value === "test" &&
        pwd &&
        pwd.value === "test"
      ) {
        this.$store.commit("setUser", "test");
        this.$router.push("/main");
      } else {
        this.$notify({
          type: "error",
          title: this.$t("error"),
          text: this.$t("enter-username-pwd"),
          duration: 4000
        });
      }
    },

    handleKeyPressEvent(e) {
      // console.log("index.vue::handleKeyPressEvent");
      // console.log(e.key);
      // console.log(document.activeElement.tagName);
      if (
        e &&
        e.key === "Enter" &&
        document.activeElement.tagName === "INPUT"
      ) {
        this.login();
      }
    }
  }
};
</script>

<style scoped>
.container {
  /* margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; */
}

.content {
  display: grid;
  grid-template:
    "div-logo" 26%
    "div-lang" 8%
    "div-input-lang" 8%
    "div-user" 8%
    " div-input-user" 8%
    "div-pwd" 8%
    "div-input-pwd" 8%
    "div-login" 26%;
  grid-template-columns: 80%;
}

.div-logo {
  grid-area: div-logo;
}

.div-lang {
  gird-area: div-lang;
  text-align: left;
  margin-top: 20px;
}

.div-input-lang {
  grid-area: div-input-lang;
  text-align: left;
  display: flex;
}

.div-user {
  grid-area: div-user;
  text-align: left;
  margin-top: 20px;
}

.div-input-user {
  grid-area: div-input-user;
  text-align: left;
  display: flex;
}

.div-pwd {
  grid-area: div-pwd;
  text-align: left;
  margin-top: 20px;
}

.div-input-pwd {
  grid-area: div-input-pwd;
  text-align: left;
  display: flex;
}

#select-lang,
#input-username,
#input-pwd {
  width: 80%;
  height: 40px;
  margin-top: 6px;
  font-size: 20px;
  color: var(--txt-color);
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  background-color: white;
}

.div-login {
  grid-area: div-login;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 70px;
  color: var(--secondary-color);
  letter-spacing: 1px;
}

.btn-clear-input {
  background-color: transparent;
  border: none;
  font-size: 20px;
}

.img-clear-input {
  width: 25px;
  margin-top: 10px;
}

.cta {
  margin-top: 30px;
  padding: 5px 10px 5px 10px;
  background-color: var(--tertiary-color);
  color: var(--primary-color);
  font-weight: 800;
  font-size: 50px;
  border: none;
  /* border: 4px solid var(--mx-dark-blue); */
  border-radius: 20px;
}
</style>
