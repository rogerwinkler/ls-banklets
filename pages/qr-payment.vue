<template>
  <div class="container">
    <div class="nav">
      <Nav :title="$t('qr-payment')" backlink="main" />
    </div>
    <div class="content">
      <div class="bp-key">User: {{ user }}</div>
      <div class="account">{{ $t("account") }}:</div>
      <div class="input-account">
        <select class="select-account" name="account" @change="accountChanged">
          <option v-for="account in accounts" :key="account" :value="account">{{
            account
          }}</option>
        </select>
      </div>
      <div class="amount">{{ $t("amount") }}:</div>
      <div class="input-amount">
        <input type="number" class="inp-amount" @change="amountChanged" />
      </div>
      <div class="cb">
        <button class="btn-normal" @click="cancel">
          {{ $t("cancel") }}
        </button>
      </div>
      <div class="sb">
        <button class="btn-default" @click="order">
          {{ $t("order") }}
        </button>
      </div>
      <div class="rb">
        <button class="btn-normal" @click="reset">
          {{ $t("reset") }}
        </button>
      </div>
      <vrcode
        id="qr-code"
        class="qr-code"
        :download="{
          text: 'Download',
          filename: filename,
          visible: true,
          type: 'image/png'
        }"
        value="A Vue component to generate QR Code and download."
        :options="{
          size: 200,
          level: 'Q'
        }"
      ></vrcode>
    </div>
    <notifications position="bottom center" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.user,
      accounts: this.$store.state.accounts,
      filename: "mx-qr-code.png"
    };
  },

  methods: {
    showQRCode() {
      // console.log("qr-payment.vue::showQRCode");
      const qrCode = document.getElementById("qr-code");
      qrCode.setAttribute("style", "visibility: visible");
    },

    hideQRCode() {
      // console.log("qr-payment.vue::hideQRCode");
      const qrCode = document.getElementById("qr-code");
      qrCode.setAttribute("style", "visibility: hidden");
    },

    accountChanged() {
      // console.log("qr-payment.vue::accountChanged");
      this.hideQRCode();
    },

    amountChanged() {
      // console.log("qr-payment.vue::amountChanged");
      this.hideQRCode();
    },

    cancel() {
      // console.log("qr-payment.vue::cancel");

      // determine if qr-code is visible...
      const qrCode = document.getElementById("qr-code");
      const style = qrCode.getAttribute("style");
      let isVisible;
      if (!!style && style.indexOf("visible") >= 0) {
        isVisible = true;
      } else {
        isVisible = false;
      }

      const account = document.querySelector(".select-account");
      const amount = document.querySelector(".inp-amount");
      if (
        this.$store.state.confirmations &&
        (!!account.value || !!amount.value) &&
        !isVisible
      ) {
        this.$confirm({
          message: this.$t("confirm-cancel"),
          button: {
            no: this.$t("no"),
            yes: this.$t("yes")
          },
          callback: confirm => {
            // console.log("confirm callback");
            if (confirm) {
              history.back();
            }
          }
        });
      } else {
        history.back();
      }
    },

    order() {
      // console.log("qr-payment.vue::order");
      const account = document.querySelector(".select-account");
      const amount = document.querySelector(".inp-amount");
      if (!account.value || !amount.value) {
        this.$notify({
          type: "warn",
          title: this.$t("attention"),
          text: this.$t("order-qr-payment"),
          duration: 3000
        });
      } else {
        this.showQRCode();
        this.$notify({
          type: "success",
          title: this.$t("success"),
          text: this.$t("qr-payment-order-success"),
          duration: 2000
        });
      }
    },

    reset() {
      // console.log("qr-payment.vue::reset");
      const account = document.querySelector(".select-account");
      const amount = document.querySelector(".inp-amount");
      account.value = "";
      amount.value = "";
      this.hideQRCode();
      if (this.$store.state.notifications) {
        this.$notify({
          type: "success",
          title: this.$t("success"),
          text: this.$t("mask-reset-success")
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
    "bp-key bp-key" 10%
    "account input-account" 10%
    "amount input-amount" 10%
    "cb sb" 15%
    "rb rb" 15%
    "qr-code qr-code" 40%;
  grid-template-columns: 50% 50%;
  font-size: 20px;
}

.bp-key {
  grid-area: bp-key;
  text-align: left;
}

.account {
  grid-area: account;
  text-align: left;
}

.input-account {
  grid-area: input-account;
  text-align: left;
  margin-left: -30%;
}

.select-account {
  width: 100%;
  height: 30px;
  font-size: 16px;
}

.amount {
  grid-area: amount;
  text-align: left;
}

.input-amount {
  grid-area: input-amount;
  text-align: left;
  margin-left: -30%;
}

.inp-amount {
  width: 100%;
  font-size: 16px;
}

.cb {
  grid-area: cb;
  padding-top: 30px;
  padding-right: 10px;
}

.sb {
  grid-area: sb;
  padding-top: 30px;
  padding-left: 10px;
}

.rb {
  grid-area: rb;
  padding-bottom: 20px;
}

.qr-code {
  grid-area: qr-code;
}
</style>
