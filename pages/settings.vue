<template>
  <div class="content">
    <mx-overline>{{ $t("settings") }}</mx-overline>
    <mx-caption>
      {{ $t("select-your-preferences") }}
    </mx-caption>

    <v-card class="mt-n1" elevation="2">
      <v-card-text>
        {{ $t("select-lang") }}
        <v-select
          v-model="locale"
          class="inp inp-select"
          :items="locales"
          item-text="locale"
          item-value="abbr"
          return-object
          single-line
          @change="localeChanged(locale.abbr)"
          :disabled="disabled"
          :menu-props="{ offsetY: true }"
          attach=".inp-select"
        ></v-select>
        <v-checkbox
          v-model="wantsConfirmations"
          :label="$t('show-confirmations')"
          :disabled="disabled"
        ></v-checkbox>
        <v-checkbox
          v-model="wantsNotifications"
          :label="$t('show-notifications')"
          :disabled="disabled"
        ></v-checkbox>
        <div class="btn-group">
          <div class="cb">
            <v-btn
              id="btn-cancel"
              class="btn-cancel"
              text
              @click="cancel()"
              :disabled="disabled"
              >{{ $t("cancel") }}</v-btn
            >
          </div>
          <div class="sb">
            <v-btn
              id="btn-save"
              color="primary"
              class="primary--text btn-save"
              text
              @click="save()"
              :disabled="disabled"
              >{{ $t("save") }}</v-btn
            >
          </div>
          <div class="rb">
            <v-btn
              id="btn-reset"
              class="btn-reset"
              text
              @click="reset()"
              :disabled="disabled"
              >{{ $t("reset") }}</v-btn
            >
          </div>
        </div>
      </v-card-text>
    </v-card>
    <!-- confirmation dialog -->
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          {{ $t("confirmation") }}
        </v-card-title>
        <v-card-text>
          {{ $t("confirm-cancel") }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="confirm('no')">
            {{ $t("no") }}
          </v-btn>
          <v-btn color="green darken-1" text @click="confirm('yes')">
            {{ $t("yes") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end confirmation dialog -->
    <!-- alert dialog -->
    <v-alert
      :value="alert"
      class="alert primary--text"
      elevation="10"
      :type="alertType"
      transition="scale-transition"
    >
      <v-icon slot="prepend" class="alert-icon primary--text">
        {{ alertIcon }}
      </v-icon>
      {{ alertText }}
    </v-alert>
    <!-- end alert dialog -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: this.$store.state.locale,
      locales: this.$store.state.locales,
      wantsConfirmations: this.$store.state.wantsConfirmations,
      wantsNotifications: this.$store.state.wantsNotifications,
      initLocale: null,
      initWantsConfirmations: null,
      initWantsNotifications: null,
      disabled: false,
      dialog: false,
      alert: false,
      alertType: "success",
      alertText: this.$t("changes-saved-success"),
      alertIcon: "mdi-information-outline"
    };
  },

  mounted() {
    // console.log("mounted");
    this.$store.commit("setCurrentPage", "settings");
    this.$store.commit("enableAllMenuItems");
    this.$store.commit("disableMenuItem", 4);

    // save initial settings
    this.initLocale = this.locale;
    this.initWantsConfirmations = this.wantsConfirmations;
    this.initWantsNotifications = this.wantsNotifications;
  },

  destroyed() {
    // console.log("destroyed");
    this.$store.commit("enableMenuItem", 4);
  },

  methods: {
    setAlertType(alertType) {
      if (alertType === "success") {
        this.alertType = "success";
        this.alertText = this.$t("changes-saved-success");
        this.alertIcon = "mdi-information-outline";
      } else if (alertType === "warning") {
        this.alertType = "warning";
        this.alertText = this.$t("no-changes-no-save");
        this.alertIcon = "mdi-alert-outline";
      }
    },

    haveSettingsChanged() {
      // console.log("haveSettingsChanged");
      if (this.initLocale.abbr !== this.locale.abbr) return true;
      if (this.initWantsConfirmations !== this.wantsConfirmations) return true;
      if (this.initWantsNotifications !== this.wantsNotifications) return true;
      return false;
    },

    localeChanged(localeAbbr) {
      // console.log("localeChanged::localeAbbr=", localeAbbr);
      this.$i18n.locale = localeAbbr;
      this.$store.commit(
        "setLocale",
        this.$store.state.locales.find(el => el.abbr === localeAbbr)
      );
      this.$store.commit("translateMenuItems");
    },

    cancel() {
      // console.log("cancel");
      if (this.$store.state.wantsConfirmations && this.haveSettingsChanged()) {
        this.dialog = true;
      } else {
        this.confirm("yes");
      }
    },

    confirm(yesNo) {
      // console.log("confirm::yesNo=", yesNo);
      this.dialog = false;
      if (yesNo === "yes") {
        this.localeChanged(this.initLocale.abbr);
        this.wantsConfirmations = this.initWantsConfirmations;
        this.wantsNotifications = this.initWantsNotifications;
        this.$router.push("home");
      }
    },

    save() {
      // console.log("save");
      if (this.haveSettingsChanged()) {
        this.disabled = true;
        this.$store.commit("setWantsConfirmations", this.wantsConfirmations);
        this.$store.commit("setWantsNotifications", this.wantsNotifications);
        if (this.$store.state.wantsNotifications) {
          this.setAlertType("success");
          this.alert = true;
          setTimeout(this.closeAlertAndLeave, 2000);
        } else {
          this.$router.push("home");
        }
      } else {
        if (this.$store.state.wantsNotifications) {
          this.setAlertType("warning");
          this.alert = true;
          setTimeout(this.closeAlertAndStay, 2000);
        } else {
          this.$router.push("home");
        }
      }
    },

    closeAlertAndLeave() {
      // console.log("closeAlertAndLeave");
      this.alert = false;
      this.$router.push("home");
    },

    closeAlertAndStay() {
      // console.log("closeAlertAndStay");
      this.alert = false;
    },

    reset() {
      this.locale = this.initLocale;
      this.localeChanged(this.locale.abbr);
      this.wantsConfirmations = this.initWantsConfirmations;
      this.wantsNotifications = this.initWantsNotifications;
    }
  }
};
</script>

<style scoped>
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
}
.inp {
  width: 100%;
}
.inp-select {
  margin-top: 0px;
}
.alert-icon {
  padding: 0 1rem 0 0;
}
.alert {
  position: absolute;
  width: 290px;
  top: 40px;
  left: 50%;
  margin: 0 0 0 -145px;
}
#btn-cancel,
#btn-save,
#btn-reset {
  height: 30px;
}
.btn-cancel,
.btn-reset {
  color: #666666;
}
.btn-group {
  display: grid;
  grid-template:
    "cb sb" 50%
    "rb ee" 50%;
}
.cb {
  grid-area: cb;
}
.sb {
  grid-area: sb;
}
.rb {
  grid-area: rb;
}
</style>
