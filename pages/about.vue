<template>
  <div class="content">
    <mx-overline>{{ $t("about") }}</mx-overline>
    <div class="logo">
      <Logo />
      <h1 class="title">
        Banklets
      </h1>
    </div>
    <hr class="hr" />
    <div class="version-date-copyright">
      <span>{{ $t("version") }}: 1.0.1 | Build: 27</span>
      <br />
      <span>{{ $t("date") }}: 2020-11-17</span>
      <br />
      <span>&copy;2020 Monex AG, Balzers Liechtenstein</span>
    </div>
    <hr class="hr" />
    <div class="data-protection-header">
      {{ $t("data-protection-header") }}
    </div>
    <div class="data-protection-text">
      {{ $t("data-protection-text") }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {
    // console.log("mounted");
    this.$store.commit("setCurrentPage", "about");
    this.$store.commit("enableAllMenuItems");
    this.$store.commit("disableMenuItem", 6);
  },

  destroyed() {
    // console.log("destroyed");
    this.$store.commit("enableMenuItem", 6);
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  margin-top: 10px;
  margin-bottom: 20px;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 68px !important;
  /* color: #35495e; */
  /* color: var(--bg-color-tertiary); */
  color: #aaa;
  letter-spacing: 1px;
  margin-left: -4px;
  margin-top: 16px;
}
.version-date-copyright {
  display: flex;
  flex-direction: column;
  text-align: center;
  line-height: 0.8rem;
}
.hr {
  width: 90%;
  margin: 20px 0 16px 0;
}
.data-protection-header {
  text-align: left;
  font-weight: 800;
  width: 90%;
  margin-left: 5%;
  line-height: 1rem;
  margin-bottom: 4px;
}
.data-protection-text {
  text-align: left;
  width: 90%;
  margin-left: 5%;
  line-height: 1.2rem;
}
</style>
