<template>
  <div class="container">
    <div class="nav">
      <Nav :title="$t('adjust-limits')" backlink="cards" />
    </div>
    <div class="content">
      <div class="div-user">User: {{ user }}</div>
      <div class="div-card">
        {{ $t("card") }}:
        <br />
        {{ card.name }}
      </div>
      <div class="div-ml-label">{{ $t("monthly-limit") }}:</div>
      <div class="div-ml-input">
        <input id="ml" type="number" :value="card.limits.monthly" />
        <button class="btn-clear-input" @click="clearInput('ml')">
          <img
            class="img-clear-input"
            src="img/270-cancel-circle-blue.svg"
            alt="Clear input field"
          />
        </button>
      </div>
      <div class="div-dl-label">{{ $t("daily-limit") }}:</div>
      <div class="div-dl-input">
        <input id="dl" type="number" :value="card.limits.daily" />
        <button class="btn-clear-input" @click="clearInput('dl')">
          <img
            class="img-clear-input"
            src="img/270-cancel-circle-blue.svg"
            alt="Clear input field"
          />
        </button>
      </div>
      <div class="div-cb">
        <button class="btn-normal" @click="cancel">
          {{ $t("cancel") }}
        </button>
      </div>
      <div class="div-sb">
        <button class="btn-default" @click="save">
          {{ $t("save") }}
        </button>
      </div>
      <div class="div-rb">
        <button class="btn-normal" @click="reset">
          {{ $t("reset") }}
        </button>
      </div>
      <div class="div-logo">
        <Logo />
        <h1 class="title">
          Banklets
        </h1>
      </div>
    </div>
    <notifications position="top center" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.user,
      card: this.$store.state.cards[this.$store.state.cardIndex]
    };
  },

  // computed: {
  //   card() {
  //     return this.$store.state.cards[this.$store.state.cardIndex];
  //   }
  // },

  mounted() {
    // console.log("change-limits.vue::mounted");
    document.addEventListener("keypress", this.keyPressed);
  },

  destroyed() {
    // console.log("change-limits.vue::destroyed");
    document.removeEventListener("keypress", this.keyPressed);
  },

  methods: {
    keyPressed(e) {
      // console.log("change-limits.vue::keyPressed::e=", e);
      if (e && e.key && e.key === "Enter") {
        this.save();
      }
    },

    clearInput(inputId) {
      // console.log("index.vue::clearInput::inputId=", inputId);
      const input = document.querySelector(`#${inputId}`);
      input.value = "";
    },

    haveLimitsChanged() {
      // console.log("changeLimits.vue::haveLimitsChanged");
      const ml = document.getElementById("ml");
      const dl = document.getElementById("dl");
      if (
        parseInt(ml.value) !== parseInt(this.card.limits.monthly) ||
        parseInt(dl.value) !== parseInt(this.card.limits.daily)
      ) {
        return true;
      }
      return false;
    },

    cancel() {
      // console.log("change-limits.vue::cancel");
      if (this.$store.state.confirmations && this.haveLimitsChanged()) {
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

    save() {
      // console.log("change-limits.vue::save");
      if (this.haveLimitsChanged()) {
        const ml = document.getElementById("ml");
        const dl = document.getElementById("dl");
        const cardString = JSON.stringify(this.card);
        const newCard = JSON.parse(cardString);
        newCard.limits.monthly = ml.value;
        newCard.limits.daily = dl.value;
        this.$store.commit("setCard", newCard);
        this.card = this.$store.state.cards[this.$store.state.cardIndex];
        this.$notify({
          title: this.$t("success"),
          text: this.$t("changes-saved-success"),
          type: "success",
          duration: 2000
        });
        setTimeout(() => {
          history.back();
        }, 2000);
      } else {
        this.$notify({
          title: this.$t("info"),
          text: this.$t("no-changes-no-save"),
          duration: 2000
        });
      }
    },

    reset() {
      // console.log("change-limits.vue::reset");
      if (this.haveLimitsChanged()) {
        const ml = document.getElementById("ml");
        const dl = document.getElementById("dl");
        ml.value = this.card.limits.monthly;
        dl.value = this.card.limits.daily;
        if (this.$store.state.notifications) {
          this.$notify({
            title: this.$t("success"),
            text: this.$t("changes-reset-success"),
            type: "success",
            duration: 3000
          });
        }
      } else {
        if (this.$store.state.notifications) {
          this.$notify({
            title: this.$t("info"),
            text: this.$t("no-changes-no-reset"),
            duration: 2000
          });
        }
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
  margin-top: 30px;
  width: 80%;
  margin-left: 10%;
  display: grid;
  grid-template:
    "div-user div-user" 6%
    "div-card div-card" 10%
    "div-ml-label div-ml-input" 10%
    "div-dl-label div-dl-input" 10%
    "div-cb div-sb" 10%
    "div-rb div-rb" 10%
    "div-logo div-logo" 44%;
  grid-template-columns: 50% 50%;
  font-size: 16px;
  color: var(--txt-color);
}

.div-user {
  grid-area: div-user;
  text-align: left;
}

.div-card {
  grid-area: div-card;
  text-align: left;
}

.div-ml-label {
  grid-area: div-ml-label;
  text-align: left;
  font-size: 20px;
}

.div-ml-input {
  grid-area: div-ml-input;
  text-align: left;
}

.div-dl-label {
  grid-area: div-dl-label;
  text-align: left;
  font-size: 20px;
}

.div-dl-input {
  grid-area: div-dl-input;
  text-align: left;
}

.div-cb {
  grid-area: div-cb;
  padding-top: 30px;
  padding-right: 10px;
  /* background-color: lightcoral; */
}

.div-sb {
  grid-area: div-sb;
  padding-top: 30px;
  padding-left: 10px;
  /* background-color: rosybrown; */
}

.div-rb {
  grid-area: div-rb;
  padding-top: 26px;
  /* background-color: maroon; */
}

.div-logo {
  grid-area: div-logo;
}

.img-clear-input {
  width: 30px;
  vertical-align: middle;
}

#ml,
#dl {
  width: 60%;
  height: 80%;
  font-size: 20px;
  text-align: right;
}

.btn-clear-input {
  background-color: transparent;
  border: none;
  font-size: 20px;
  padding: 0px;
}
</style>
