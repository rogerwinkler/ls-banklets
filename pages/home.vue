<template>
  <div class="content">
    <ls-overline>{{ $t("overview") }}</ls-overline>
    <ls-caption>
      {{ $t("all-the-interaction-") }}
    </ls-caption>
    <v-btn
      color="primary"
      class="info--text btn btn-qr"
      large
      rounded
      @click="$router.push('qr-payment')"
      elevation="6"
    >
      <v-icon left>
        mdi-qrcode
      </v-icon>
      {{ $t("qr-payment") }}</v-btn
    >
    <v-btn
      color="primary"
      class="info--text btn"
      large
      rounded
      @click="$router.push('card-admin')"
      elevation="6"
    >
      <v-icon left> mdi-credit-card-multiple-outline </v-icon
      >{{ $t("card-admin") }}</v-btn
    >
    <v-btn
      color="primary"
      outlined
      large
      rounded
      class="primary--text btn"
      @click="$router.push('card-application')"
      elevation="6"
    >
      <v-icon left> mdi-credit-card-plus-outline </v-icon
      >{{ $t("card-application") }}</v-btn
    >
    <p class="paragraph">
      {{ $t("if-you-are-new-p1") }}
      <v-btn
        class="primary-text"
        color="primary"
        text
        small
        rounded
        @click="$router.push('quick-tour')"
        >Quick Tour</v-btn
      >
      {{ $t("if-you-are-new-p2") }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {
    // console.log("mounted");
    this.$store.commit("setCurrentPage", "home");
    this.$store.commit("enableAllMenuItems");
    this.$store.commit("disableMenuItem", 0);
  },

  destroyed() {
    // console.log("destroyed");
    this.$store.commit("enableMenuItem", 0);
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
}
.card-title {
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 400;
}
.icon {
  position: absolute;
  left: 1rem;
  margin-right: 1rem;
}
.btn {
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.btn-qr {
  margin-top: 6px;
}
.paragraph {
  margin-top: 28px;
  line-height: 1.6rem;
  text-align: center;
}
</style>
