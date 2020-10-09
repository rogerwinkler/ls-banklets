<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        Banklets
      </h1>
      <div class="input">
        <label class="label-top">BP Key:</label>
        <br />
        <div class="input-clear">
          <input id="bpKey" type="Text" />
          <button class="btn-clear-input" @click="clearInput">
            <img
              class="img-clear-input"
              src="/img/270-cancel-circle-blue.svg"
              alt="Clear input field"
            />
          </button>
        </div>
        <!-- <br /> -->
        <button class="cta full-screen" @click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     lang: this.$store.state.lang
  //   };
  // },

  // props: ["slug", "attributes", "target"],

  mounted() {
    // console.log("index.vue::mounted");
    document.addEventListener("keypress", this.handleKeyPressEvent);
  },

  destroyed() {
    // console.log("index.vue::destroyed");
    document.removeEventListener("keypress", this.handleKeyPressEvent);
  },

  methods: {
    clearInput() {
      // console.log("index.vue::clearInput");
      const bpKeyInput = document.getElementById("bpKey");
      // console.log("index.vue::clearInput::bpKeyInput=", bpKeyInput);
      bpKeyInput.value = "";
    },

    login() {
      // console.log("login");
      const bpKeyInput = document.getElementById("bpKey");
      if (bpKeyInput && bpKeyInput.value) {
        // console.log("bpKey=", bpKey);
        this.$store.commit("setBPKey", bpKeyInput.value);
        this.$router.push("/main");
      } else {
        // TODO: Show message "bpKey must not be null" or so...
        console.log("bpKey must not be empty");
        return;
      }
    },

    handleKeyPressEvent(e) {
      // console.log("index.vue::handleKeyPressEvent");
      // console.log(e.key);
      // console.log(document.activeElement.tagName);
      if (
        e &&
        e.key === "Enter" &&
        document.activeElement.tagName === "INPUT"
      ) {
        this.login();
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 70px;
  /* color: #35495e; */
  /* color: var(--bg-color-tertiary); */
  color: var(--secondary-color);
  letter-spacing: 1px;
}

.input {
  margin-top: 80px;
}

.input-clear {
  display: grid;
  grid-template-columns: auto auto;
  margin-top: 10px;
}

.btn-clear-input {
  background-color: transparent;
  border: none;
  font-size: 20px;
  margin-top: 4px;
  margin-left: -10px;
  padding: 0;
}

.img-clear-input {
  width: 25px;
}

.cta {
  margin-top: 30px;
  padding: 5px 10px 5px 10px;
  background-color: var(--tertiary-color);
  color: var(--primary-color);
  font-weight: 800;
  font-size: 50px;
  border: none;
  /* border: 4px solid var(--mx-dark-blue); */
  border-radius: 20px;
}
</style>
