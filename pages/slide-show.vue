<template>
  <div class="container">
    <div class="nav">
      <nav class="site-navigation">
        <div class="div-btn-left">
          <button class="btn-left" @click="goBack">
            <img
              id="back-button"
              src="/img/313-arrow-left-grey.svg"
              alt="Arrow left"
            />
          </button>
        </div>
        <div class="div-nav-title">
          {{ $t("quick-tour") }}
        </div>
        <div class="div-btn-stop">
          <button class="btn-stop" @click="toggleMenu">
            <img src="/img/287-stop2-grey.svg" alt="Menu" />
          </button>
        </div>
        <div class="div-btn-right">
          <button class="btn-right" @click="toggleMenu">
            <img src="/img/309-arrow-right-grey.svg" alt="Menu" />
          </button>
        </div>
      </nav>
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
nav {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 40px;
}

.div-btn-left {
  position: absolute;
  left: 0;
  top: 0;
}

.div-btn-right {
  position: absolute;
  right: 0;
  top: 0;
}

.btn-right {
  position: absolute;
  right: 0;
  top: 0;
  background-color: var(--primary-color);
  border: none;
  margin-top: 10px;
  margin-right: 10px;
}

.btn-left {
  position: absolute;
  left: 0;
  top: 0;
  background-color: var(--primary-color);
  border: none;
  margin-top: 0px;
  margin-right: 10px;
}

#btn-left {
  width: 30px;
  margin-top: 4px;
}

.div-menu {
  padding-top: 32px;
  padding-right: 20px;
  display: none;
}

.div-menu ul {
  list-style: none;
  text-align: left;
  margin: 0;
  padding: 0;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  background-color: white;
  box-shadow: -6px 4px 10px var(--secondary-color);
}

.div-menu li {
  line-height: 1.5;
  position: relative;
}

.div-menu button {
  color: var(--txt-color);
  border: 0;
  background-color: white;
  font-size: 16px;
}

.div-menu button:hover,
.div-menu li:hover,
.div-menu li:hover > button {
  background-color: var(--secondary-color);
}
</style>
