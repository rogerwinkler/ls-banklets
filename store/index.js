import { i18n } from "../plugins/i18n";

export const state = () => ({
  // output debug statements if "debug = true"
  debug: false,

  // Active page. One of "login", "home", "qr-payment", "card-admin"
  // and "card-application".
  currentPage: "login",

  // locales support (lang)
  locales: [
    { locale: "Deutsch", abbr: "de" },
    { locale: "English", abbr: "en" },
    { locale: "Français", abbr: "fr" },
    { locale: "Italiano", abbr: "it" }
  ],
  locale: { locale: "Deutsch", abbr: "de" },

  menuItems: [
    { title: "overview", disabled: true },
    { title: "qr-payment", disabled: true },
    { title: "card-admin", disabled: true },
    { title: "card-application", disabled: true },
    { title: "settings", disabled: true },
    { title: "quick-tour", disabled: true },
    { title: "about-mx-banklets", disabled: true },
    { title: "logout", disabled: true }
  ],

  // confirmations and notifications
  wantsConfirmations: true,
  wantsNotifications: true,

  // the currently selected menu item, "" if none is selected
  user: "test",

  // store for selected card
  cardIndex: 0,

  // available cards
  cards: [
    {
      id: 0,
      name: "Mastercard Gold 1234-3456-2345-2341-99",
      limits: {
        monthly: 3000,
        daily: 600
      },
      regions: [0, 1],
      locked: false
    },
    {
      id: 1,
      name: "Visa KSK/FDS 5230 3490 5107 9350",
      limits: {
        monthly: 10000,
        daily: 1500
      },
      regions: [0, 1, 3],
      locked: false
    },
    {
      id: 2,
      name: "UBS CH88 0020 2829 Q080 8383 0",
      limits: {
        monthly: 2000,
        daily: 500
      },
      regions: [0],
      locked: false
    },
    {
      id: 3,
      name: "ZKB CH87 9483 8473 0000 7373 6",
      limits: {
        monthly: 5000,
        daily: 800
      },
      regions: [0, 5, 6],
      locked: true
    }
  ],

  // regions
  regions: [
    "Europe", // 0
    "North America", // 1
    "South America", // 2
    "Australia", // 3
    "Asia", // 4
    "Russia", // 5
    "Middle East", // 6
    "Africa" // 7
  ],

  regionsDateRange: [],

  // Accounts
  accounts: [
    "10.233.234.X2",
    "20.345.687.19",
    "22.234.576.4A",
    "23.687.247.Z8",
    "43.142.234.24",
    "88.987.003.3Z"
  ],

  // card types
  cardTypes: [
    "Visa Gold",
    "Visa Silver",
    "Visa Platinum",
    "Visa Debit",
    "Mastercard",
    "MC Debit",
    "MC Deluxe",
    "MC Phantom V",
    "MC Bugatti",
    "barclaycard",
    "Maestro Debit",
    "Amex",
    "Amex Platinum",
    "Amex Black",
    "Amex Payback",
    "Amex Gold"
  ],

  // monthly / global limits
  limits: [
    300,
    400,
    500,
    600,
    700,
    800,
    900,
    1000,
    1100,
    1200,
    1300,
    1400,
    1500,
    1600,
    1700,
    1800,
    1900,
    2000,
    2200,
    2400,
    2600,
    2800,
    3000,
    3200,
    3400,
    3600,
    3800,
    4000,
    4500,
    5000,
    5500,
    6000,
    6500,
    7000,
    7500,
    8000,
    8500,
    9000,
    9500,
    10000,
    11000,
    12000,
    13000,
    14000,
    15000,
    16000,
    17000,
    18000,
    19000,
    20000,
    22000,
    24000,
    26000,
    28000,
    30000,
    32000,
    34000,
    36000,
    38000,
    40000,
    45000,
    50000
  ],

  monthlyLimitRange: { from: 500, to: 12000 },
  dailyLimitRange: { from: 50, to: 3000 }
});

