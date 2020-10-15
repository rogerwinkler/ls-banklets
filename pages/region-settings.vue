<template>
  <div class="container">
    <div class="nav">
      <Nav :title="$t('region-settings')" backlink="cards" />
    </div>
    <div class="content">
      <div class="div-user">User: {{ user }}</div>
      <div class="div-card">
        {{ $t("card") }}:
        <br />
        {{ card.name }}
      </div>
      <div class="div-region">
        <ul class="ul-region">
          <li v-for="cr in checkedRegions" :key="cr.index" class="li-region">
            <input
              v-if="cr.checked"
              :id="cr.index"
              type="checkbox"
              :value="cr.region"
              :name="cr.region"
              checked
            />
            <input
              v-else
              :id="cr.index"
              type="checkbox"
              :value="cr.region"
              :name="cr.region"
            />
            <label class="label-checkbox" :for="cr.index">
              {{ cr.region }}
            </label>
          </li>
        </ul>
      </div>
      <div class="div-valid-from">
        {{ $t("valid-from") }}:
        <br />
        <input id="vf" type="date" />
      </div>
      <div class="div-valid-to">
        {{ $t("to") }}:
        <br />
        <input id="vt" type="date" />
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
        <button id="rb" class="btn-normal" @click="reset">
          {{ $t("reset") }}
        </button>
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
      card: this.$store.state.cards[this.$store.state.cardIndex],
      regions: this.$store.state.regions
    };
  },

  computed: {
    checkedRegions() {
      // console.log("region-settings.vue::checkedRegions");
      let cr = [];
      for (let i = 0; i < this.regions.length; i++) {
        if (this.regionCovered(i, this.card)) {
          cr.push({ index: i, region: this.regions[i], checked: true });
        } else {
          cr.push({ index: i, region: this.regions[i], checked: false });
        }
      }
      // console.log("cr=", cr);
      return cr;
    }
  },

  mounted() {
    // console.log("region-settings.vue::mounted");
    document.addEventListener("keypress", this.keyPressed);
  },

  destroyed() {
    // console.log("region-settings.vue::destroyed");
    document.removeEventListener("keypress", this.keyPressed);
  },

  methods: {
    regionCovered(regionIndex, card) {
      // console.log(
      //   `region-settings.vue::regionCovered::region=${region}, card.regions=${card.regions}`
      // );
      for (let i = 0; i < card.regions.length; i++) {
        // console.log(`compare: ${card.regions[i]} === ${region}`);
        if (card.regions[i] === regionIndex) {
          return true;
        }
      }
      return false;
    },

    keyPressed(e) {
      // console.log("region-settings.vue::keyPressed::e=", e);
      if (e && e.key && e.key === "Enter") {
        this.save();
      }
    },

    haveRegionsChanged() {
      // console.log("region-settings.vue::haveRegionsChanged");
      let cb;
      for (let i = 0; i < this.$store.state.regions.length; i++) {
        cb = document.getElementById(i.toString());
        // console.log("cb.checked=", cb.checked);
        if (
          (!cb.checked && this.card.regions.indexOf(i) >= 0) ||
          (cb.checked && this.card.regions.indexOf(i) < 0)
        ) {
          return true;
        }
      }
      return false;
    },

    cancel() {
      // console.log("region-settings.vue::cancel");
      if (this.$store.state.confirmations && this.haveRegionsChanged()) {
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
      // console.log("region-settings.vue::save");
      if (this.haveRegionsChanged()) {
        // deep clone card
        const cardString = JSON.stringify(this.card);
        const newCard = JSON.parse(cardString);
        newCard.regions = [];
        let cb;
        for (let i = 0; i < this.$store.state.regions.length; i++) {
          cb = document.getElementById(i.toString());
          if (cb.checked) {
            newCard.regions.push(i);
          }
        }
        this.$store.commit("setCard", newCard);
        this.card = this.$store.state.cards[this.$store.state.cardIndex];
        this.$notify({
          title: this.$t("success"),
          text: this.$t("changes-saved-success"),
          type: "success",
          duration: 3000
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
      // console.log("region-settings.vue::reset");
      if (this.haveRegionsChanged()) {
        let cb;
        for (let i = 0; i < this.$store.state.regions.length; i++) {
          cb = document.getElementById(i.toString());
          if (this.card.regions.indexOf(i) >= 0) {
            cb.checked = true;
          } else {
            cb.checked = false;
          }
        }
        if (this.$store.state.notifications) {
          this.$notify({
            title: this.$t("success"),
            text: this.$t("changes-reset-success"),
            type: "success",
            duration: 2000
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
    "div-region div-region" 44%
    "div-valid-from div-valid-to" 10%
    "div-cb div-sb" 10%
    "div-rb div-rb" 10%
    "div-bottom-empty div-bottom-empty" 14%;
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

.div-region {
  grid-area: div-region;
}

.div-valid-from {
  grid-area: div-valid-from;
  text-align: left;
  padding-right: 10px;
}

.div-valid-to {
  grid-area: div-valid-to;
  text-align: left;
  padding-left: 10px;
}

#vf,
#vt {
  width: 100%;
  font-size: 12px;
}

.div-cb {
  grid-area: div-cb;
  padding-right: 10px;
}

.div-sb {
  grid-area: div-sb;
  padding-left: 10px;
}

.div-rb {
  grid-area: div-rb;
}

#rb {
  vertical-align: top;
}

/* region styling */
.div-region {
  width: 80%;
  margin-left: 10%;
}

.ul-region {
  list-style: none;
  text-align: left;
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
}

.li-region {
  line-height: 1.5;
}

.label-checkbox {
  font-size: 20px;
}
</style>
