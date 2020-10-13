<template>
  <div class="container">
    <div class="nav">
      <Nav :title="$t('adjust-limits')" backbutton="true" />
    </div>
    <div class="content">
      <div class="div-selection">
        <ul class="ul-selection">
          <li class="li-selection">
            <div class="div-selection-labels">
              <label class="label-bp-key">BP Key: {{ bpKey }}</label>
              <label class="label-card">{{ $t("card") }}:</label>
              <label class="select-card">{{ card.name }}</label>
            </div>
          </li>
        </ul>
      </div>
      <div class="limits">
        <div class="ml">{{ $t("monthly-limit") }}:</div>
        <div class="mla">
          <div class="input-clear">
            <input id="ml" type="number" :value="card.limits.monthly" />
            <button class="btn-clear-input" @click="clearInput('ml')">
              <img
                class="img-clear-input"
                src="/img/270-cancel-circle-blue.svg"
                alt="Clear input field"
              />
            </button>
          </div>
        </div>
        <div class="dl">{{ $t("daily-limit") }}:</div>
        <div class="dla">
          <div class="input-clear">
            <input id="dl" type="number" :value="card.limits.daily" />
            <button class="btn-clear-input" @click="clearInput('dl')">
              <img
                class="img-clear-input"
                src="/img/270-cancel-circle-blue.svg"
                alt="Clear input field"
              />
            </button>
          </div>
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
        <div class="rb">
          <button class="btn-normal" @click="reset">
            {{ $t("reset") }}
          </button>
        </div>
      </div>
      <div class="logo-section">
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
          title: "Info",
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
            title: "Info",
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
}

.div-selection ul {
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 0;
  margin-bottom: 40px;
  /* border: 1px solid var(--secondary-color); */
}

.div-selection li {
  line-height: 3;
  position: relative;
}

.div-selection-labels {
  display: inline-block;
  /* position: relative; */
  width: 80%;
  /* box-shadow: -6px 4px 10px var(--secondary-color); */
  margin: 10px 0px 50px 0px;
}

.label-bp-key {
  position: absolute;
  left: 10%;
  top: 0;
}

.label-card {
  position: absolute;
  left: 10%;
  top: 35px;
  white-space: nowrap;
}

.select-card {
  position: absolute;
  left: 10%;
  top: 55px;
  font-size: 16px;
}

.limits {
  position: absolute;
  display: grid;
  width: 80%;
  left: 10%;
  right: 10%;
  grid-template:
    "ml mla" 20%
    "dl dla" 20%
    "cb sb" 30%
    "rb rb" 30%;
  grid-template-columns: 50% 50%;
  /* margin-bottom: 30px; */
  font-size: 20px;
}

.ml {
  grid-area: ml;
  text-align: left;
  padding-top: 10px;
  /* background-color: lime; */
}

.mla {
  grid-area: mla;
  text-align: left;
  padding-top: 4px;
  padding-left: 10px;
  display: flex;
  /* background-color: blue; */
}

.dl {
  grid-area: dl;
  align-items: left;
  text-align: left;
  padding-top: 10px;
  /* background-color: blueviolet; */
}

.dla {
  grid-area: dla;
  align-items: left;
  text-align: left;
  padding-top: 4px;
  padding-left: 10px;
  display: flex;
  /* background-color: burlywood; */
}

.cb {
  grid-area: cb;
  padding-top: 30px;
  padding-right: 10px;
  /* background-color: lightcoral; */
}

.sb {
  grid-area: sb;
  padding-top: 30px;
  padding-left: 10px;
  /* background-color: rosybrown; */
}

.rb {
  grid-area: rb;
  padding-top: 26px;
  /* background-color: maroon; */
}

.logo-section {
  margin-top: 300px;
}

#ml,
#dl {
  width: 100%;
  height: 80%;
  /* margin-top: 4px; */
  font-size: 20px;
  text-align: right;
  /* box-shadow: -6px 4px 10px var(--secondary-color); */
}

.input-clear {
  display: grid;
  grid-template-columns: auto auto;
}

.btn-clear-input {
  background-color: transparent;
  border: none;
  font-size: 20px;
  margin-top: 0px;
  margin-left: 5px;
  /* margin-left: -100px; */
  padding: 0;
}

.img-clear-input {
  width: 30px;
}
</style>
