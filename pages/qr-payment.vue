<template>
  <div class="content">
    <mx-overline>{{ $t("qr-payment") }}</mx-overline>
    <v-card class="mb-2 vcard" elevation="2">
      <v-card-text>
        <v-select
          v-model="account"
          class="inp inp-select"
          :label="$t('account')"
          :items="accounts"
          :disabled="disabled"
          :menu-props="{ offsetY: true }"
          attach=".inp-select"
        ></v-select>
        <v-text-field
          v-model="amount"
          class="inp"
          :label="$t('amount')"
          type="number"
          clearable
          :disabled="disabled"
        ></v-text-field>
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
              @click="order()"
              :disabled="disabled"
              >{{ $t("order") }}</v-btn
            >
          </div>
          <div class="rb">
            <v-btn
              id="btn-reset"
              class="btn-reset"
              text
              @click="reset()"
              :disabled="resetDisabled"
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
    <!-- qr code -->
    <vrcode
      id="qr-code"
      :class="hidden ? 'qr-code hidden' : 'qr-code'"
      :download="{
        text: $t('download'),
        filename: 'qr-code-payment.png',
        visible: true,
        type: 'image/png',
        style: 'font-size: 14px; text-decoration: none; letter-spacing: 1.2px;'
      }"
      value="A Vue component to generate QR Code and download."
      :options="{
        size: qrSize,
        level: 'Q',
        padding: 0
      }"
    ></vrcode>
    <!-- end qr code -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      accounts: this.$store.state.accounts,
      amount: null,
      initAcount: null,
      initAmount: null,
      hidden: true,
      disabled: false,
      resetDisabled: false,
      dialog: false,
      alert: false,
      alertType: "success",
      alertText: this.$t("changes-saved-success"),
      alertIcon: "mdi-information-outline",
      qrSize: 160,
      interval: null
    };
  },

  mounted() {
    // console.log("mounted");
    this.$store.commit("setCurrentPage", "qr-payment");
    this.$store.commit("enableAllMenuItems");
    this.$store.commit("disableMenuItem", 1);
    // save initial settings
    this.initAccount = this.account;
    this.initAmount = this.amount;
    document.addEventListener("keyup", this.handleKeyUp);
  },

  destroyed() {
    // console.log("destroyed");
    this.$store.commit("enableMenuItem", 1);
    document.removeEventListener("keyup", this.handleKeyUp);
  },

  methods: {
    handleKeyUp(e) {
      // console.log("handleKeyUp::e.target=", e);
      if (e.key === "Enter") {
        this.order();
      }
    },

    animateQR() {
      this.qrSize = 0;
      this.increment = 1;
      this.interval = setInterval(this.incrementSize, 4);
    },

    incrementSize() {
      if (this.qrSize > 150) {
        clearInterval(this.interval);
        this.qrSize = 160;
      } else {
        this.qrSize += this.increment;
        this.increment += 1;
      }
    },

    setAlertType(alertType) {
      if (alertType === "success") {
        this.alertType = "success";
        this.alertText = this.$t("qr-payment-order-success");
        this.alertIcon = "mdi-information-outline";
      } else if (alertType === "warning") {
        this.alertType = "warning";
        this.alertText = this.$t("order-qr-payment");
        this.alertIcon = "mdi-alert-outline";
      } else if (alertType === "error") {
        this.alertType = "error";
        this.alertText = this.$t("amount-not-a-number");
        this.alertIcon = "mdi-alert-outline";
      }
    },

    haveSettingsChanged() {
      // console.log("haveSettingsChanged");
      if (this.initAccount !== this.account) return true;
      if (this.initAmount !== this.amount) return true;
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
        this.amount = this.initAmount;
        this.$router.push("home");
      }
    },

    isAmountValid() {
      // console.log("this.amount=", this.amount);
      if (Number.isNaN(this.amount)) return false;
      if (this.amount < 0) return false;
      if (this.amount.indexOf("e") >= 0) return false;
      return true;
    },

    hasAccountAndAmount() {
      if (this.account && this.amount) return true;
      return false;
    },

    order() {
      // console.log("order");
      // console.log("this.account=", this.account);
      // console.log("this.amount=", this.amount);
      if (!this.hasAccountAndAmount()) {
        this.setAlertType("warning");
        this.alert = true;
        setTimeout(this.closeAlertAndStay, 3000);
      } else {
        if (!this.isAmountValid()) {
          this.setAlertType("error");
          this.alert = true;
          setTimeout(this.closeAlertAndStay, 3000);
        } else {
          this.disabled = true;
          this.resetDisabled = true;
          if (this.$store.state.wantsNotifications) {
            this.setAlertType("success");
            this.alert = true;
            setTimeout(this.showQRCode, 1000);
            setTimeout(this.closeAlertAndAllowReset, 2000);
          } else {
            this.showQRCode();
            this.closeAlertAndAllowReset();
          }
        }
      }
    },

    showQRCode() {
      this.hidden = false;
      this.animateQR();
    },

    closeAlertAndStay() {
      // console.log("closeAlertAndStay");
      this.alert = false;
      this.disabled = false;
      this.resetDisabled = false;
    },

    closeAlertAndAllowReset() {
      // console.log("closeAlertAndAllowReset");
      this.alert = false;
      // remove the following line if you want to leave the inputs
      // disabled when the qr code is shown...
      this.disabled = false;
      this.resetDisabled = false;
    },

    reset() {
      // console.log("reset");
      // console.log("this.initAmount=", this.initAmount);
      // console.log("this.amount=", this.amount);
      this.account = this.initAccount;
      this.amount = this.initAmount;
      this.hidden = true;
      this.disabled = false;
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
.qr-code.hidden {
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 1s;
}
.qr-code:not(.hidden) {
  text-align: center;
  transition: opacity 2s;
  opacity: 1;
  visibility: visible;
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
