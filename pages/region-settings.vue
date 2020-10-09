<template>
  <div class="container">
    <div class="nav">
      <Nav title="Regionenfreischaltung" backbutton="true" />
    </div>
    <div class="content">
      <div class="div-btn-section">
        <ul class="ul-btn-section">
          <li class="li-btn-section">
            <div class="div-select">
              <label class="label-bp-key">BP Key: {{ bpKey }}</label>
              <label class="label-card">Karte:</label>
              <label class="select-card">{{ card.name }}</label>
            </div>
          </li>
        </ul>
      </div>
      <div class="div-region">
        <ul class="ul-region">
          <li v-for="cr in checkedRegions" :key="cr.region" class="li-region">
            <input
              v-if="cr.checked"
              :id="cr.region"
              type="checkbox"
              :value="cr.region"
              :name="cr.region"
              checked
            />
            <input
              v-else
              type="checkbox"
              :id="cr.region"
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
          <input id="vf" type="date" />
        </div>
        <div class="vt">
          <div class="input-clear">
            bis:
            <input id="vt" type="date" />
          </div>
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
        <div class="no"></div>
      </div>
    </div>
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
      let cr = [];
      for (let i = 0; i < this.regions.length; i++) {
        if (this.regionCovered(this.regions[i], this.card)) {
          cr.push({ region: this.regions[i], checked: true });
        } else {
          cr.push({ region: this.regions[i], checked: false });
        }
      }
      console.log("cr=", cr);
      return cr;
    }
  },

  mounted() {
    // console.log("change-limits.vue::mounted");
    document.addEventListener("keypress", this.keyPressed);
  },

  destroyed() {
    // console.log("change-limits.vue::destroyed");
    document.removeEventListener("keypress", this.keyPressed);
  },

  methods: {
    regionCovered(region, card) {
      // console.log(
      //   `region-settings.vue::regionCovered::region=${region}, card.regions=${card.regions}`
      // );
      for (let i = 0; i < card.regions.length; i++) {
        // console.log(`compare: ${card.regions[i]} === ${region}`);
        if (card.regions[i] === region) {
          return true;
        }
      }
      return false;
    },

    keyPressed(e) {
      // console.log("change-limits.vue::keyPressed::e=", e);
      if (e && e.key && e.key === "Enter") {
        this.save();
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

.div-btn-section ul {
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 0;
  margin-bottom: 30px;
  /* border: 1px solid var(--secondary-color); */
}

.div-btn-section li {
  line-height: 3;
  position: relative;
}

.div-select {
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
  margin-bottom: 40px;
}

.li-region {
  line-height: 1.8;
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
  height: 160px;
  grid-template:
    "vf vt" 1fr
    "cb sb" 1fr
    "rb no" 1fr;
  margin-bottom: 30px;
  font-size: 20px;
}

.vf {
  grid-area: vf;
  align-items: left;
  text-align: left;
  padding-top: 0px;
  /* background-color: lime; */
}

.vt {
  grid-area: vt;
  align-items: left;
  text-align: left;
  padding-top: 0px;
  padding-left: 10px;
  /* display: flex; */
  /* background-color: blue; */
}

.cb {
  grid-area: cb;
  padding-top: 40px;
  padding-right: 10px;
  /* background-color: lightcoral; */
}

.sb {
  grid-area: sb;
  padding-top: 40px;
  padding-left: 10px;
  /* background-color: rosybrown; */
}

.rb {
  grid-area: rb;
  padding-top: 16px;
  padding-right: 10px;
  /* background-color: maroon; */
}

.no {
  grid-area: no;
  /* background-color: magenta; */
}

#vf,
#vt {
  width: 50%;
  font-size: 20px;
  text-align: right;
  /* box-shadow: -6px 4px 10px var(--secondary-color); */
}
</style>
