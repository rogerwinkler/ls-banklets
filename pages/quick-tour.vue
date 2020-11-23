<template>
  <div class="content">
    <v-carousel
      class="carousel"
      v-model="model"
      :continuous="false"
      :hide-delimiters="true"
      height="100%"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <!-- <v-sheet height="100%" tile> -->
        <v-row class="fill-height" align="center" justify="center">
          <div class="div-img">
            <img
              class="slide"
              :src="slide"
              alt="tour slide"
              :width="imgWidth"
            />
          </div>
        </v-row>
        <!-- </v-sheet> -->
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: 0,
      slides: []
    };
  },

  computed: {
    imgWidth() {
      const scale = 0.8;
      const aspectRatio = 380 / 676;
      // Calc based on window (for mobile)
      // const widthBasedOnViewportWidth = window.innerWidth * scale;
      // const widthBasedOnViewportHeight =
      //   window.innerHeight * scale * aspectRatio;
      // Calc based on effective size (for mobile emulator in browser)
      const widthBasedOnViewportWidth = 380 * scale;
      const widthBasedOnViewportHeight = 676 * scale * aspectRatio;
      return Math.min(widthBasedOnViewportWidth, widthBasedOnViewportHeight);
    }
  },

  mounted() {
    // console.log("mounted");
    this.$store.commit("setCurrentPage", "quick-tour");
    this.$store.commit("enableAllMenuItems");
    this.$store.commit("disableMenuItem", 5);
    this.setSlidesAccordingToLocale();
  },

  destroyed() {
    // console.log("destroyed");
    this.$store.commit("enableMenuItem", 5);
  },

  methods: {
    setSlidesAccordingToLocale() {
      // console.log("setSlidesAccordingToLocale");
      switch (this.$store.state.locale.abbr) {
        case "de":
          this.slides = [
            "img/tour/qt-de-01.png",
            "img/tour/qt-de-02.png",
            "img/tour/qt-de-03.png",
            "img/tour/qt-de-04.png",
            "img/tour/qt-de-05.png",
            "img/tour/qt-de-06.png",
            "img/tour/qt-de-07.png",
            "img/tour/qt-de-08.png"
          ];
          break;
        case "en":
          this.slides = [
            "img/tour/qt-en-01.png",
            "img/tour/qt-en-02.png",
            "img/tour/qt-en-03.png",
            "img/tour/qt-en-04.png",
            "img/tour/qt-en-05.png",
            "img/tour/qt-en-06.png",
            "img/tour/qt-en-07.png",
            "img/tour/qt-en-08.png"
          ];
          break;
        case "fr":
          this.slides = [
            "img/tour/qt-fr-01.png",
            "img/tour/qt-fr-02.png",
            "img/tour/qt-fr-03.png",
            "img/tour/qt-fr-04.png",
            "img/tour/qt-fr-05.png",
            "img/tour/qt-fr-06.png",
            "img/tour/qt-fr-07.png",
            "img/tour/qt-fr-08.png"
          ];
          break;
        case "it":
          this.slides = [
            "img/tour/qt-it-01.png",
            "img/tour/qt-it-02.png",
            "img/tour/qt-it-03.png",
            "img/tour/qt-it-04.png",
            "img/tour/qt-it-05.png",
            "img/tour/qt-it-06.png",
            "img/tour/qt-it-07.png",
            "img/tour/qt-it-08.png"
          ];
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.slide {
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* width: 90%; */
}
</style>
