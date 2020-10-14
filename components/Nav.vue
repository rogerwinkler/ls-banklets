<template>
  <nav class="site-navigation">
    <div class="div-nav-logo">
      <button v-if="backlink" class="back-button" @click="gotoLink(backlink)">
        <img
          id="back-button"
          src="/img/321-arrow-left2-grey.svg"
          alt="Arrow left"
        />
      </button>
      <img
        v-else
        id="img-logo"
        src="/img/logo-mx-cubic-grey.svg"
        alt="Logo Monex AG"
        width="50px"
        height="30px"
      />
    </div>
    <div class="div-nav-title">
      {{ $t(title) }}
    </div>
    <div class="div-btn-menu">
      <button class="btn-menu" @click="toggleMenu">
        <img src="/img/190-menu-grey.svg" alt="Menu" />
      </button>
      <div class="div-menu">
        <ul class="ul-menu">
          <li>
            <button class="menu-btn" @click="gotoLink('cards')">
              Karten
            </button>
          </li>
          <li>
            <button class="menu-btn" @click="gotoLink('qr-payment')">
              QR-Zahlung
            </button>
          </li>
          <li>
            <button class="menu-btn" @click="gotoLink('settings')">
              Einstellungen
            </button>
          </li>
          <li>
            <button class="menu-btn" @click="gotoLink('quick-tour')">
              Quick Tour
            </button>
          </li>
          <li>
            <button class="menu-btn" @click="gotoLink('about')">
              Über MX-Banklets
            </button>
          </li>
          <li>
            <button class="menu-btn" @click="gotoLink('/')">
              Logout
            </button>
          </li>
        </ul>
      </div>
      <!-- .nav-menu -->
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      expanded: false
    };
  },

  props: ["title", "backlink"],

  mounted() {
    // console.log("component::Nav.vue::mounted");
    document.addEventListener("keydown", this.handleKeyboardAndMouseEvents);
    document.addEventListener("click", this.handleKeyboardAndMouseEvents);
  },

  destroyed() {
    // console.log("component::Nav.vue::destroyed");
    document.removeEventListener("keydown", this.handleKeyboardAndMouseEvents);
    document.removeEventListener("click", this.handleKeyboardAndMouseEvents);
  },

  methods: {
    toggleMenu(e) {
      // console.log("components::Nav.vue::toggleMenu");
      const menu = document.querySelector(".div-menu");
      if (this.expanded) {
        menu.setAttribute("style", "display: none");
        this.expanded = false;
      } else {
        menu.setAttribute("style", "display: block");
        this.expanded = true;
      }
      if (e && e.type === "click") e.stopPropagation();
    },

    handleKeyboardAndMouseEvents(e) {
      // console.log("component::Na.vue::handleKeyboardAndMouseEvents::e=", e);
      if (this.expanded) {
        this.toggleMenu();
        e.preventDefault();
      }
      if (this.backlink && e && e.key && e.key === "Backspace" && e.shiftKey) {
        this.gotoLink(this.backlink);
      }
    },

    gotoLink(link) {
      // console.log("components::Nav.vue::gotoLink");
      this.$router.push(link);
    }
  }
};
</script>

<style>
nav {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 40px;
}

.div-nav-logo {
  position: absolute;
  left: 0;
  top: 0;
}

#img-logo {
  margin-top: 5px;
}

.div-btn-menu {
  position: absolute;
  right: 0;
  top: 0;
}

.btn-menu {
  position: absolute;
  right: 0;
  top: 0;
  background-color: var(--primary-color);
  border: none;
  margin-top: 10px;
  margin-right: 10px;
}

.back-button {
  position: absolute;
  left: 0;
  top: 0;
  background-color: var(--primary-color);
  border: none;
  margin-top: 0px;
  margin-right: 10px;
}

#back-button {
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
