<template>
  <div class="container">
    <div class="nav">
      <Nav :title="$t('quick-tour')" backlink="main" />
    </div>
    <div class="content">
      <div class="logo">
        <Logo />
        <h1 class="title">
          Banklets
        </h1>
      </div>
      <hr />
      <div class="div-qt">
        <h1 class="qt">Quick Tour</h1>
      </div>
      <!-- <hr /> -->
      <div class="qt-text">
        {{ $t("swipe-through-the-tour-") }}
      </div>
      <div class="div-btn">
        <button @click="start">Beginne die Tour...</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    start() {
      // console.log("quick-tour.vue::start");
      this.$router.push("slide-show");
    }
  }
};
</script>

<style scoped>
.logo {
  margin-top: 30px;
  margin-bottom: 25px;
}

.div-qt {
  margin-top: 25px;
}

.qt {
  color: var(--secondary-color);
  font-size: 54px;
  font-weight: 800;
  margin-top: 50px;
  margin-bottom: 50px;
}

.qt-text {
  color: var(--txt-color);
  font-size: 20px;
  text-align: left;
  width: 80%;
  margin-left: 10%;
}

hr {
  width: 80%;
  margin-left: 10%;
}

.div-btn button {
  color: var(--txt-color);
  border: 0;
  background-color: white;
  font-size: 24px;
  border: none;
  border-radius: 4px;
  background-color: white;
  box-shadow: -6px 4px 10px var(--secondary-color);
  width: 80%;
  margin-top: 20px;
}

.div-btn button:hover {
  background-color: var(--secondary-color);
}
</style>
