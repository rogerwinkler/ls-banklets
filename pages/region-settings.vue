<template>
  <div class="container">
    <div class="nav">
      <Nav title="Regionenfreischaltung" backbutton="true" />
    </div>
    <div class="content">
      <div class="div-selection">
        <ul class="ul-selection">
          <li class="li-selection">
            <div class="div-selection-labels">
              <label class="label-bp-key">BP Key: {{ bpKey }}</label>
              <label class="label-card">Karte:</label>
              <label class="select-card">{{ card.name }}</label>
            </div>
          </li>
        </ul>
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
            <label class="label-checkbox" :for="cr.region">
              {{ cr.region }}
            </label>
          </li>
        </ul>
      </div>
      <div class="btn-section">
        <div class="vf">
          gültig von:
          <br />
          <input id="vf" type="date" />
        </div>
        <div class="vt">
          bis:
          <br />
          <input id="vt" type="date" />
        </div>
        <div class="cb">
          <button class="btn-normal" @click="cancel">
            Abbrechen
          </button>
        </div>
        <div class="sb">
          <button class="btn-default" @click="save">
            Speichern
          </button>
        </div>
        <div class="rb">
          <button class="btn-normal" @click="reset">
            Zurücksetzen
          </button>
        </div>
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
      if (this.haveRegionsChanged()) {
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

    save() {
      console.log("region-settings.vue::save");
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
          title: "Erfolg",
          text: "Änderungen erfolgreich gespeichert!",
          type: "success",
          duration: 2000
        });
      } else {
        this.$notify({
          title: "Info",
          text: "Regionen unverändert, nichts zu speichern.",
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
        this.$notify({
          title: "Erfolg",
          text: "Regionen erfolgreich zurückgesetzt!",
          type: "success",
          duration: 2000
        });
      } else {
        this.$notify({
          title: "Info",
          text: "Regionen unverändert, nichts zurückzusetzen.",
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
  margin-top: 10px;
}

.div-selection ul {
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
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
  margin: 10px 0px 60px 0px;
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

/* button section styling */
.btn-section {
  position: absolute;
  display: grid;
  width: 80%;
  left: 10%;
  right: 10%;
  grid-template:
    "vf vt" 50%
    "cb sb" 50%
    "rb rb" 50%;
  grid-template-columns: 50% 50%;
  font-size: 20px;
}

.vf {
  grid-area: vf;
  text-align: left;
}

.vt {
  grid-area: vt;
  text-align: left;
  padding-left: 10px;
}

.cb {
  grid-area: cb;
  padding-top: 20px;
  padding-right: 10px;
}

.sb {
  grid-area: sb;
  padding-top: 20px;
  padding-left: 10px;
}

.rb {
  grid-area: rb;
  padding-top: 4px;
}

#vf,
#vt {
  width: 100%;
  font-size: 12px;
  text-align: right;
}
</style>
