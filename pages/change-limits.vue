<template>
  <div class="container">
    <div class="nav">
      <Nav title="Limitenanpassung" backbutton="true" />
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
      <div class="limits">
        <div class="ml">
          Monatslimite:
        </div>
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
        <div class="dl">
          Tageslimite:
        </div>
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
      <div class="logo-section">
        <Logo />
        <h1 class="title">
          Banklets
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bpKey: this.$store.state.bpKey,
      card: this.$store.state.card
    };
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
    keyPressed(e) {
      // console.log("change-limits.vue::keyPressed::e=", e);
      if (e && e.key && e.key === "Enter") {
        this.save();
      }
    },

    clearInput(inputId) {
      console.log("index.vue::clearInput::inputId=", inputId);
      const input = document.querySelector(`#${inputId}`);
      input.value = "";
    },

    limitChanged() {
      console.log("changeLimits.vue::limitChanged");
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
      console.log("change-limits.vue::cancel");
      if (
        this.limitChanged() &&
        confirm("Wirkllich abbrechen, Änderungen gehen verloren?")
      ) {
        history.back();
      }
    },

    save() {
      console.log("change-limits.vue::save");
    },

    reset() {
      console.log("change-limits.vue::reset");
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
  margin-bottom: 40px;
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

.limits {
  position: absolute;
  display: grid;
  width: 80%;
  left: 10%;
  height: 200px;
  grid-template:
    "ml mla" 1fr
    "dl dla" 1fr
    "cb sb" 1fr
    "rb no" 1fr;
  margin-bottom: 30px;
  font-size: 20px;
}

.ml {
  grid-area: ml;
  align-items: left;
  text-align: left;
  padding-top: 20px;
  /* background-color: lime; */
}

.mla {
  grid-area: mla;
  align-items: left;
  text-align: left;
  padding-top: 10px;
  padding-left: 10px;
  display: flex;
  /* background-color: blue; */
}

.dl {
  grid-area: dl;
  align-items: left;
  text-align: left;
  padding-top: 20px;
  /* background-color: blueviolet; */
}

.dla {
  grid-area: dla;
  align-items: left;
  text-align: left;
  padding-top: 10px;
  padding-left: 10px;
  display: flex;
  /* background-color: burlywood; */
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

.logo-section {
  position: absolute;
  top: 450px;
  left: 10%;
}

#ml,
#dl {
  width: 100%;
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
  margin-top: 6px;
  margin-left: 5px;
  /* margin-left: -100px; */
  padding: 0;
}

.img-clear-input {
  width: 30px;
}
</style>
