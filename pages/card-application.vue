<template>
  <div class="container">
    <div class="nav">
      <Nav title="Kartenantrag" backbutton="true" />
    </div>
    <div class="content">
      <div class="bp-key">BP Key: {{ bpKey }}</div>
      <div class="account">Konto:</div>
      <div class="input-account">
        <select class="select-account" name="account">
          <option v-for="account in accounts" :key="account" :value="account">{{
            account
          }}</option>
        </select>
      </div>
      <div class="card">Karte:</div>
      <div class="input-card">
        <select class="select-card" name="card">
          <option v-for="ct in cardTypes" :key="ct" :value="ct">{{
            ct
          }}</option>
        </select>
      </div>
      <div class="limit">Limite:</div>
      <div class="input-limit">
        <select class="select-limit" name="limit">
          <option v-for="limit in limits" :key="limit" :value="limit">{{
            limit
          }}</option>
        </select>
      </div>
      <div class="cb">
        <button class="btn-normal" @click="cancel">
          Abbrechen
        </button>
      </div>
      <div class="sb">
        <button class="btn-default" @click="send">
          Abschicken
        </button>
      </div>
      <div class="rb">
        <button class="btn-normal" @click="reset">
          Zurücksetzen
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
      accounts: this.$store.state.accounts,
      cardTypes: this.$store.state.cardTypes,
      limits: this.$store.state.limits
    };
  },

  methods: {
    hasApplicationChanged() {
      const selectAccount = document.querySelector(".select-account");
      const selectCard = document.querySelector(".select-card");
      const selectLimit = document.querySelector(".select-limit");
      if (
        selectAccount.value === "" &&
        selectCard.value === "" &&
        selectLimit.value === ""
      ) {
        return false;
      }
      return true;
    },

    clearSelects() {
      const selectAccount = document.querySelector(".select-account");
      const selectCard = document.querySelector(".select-card");
      const selectLimit = document.querySelector(".select-limit");
      selectAccount.value = "";
      selectCard.value = "";
      selectLimit.value = "";
    },

    allSelectsFilled() {
      const selectAccount = document.querySelector(".select-account");
      const selectCard = document.querySelector(".select-card");
      const selectLimit = document.querySelector(".select-limit");
      if (selectAccount.value === "") return false;
      if (selectCard.value === "") return false;
      if (selectLimit.value === "") return false;
      return true;
    },

    cancel() {
      // console.log("card-application::cancel");
      if (this.hasApplicationChanged()) {
        this.$confirm({
          message:
            "Wollen Sie wirkllich abbrechen, Änderungen gehen verloren!?",
          button: {
            no: "Nein",
            yes: "Ja"
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

    goBack() {
      history.back();
    },

    send() {
      // console.log("card-application::send");
      if (!this.allSelectsFilled()) {
        this.$notify({
          type: "warn",
          title: "Achtung",
          text:
            "Alle drei Felder KONTO, KARTE und LIMITE müssen ausgefüllt sein.",
          duration: 2000
        });
      } else {
        this.$notify({
          type: "success",
          title: "Erfolg",
          text: "Kartenantrag erfolgreich abgeschickt!",
          duration: 2000
        });
        setTimeout(this.goBack, 2000);
      }
    },

    reset() {
      // console.log("card-application::reset");
      if (this.hasApplicationChanged()) {
        this.clearSelects();
        this.$notify({
          type: "success",
          title: "Erfolg",
          text: "Antrag erfolgreich zurückgesetzt!",
          duration: 2000
        });
      } else {
        this.$notify({
          title: "Info",
          text: "Es gibt nichts zurückzusetzen.",
          duration: 2000
        });
      }
    }
  }
};
</script>

<style scoped>
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
  width: 80%;
  display: grid;
  grid-template:
    "bp-key bp-key" 10%
    "account input-account" 10%
    "card input-card" 10%
    "limit input-limit" 10%
    "cb sb" 15%
    "rb rb" 15%
    "logo logo" 30%;
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
  margin-left: -40%;
}

.select-account {
  width: 100%;
  height: 30px;
  font-size: 16px;
}

.card {
  grid-area: card;
  text-align: left;
}

.input-card {
  grid-area: input-card;
  text-align: left;
  margin-left: -40%;
}

.select-card {
  width: 100%;
  height: 30px;
  font-size: 16px;
}

.limit {
  grid-area: limit;
  text-align: left;
}

.input-limit {
  grid-area: input-limit;
  text-align: left;
  margin-left: -40%;
}

.select-limit {
  width: 100%;
  height: 30px;
  font-size: 16px;
}

.cb {
  grid-area: cb;
  padding-top: 50px;
  padding-right: 10px;
}

.sb {
  grid-area: sb;
  padding-top: 50px;
  padding-left: 10px;
}

.rb {
  grid-area: rb;
}

.logo {
  grid-area: logo;
}
</style>
