<template>
  <div class="container">
    <div class="nav">
      <Nav :title="$t('card-admin')" backlink="main" />
    </div>
    <div class="content">
      <div class="div-btn-section">
        <ul class="ul-btn-section">
          <li class="li-btn-section">
            <div class="div-select">
              <label class="label-bp-key"> BP Key: {{ bpKey }} </label>
              <label class="label-select">{{ $t("card") }}:</label>
              <select class="select-card" name="card">
                <option
                  v-for="card in cards"
                  :key="card.name"
                  :value="card.name"
                  >{{ card.name }}</option
                >
              </select>
            </div>
          </li>
          <li class="li-btn-section">
            <button class="btn-screen" @click="gotoLink('change-limits')">
              {{ $t("adjust-limits") }}
            </button>
          </li>
          <li class="li-btn-section">
            <button class="btn-screen" @click="gotoLink('region-settings')">
              {{ $t("region-settings") }}
            </button>
          </li>
          <li class="li-btn-section">
            <button class="btn-screen" @click="gotoLink('lock-unlock')">
              {{ $t("lock-unlock") }}
            </button>
          </li>
          <li class="li-btn-section">
            <button class="btn-screen" @click="gotoLink('new-pin')">
              {{ $t("new-pin") }}
            </button>
          </li>
          <li class="li-btn-section">
            <button class="btn-screen" @click="gotoLink('card-application')">
              {{ $t("card-application") }}
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
  data() {
    return {
      bpKey: this.$store.state.bpKey,
      cards: this.$store.state.cards
    };
  },

  methods: {
    gotoLink(link) {
      // console.log("cards.vue::gotoLink::link=", link);
      // store selected card
      const cardElem = document.querySelector(".select-card");
      // console.log("cardElem=", cardElem);
      // console.log("cardElem.value=", cardElem.value);
      this.$store.commit("setCardIndexByName", cardElem.value);
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
  margin: 10px 0px 90px 0px;
}

.label-bp-key {
  position: absolute;
  left: 10%;
  top: 0;
}

.label-select {
  position: absolute;
  left: 10%;
  top: 30px;
}

.select-card {
  width: 80%;
  height: 30px;
  position: absolute;
  left: 10%;
  top: 67px;
  font-size: 16px;
}
</style>
