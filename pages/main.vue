<template>
  <div class="container">
    <div class="nav">
      <Nav title="MX-Banklets" />
    </div>
    <div class="content">
      <div class="div-btn-section">
        <ul class="ul-btn-section">
          <li class="li-btn-section">
            <div class="div-select">
              <label class="label-bp-key">BP Key: {{ bpKey }}</label>
            </div>
          </li>
          <li class="li-btn-section">
            <button class="btn-screen" @click="gotoLink('cards')">
              Kartenverwaltung
            </button>
          </li>
          <li class="li-btn-section">
            <button class="btn-screen" @click="gotoLink('qr-payment')">
              QR-Zahlung
            </button>
          </li>
          <li class="li-btn-section">
            <button class="btn-screen" @click="gotoLink('settings')">
              Einstellungen
            </button>
          </li>
          <li class="li-btn-section">
            <button class="btn-screen" @click="gotoLink('quick-tour')">
              Quick Tour
            </button>
          </li>
          <li class="li-btn-section">
            <button class="btn-screen" @click="gotoLink('about')">
              Über MX-Banklets
            </button>
          </li>
          <li class="li-btn-section">
            <button class="btn-screen" @click="gotoLink('/')">
              Logout
            </button>
          </li>
        </ul>
      </div>
      <Logo />
      <h1 class="title">
        Banklets
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     bpKey: this.$store.state.bpKey
  //   };
  // },

  computed: {
    bpKey() {
      return this.$store.state.bpKey;
    }
  },

  methods: {
    gotoLink(link) {
      this.$router.push(link);
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

.div-btn-section button {
  color: var(--txt-color);
  border: 0;
  background-color: white;
  font-size: 24px;
  border: none;
  border-radius: 4px;
  background-color: white;
  box-shadow: -6px 4px 10px var(--secondary-color);
  width: 80%;
}

.div-btn-section button:hover,
.div-btn-section li:hover > button {
  background-color: var(--secondary-color);
}

.div-select {
  display: inline-block;
  /* position: relative; */
  width: 80%;
  /* box-shadow: -6px 4px 10px var(--secondary-color); */
  margin: 10px 0px 40px 0px;
}

.label-bp-key {
  position: absolute;
  left: 10%;
  top: 0;
}
</style>
