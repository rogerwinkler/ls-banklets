<template>
  <div class="container">
    <div class="nav">
      <Nav :title="$t('lock-unlock')" backlink="cards" />
    </div>
    <div class="content">
      <div class="div-selection">
        <ul class="ul-selection">
          <li class="li-selection">
            <div class="div-selection-labels">
              <label class="label-bp-key">User: {{ user }}</label>
              <label class="label-card">{{ $t("card") }}:</label>
              <label class="select-card">{{ card.name }}</label>
            </div>
          </li>
          <li class="li-btn-section">
            <button
              id="btn-lock"
              class="btn-screen"
              disabled
              @click="setCardLocked(true)"
            >
              {{ $t("lock-card") }}
            </button>
          </li>
          <li class="li-btn-section">
            <button
              id="btn-unlock"
              class="btn-screen"
              disabled
              @click="setCardLocked(false)"
            >
              {{ $t("unlock-card") }}
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
      user: this.$store.state.user,
      card: this.$store.state.cards[this.$store.state.cardIndex]
    };
  },

  mounted() {
    // console.log("lock-unlock.vue::mounted");
    this.setDisabledStates();
  },

  methods: {
    setCardLocked(isLocked) {
      // console.log("lock-unlock.vue::setCardLocked::isLocked=", isLocked);
      // deep clone card
      const cardString = JSON.stringify(this.card);
      const newCard = JSON.parse(cardString);
      newCard.locked = isLocked;
      this.$store.commit("setCard", newCard);
      this.card = this.$store.state.cards[this.$store.state.cardIndex];
      const msg = isLocked
        ? this.$t("card-lock-success")
        : this.$t("card-unlock-success");
      this.$notify({
        type: "success",
        title: this.$t("success"),
        text: msg,
        duration: 2000
      });
      this.setDisabledStates();
      setTimeout(() => {
        history.back();
      }, 2000);
    },

    setDisabledStates() {
      // console.log("lock-unlock.vue::setDisabledStates");
      const lockBtn = document.getElementById("btn-lock");
      const unlockBtn = document.getElementById("btn-unlock");
      if (this.card.locked) {
        lockBtn.disabled = true;
        unlockBtn.disabled = false;
      } else {
        lockBtn.disabled = false;
        unlockBtn.disabled = true;
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
  margin: 10px 0px 90px 0px;
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
