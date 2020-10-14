<template>
  <div class="container">
    <div class="nav">
      <nav class="site-navigation">
        <div class="div-btn-left">
          <button class="btn-left" @click="backward">
            <img
              id="img-left"
              src="/img/313-arrow-left-grey.svg"
              alt="Arrow left"
            />
          </button>
        </div>
        <div class="div-nav-title">
          {{ $t("quick-tour") }}
        </div>
        <div class="div-btn-stop">
          <button class="btn-stop" @click="stop">
            <img id="img-stop" src="/img/287-stop2-grey.svg" alt="Menu" />
          </button>
        </div>
        <div class="div-btn-right">
          <button class="btn-right" @click="forward">
            <img
              id="img-right"
              src="/img/309-arrow-right-grey.svg"
              alt="Menu"
            />
          </button>
        </div>
      </nav>
    </div>
    <div class="content">
      <div class="div-slide">
        <img
          class="img-slide"
          :src="slides[currentSlide]"
          alt="tour slide"
          @click="imageClicked"
        />
      </div>
      <div class="nav-indicator">
        <input
          v-for="(slide, index) in slides"
          :key="index"
          :id="index"
          type="radio"
          class="radio"
          name="pageNo"
          :value="index"
          @change="indicatorChange(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      slides: [
        "/img/tour/qt-de-01.png",
        "/img/tour/qt-de-02.png",
        "/img/tour/qt-de-03.png",
        "/img/tour/qt-de-04.png",
        "/img/tour/qt-de-05.png",
        "/img/tour/qt-de-06.png",
        "/img/tour/qt-de-07.png",
        "/img/tour/qt-de-08.png",
        "/img/tour/qt-de-09.png",
        "/img/tour/qt-de-10.png",
        "/img/tour/qt-de-11.png",
        "/img/tour/qt-de-12.png",
        "/img/tour/qt-de-13.png",
        "/img/tour/qt-de-14.png",
        "/img/tour/qt-de-15.png",
        "/img/tour/qt-de-16.png",
        "/img/tour/qt-de-17.png",
        "/img/tour/qt-de-18.png"
      ],
      touchX1: 0,
      touchX2: 0
    };
  },

  mounted() {
    // console.log("slide-show.vue::mounted");
    document.addEventListener("touchstart", this.handleStart);
    document.addEventListener("touchmove", this.handleMove);
    document.addEventListener("touchend", this.handleEnd);
    document.addEventListener("keydown", this.handleKeydownEvent);
    this.checkRadio(this.currentSlide);
  },

  destroyed() {
    // console.log("slide-show.vue::destroyed");
    document.removeEventListener("touchstart", this.handleStart);
    document.removeEventListener("touchmove", this.handleMove);
    document.removeEventListener("touchend", this.handleEnd);
    document.removeEventListener("keydown", this.handleKeydownEvent);
  },

  methods: {
    indicatorChange(index) {
      console.log("slide-show.vue::indicatorChange::index=", index);
      this.currentSlide = index;
    },

    imageClicked() {
      console.log("slide-show.vue::imageClicked");
      this.forward();
    },

    handleStart(e) {
      // console.log("slide-show.vue::handleStart::e=", e.touches);
      if (e.touches.length > 0) {
        this.touchX1 = e.touches[0].clientX;
      }
    },

    handleMove(e) {
      // console.log("slide-show.vue::handleMove::e=", e.touches);
      if (e.touches.length > 0) {
        this.touchX2 = e.touches[0].clientX;
      }
    },

    handleEnd(e) {
      // console.log("slide-show.vue::handleEnd::e=", e.touches);
      // no move handle as a single touch/click
      if (this.touchX1 === 0 || this.touchX2 === 0) {
        this.forward();
        return;
      }
      const distance = this.touchX2 - this.touchX1;
      console.log("distance=", distance);
      this.touchX1 = 0;
      this.touchX2 = 0;
      if (distance > 50) {
        this.forward();
      } else if (distance < -50) {
        this.backward();
      }
    },

    handleKeydownEvent(e) {
      // console.log("slide-show.vue::handleKeyPressEvent::e=", e);
      if (e && (e.key === "ArrowRight" || e.key === "ArrowDown")) {
        this.forward();
      } else if (e && (e.key === "ArrowLeft" || e.key === "ArrowUp")) {
        this.backward();
      } else if (e && e.key === "Escape") {
        this.stop();
      }
    },

    checkRadio(index) {
      // console.log("slide-show.vue::checkRadio::index=", index);
      const radio = document.getElementById(index);
      radio.checked = true;
    },

    backward() {
      // console.log("slide-show.vue::backward");
      if (this.currentSlide === 0) {
        this.stop();
        return;
      }
      this.currentSlide -= 1;
      this.checkRadio(this.currentSlide);
    },

    forward() {
      // console.log("slide-show.vue::forward");
      if (this.currentSlide === this.slides.length - 1) {
        this.stop();
        return;
      }
      this.currentSlide += 1;
      this.checkRadio(this.currentSlide);
    },

    stop() {
      // console.log("slide-show.vue::stop");
      // this.currentSlide = 0;
      this.$router.push("quick-tour");
    }
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

.div-btn-stop {
  position: absolute;
  right: 50px;
  top: 0;
}

.btn-right,
.btn-left,
.btn-stop {
  background-color: var(--primary-color);
  border: none;
}

#img-left,
#img-right,
#img-stop {
  width: 30px;
  margin-top: 4px;
}

.content {
  display: grid;
  grid-template-rows: 90% 10%;
  grid-template-columns: 100%;
}

.img-slide {
  max-width: 80vw;
  height: 80vh;
}
</style>
