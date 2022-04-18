<template>
  <div class="content">
    <ls-overline>{{ $t("card-application") }}</ls-overline>
    <ls-caption>
      {{ $t("please-fill-in-the-form-") }}
    </ls-caption>
    <v-card class="mt-n1 vcard" elevation="2">
      <v-card-text>
        <v-select
          v-model="account"
          class="sel-account"
          :label="$t('account')"
          :items="accounts"
          :disabled="disabled"
          :menu-props="{ offsetY: true }"
          attach=".sel-account"
        ></v-select>
        <v-select
          v-model="cardType"
          class="sel-card"
          :label="$t('card')"
          :items="cardTypes"
          :disabled="disabled"
          :menu-props="{ offsetY: true, maxHeight: 200 }"
          attach=".sel-card"
        ></v-select>
        <v-select
          v-model="limit"
          class="sel-limit"
          :label="$t('limit')"
          :items="limits"
          :disabled="disabled"
          :menu-props="{ offsetY: true, maxHeight: 200 }"
          attach=".sel-limit"
        ></v-select>
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
              @click="send()"
              :disabled="disabled"
              >{{ $t("send") }}</v-btn
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
      account: "",
      accounts: this.$store.state.accounts,
      cardType: "",
      cardTypes: this.$store.state.cardTypes,
      limit: "",
      limits: this.$store.state.limits,
      initAcount: null,
      initCardType: null,
      initLimit: null,
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
    this.$store.commit("setCurrentPage", "card-application");
    this.$store.commit("enableAllMenuItems");
    this.$store.commit("disableMenuItem", 3);
    // save initial settings
    this.initAccount = this.account;
    this.initCardType = this.cardType;
    this.initLimit = this.limit;
  },

  destroyed() {
    // console.log("destroyed");
    this.$store.commit("enableMenuItem", 3);
  },

  methods: {
    setAlertType(alertType) {
      if (alertType === "success") {
        this.alertType = "success";
        this.alertText = this.$t("application-sent-success");
        this.alertIcon = "mdi-information-outline";
      } else if (alertType === "warning") {
        this.alertType = "warning";
        this.alertText = this.$t("all-three-inputs");
        this.alertIcon = "mdi-alert-outline";
      }
    },

    haveSettingsChanged() {
      // console.log("hinitCardTypeaveSettingsChanged");
      if (this.initAccount !== this.account) return true;
      if (this.initCardType !== this.cardType) return true;
      if (this.initLimit !== this.limit) return true;
      return false;
    },

    cancel() {
      // console.log("cancel");
      if (this.$store.state.wantsConfirmations && this.haveSettingsChanged()) {
        this.dialog = true;
      } else {
        this.$router.push("home");
      }
    },

    confirm(yesNo) {
      // console.log("confirm::yesNo=", yesNo);
      this.dialog = false;
      if (yesNo === "yes") {
        this.account = this.initAccount;
        this.$router.push("home");
      }
    },

    isValidInput() {
      if (this.account && this.cardType && this.limit) return true;
      return false;
    },

    send() {
      // console.log("send");
      if (this.isValidInput()) {
        this.disabled = true;
        if (this.$store.state.wantsNotifications) {
          this.setAlertType("success");
          this.alert = true;
          setTimeout(this.closeAlertAndLeave, 2000);
        } else {
          this.$router.push("home");
        }
      } else {
        this.setAlertType("warning");
        this.alert = true;
        setTimeout(this.closeAlertAndStay, 3000);
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
      this.account = this.initAccount;
      this.cardType = this.initCardType;
      this.limit = this.initLimit;
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
.vcard {
  width: 100%;
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