export const mutations = {
  setCurrentPage(state, page) {
    if (state.debug) {
      console.log("store::index.js::setIsIndexPage::page=", page);
    }
    state.currentPage = page;
  },

  setLocale(state, newLocale) {
    if (state.debug) {
      console.log(
        "store::index.js::setLocale::newLocale.locale=",
        newLocale.locale
      );
      console.log(
        "store::index.js::setLocale::newLocale.abbr=",
        newLocale.abbr
      );
    }
    state.locale = newLocale;
    // set according regions
    switch (newLocale.abbr) {
      case "en":
        state.regions = [
          "Europe", // 0
          "North America", // 1
          "South and Central America", // 2
          "Australia", // 3
          "Asia", // 4
          "Russia", // 5
          "Middle East", // 6
          "Africa" // 7
        ];
        break;
      case "de":
        state.regions = [
          "Europa", // 0
          "Nordamerica", // 1
          "Süd- u. Mittelamerica", // 2
          "Australien", // 3
          "Asien", // 4
          "Russland", // 5
          "Naher Osten", // 6
          "Afrika" // 7
        ];
        break;
      case "fr":
        state.regions = [
          "Europe", // 0
          "Amérique du Nord", // 1
          "Amérique du Sud et Centrale", // 2
          "Australie", // 3
          "Asie", // 4
          "Russie", // 5
          "Proche-Orient", // 6
          "Afrique" // 7
        ];
        break;
      case "it":
        state.regions = [
          "Europa", // 0
          "America del Nord", // 1
          "America del Sud e Centrale", // 2
          "Australia", // 3
          "Asia", // 4
          "Russia", // 5
          "Vicino Oriente", // 6
          "Africa" // 7
        ];
        break;
      default:
        state.regions = [
          "Europe", // 0
          "North America", // 1
          "South America", // 2
          "Australia", // 3
          "Asia", // 4
          "Russia", // 5
          "Middle East", // 6
          "Africa" // 7
        ];
        break;
    }
  },

  setRegionsDateRange(state, range) {
    if (state.debug) {
      console.log("store::index.js::setRegionsDateRange::range=", range);
    }
    state.regionsDateRange = range;
  },

  translateMenuItems(state) {
    if (state.debug) {
      console.log("store::index.js::translateMenuItems");
    }
    state.menuItems[0].title = this.app.i18n.t("overview");
    state.menuItems[1].title = this.app.i18n.t("qr-payment");
    state.menuItems[2].title = this.app.i18n.t("card-admin");
    state.menuItems[3].title = this.app.i18n.t("card-application");
    state.menuItems[4].title = this.app.i18n.t("settings");
    state.menuItems[5].title = this.app.i18n.t("quick-tour");
    state.menuItems[6].title = this.app.i18n.t("about-mx-banklets");
    state.menuItems[7].title = this.app.i18n.t("logout");
  },

  enableMenuItem(state, index) {
    if (state.debug) {
      console.log("store::index.js::enableMenuItem:index=", index);
    }
    state.menuItems[index].disabled = false;
  },

  disableMenuItem(state, index) {
    if (state.debug) {
      console.log("store::index.js::disableMenuItem:index=", index);
    }
    state.menuItems[index].disabled = true;
  },

  enableAllMenuItems(state) {
    if (state.debug) {
      console.log("store::index.js::enableAllMenuItems");
    }
    for (let i = 0; i < state.menuItems.length; i++) {
      state.menuItems[i].disabled = false;
    }
  },

  disableAllMenuItems(state) {
    if (state.debug) {
      console.log("store::index.js::disableAllMenuItems");
    }
    for (let i = 0; i < state.menuItems.length; i++) {
      state.menuItems[i].disabled = true;
    }
  },

  setWantsConfirmations(state, wantsConfirmations) {
    if (state.debug) {
      console.log(
        "store::index.js::setWantsConfirmations:wantsConfirmations=",
        wantsConfirmations
      );
    }
    state.wantsConfirmations = wantsConfirmations;
  },

  setWantsNotifications(state, wantsNotifications) {
    if (state.debug) {
      console.log(
        "store::index.js::setWantsNotifications::wantsNotifications=",
        wantsNotifications
      );
    }

    state.wantsNotifications = wantsNotifications;
  },

  setUser(state, newUser) {
    if (state.debug) {
      console.log("store::index.js::setUser::newUser=", newUser);
    }
    state.user = newUser;
  },

  setCardIndex(state, newIndex) {
    if (state.debug) {
      console.log("store::index.js::setCardIndex::newIndex=", newIndex);
    }
    state.cardIndex = newIndex;
  },

  setCardIndexByName(state, name) {
    if (state.debug) {
      console.log("store::index.js::setCardIndexByName::name=", name);
    }
    for (let i = 0; i < state.cards.length; i++) {
      if (state.cards[i].name === name) {
        state.cardIndex = i;
        return;
      }
    }
  },

  setCard(state, newCard) {
    if (state.debug) {
      console.log("store::index.js::setCard::newCard=", newCard);
    }
    for (let i = 0; i < state.cards.length; i++) {
      if (state.cards[i].name === newCard.name) {
        state.cards[i] = newCard;
        return;
      }
    }
  }
};
