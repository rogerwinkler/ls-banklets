<template>
  <div class="container">
    <div class="nav">
      <Nav :title="$t('new-pin')" backlink="cards" />
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
          <li class="li-btn-section">
            <button id="btn-new-pin" class="btn-screen" @click="newPin">
              {{ $t("request-new-pin") }}
            </button>
          </li>
        </ul>
      </div>
      <Logo />
      <h1 class="title">
        Banklets
      </h1>
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

  methods: {
    newPin() {
      // console.log("new-pin.vue::newPin");
      this.$notify({
        type: "success",
        title: this.$t("success"),
        text: this.$t("new-pin-request-success"),
        duration: 3000
      });
      const btn = document.getElementById("btn-new-pin");
      btn.disabled = true;
      setTimeout(() => {
        history.back();
      }, 2000);
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
  margin-bottom: 110px;
  /* border: 1px solid var(--secondary-color); */
}

.div-selection li {
  line-height: 3;
  position: relative;
}

.div-selection button {
  color: var(--txt-color);
  border: 0;
  background-color: white;
  font-size: 24px;
  border: none;
  border-radius: 4px;
  box-shadow: -6px 4px 10px var(--secondary-color);
  width: 80%;
}

.div-selection button[disabled] {
  color: var(--secondary-color);
}

.div-selection button:hover,
.div-selection li:hover > button {
  background-color: var(--secondary-color);
}

.div-selection button:hover,
.div-selection li:hover > button[disabled] {
  background-color: white;
}

.div-selection-labels {
  display: inline-block;
  /* position: relative; */
  width: 80%;
  /* box-shadow: -6px 4px 10px var(--secondary-color); */
  margin: 10px 0px 140px 0px;
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
</style>
