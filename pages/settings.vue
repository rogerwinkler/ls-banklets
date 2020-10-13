<template>
  <div class="container">
    <div class="nav">
      <Nav :title="$t('settings')" backbutton="true" />
    </div>
    <div class="content">
      <div class="bp-key">BP Key: {{ bpKey }}</div>
      <div class="lang">
        {{ $t("select-lang") }}:
        <div class="div-radio">
          <input
            v-if="locale === 'de'"
            type="radio"
            id="de"
            class="radio"
            name="lang"
            value="de"
            checked
          />
          <input
            v-else
            type="radio"
            id="de"
            class="radio"
            name="lang"
            value="de"
          />
          <label for="de" class="radio-label">Deutsch</label>
          <br />
          <input
            v-if="locale === 'en'"
            type="radio"
            id="en"
            class="radio"
            name="lang"
            value="en"
            checked
          />
          <input
            v-else
            type="radio"
            id="en"
            class="radio"
            name="lang"
            value="en"
          />
          <label for="en" class="radio-label">English</label>
          <br />
          <input
            v-if="locale === 'fr'"
            type="radio"
            id="fr"
            class="radio"
            name="lang"
            value="fr"
            checked
          />
          <input
            v-else
            type="radio"
            id="fr"
            class="radio"
            name="lang"
            value="fr"
          />
          <label for="fr" class="radio-label">Français</label>
          <br />
          <input
            v-if="locale === 'it'"
            type="radio"
            id="it"
            class="radio"
            name="lang"
            value="it"
            checked
          />
          <input
            v-else
            type="radio"
            id="it"
            class="radio"
            name="lang"
            value="it"
          />
          <label for="it" class="radio-label">Italiano</label>
        </div>
      </div>
      <div class="conf">
        <input
          v-if="confirmations"
          id="show-conf"
          type="checkbox"
          value="show-conf"
          name="show-conf"
          checked
        />
        <input
          v-else
          id="show-conf"
          type="checkbox"
          value="show-conf"
          name="show-conf"
        />
        <label for="show-conf" class="conf-notif">
          {{ $t("show-confirmations") }}
        </label>
      </div>
      <div class="notif">
        <input
          v-if="notifications"
          id="show-notif"
          type="checkbox"
          value="show-notif"
          name="show-notif"
          checked
        />
        <input
          v-else
          id="show-notif"
          type="checkbox"
          value="show-notif"
          name="show-notif"
        />
        <label for="show-notif" class="conf-notif">
          {{ $t("show-notifications") }}
        </label>
      </div>
      <div class="cb">
        <button class="btn-normal" @click="cancel">
          {{ $t("cancel") }}
        </button>
      </div>
      <div class="sb">
        <button class="btn-default" @click="save">
          {{ $t("save") }}
        </button>
      </div>
      <div class="logo">
        <Logo />
        <h1 class="title">
          Banklets
        </h1>
      </div>
    </div>
    <notifications position="bottom center" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      bpKey: this.$store.state.bpKey,
      locale: this.$store.state.locale,
      confirmations: this.$store.state.confirmations,
      notifications: this.$store.state.notifications
    };
  },

  methods: {
    hasInputChanged() {
      if (!document.getElementById(this.locale).checked) return true;
      if (document.getElementById("show-conf").checked !== this.confirmations)
        return true;
      if (document.getElementById("show-notif").checked !== this.notifications)
        return true;
      return false;
    },

    cancel() {
      // console.log("settings.vue::cancel");
      if (this.$store.state.confirmations && this.hasInputChanged()) {
        this.$confirm({
          message: this.$t("confirm-cancel"),
          button: {
            no: this.$t("no"),
            yes: this.$t("yes")
          },
          callback: confirm => {
            if (confirm) {
              history.back();
            }
          }
        });
      } else {
        history.back();
      }
    },

    save() {
      // console.log("settings.vue::save");
      if (this.hasInputChanged()) {
        const en = document.getElementById("en");
        const fr = document.getElementById("fr");
        const it = document.getElementById("it");
        const conf = document.getElementById("show-conf");
        const notif = document.getElementById("show-notif");
        let lang = "de"; // default
        if (en.checked) lang = "en";
        if (fr.checked) lang = "fr";
        if (it.checked) lang = "it";
        this.$store.commit("setLocale", lang);
        this.$i18n.locale = lang;
        this.$store.commit("setConfirmations", conf.checked);
        this.$store.commit("setNotifications", notif.checked);
        this.$notify({
          type: "success",
          title: this.$t("success"),
          text: this.$t("settings-stored-success"),
          duration: 2000
        });
        setTimeout(() => {
          this.$router.push("main");
        }, 2000);
      } else {
        this.$notify({
          title: "Info",
          text: this.$t("no-changes-no-save"),
          duration: 2000
        });
      }
    }
  }
};
</script>

<style scoped>
#qr-code {
  visibility: hidden;
}

.container {
  z-index: 1;
}

.nav {
  z-index: 3;
}

.content {
  z-index: 2;
  margin-top: 20px;
  margin-left: 10%;
  margin-bottom: 20px;
  width: 80%;
  display: grid;
  grid-template:
    "bp-key bp-key" 8%
    "lang lang" 36%
    "conf conf" 8%
    "notif notif" 8%
    "cb sb" 14%
    "logo logo" 26%;
  grid-template-columns: 50% 50%;
  font-size: 20px;
}

.bp-key {
  grid-area: bp-key;
  text-align: left;
}

.lang {
  grid-area: lang;
  text-align: left;
}

.div-radio {
  border: 1px solid var(--secondary-color);
  border-radius: 10px;
  margin-top: 5px;
  padding-left: 20px;
}

.radio {
  margin-top: -8px;
  vertical-align: middle;
}

.radio-label {
  font-size: 25px;
  line-height: 1.3;
  margin-left: 10px;
  margin-top: 10px;
}

.conf {
  grid-area: conf;
  text-align: left;
  padding-top: 0px;
}

.notif {
  grid-area: notif;
  text-align: left;
}

.conf-notif {
  font-size: 20px;
}
.cb {
  grid-area: cb;
  padding-top: 0px;
  padding-right: 10px;
}

.sb {
  grid-area: sb;
  padding-top: 0px;
  padding-left: 10px;
}

.logo {
  grid-area: logo;
  padding-top: 20px;
}
</style>
