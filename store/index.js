export const state = () => ({
  // output debug statements if "debug = true"
  debug: false,

  // the currently selected menu item, "" if none is selected
  bpKey: "musteralfred",

  // store for selected card
  card: "Mastercard Gold 1234-3456-2345-2341-99",

  // available cards
  cards: [
    {
      name: "Mastercard Gold 1234-3456-2345-2341-99",
      limits: {
        monthly: 3000,
        daily: 600
      },
      regions: ["Europe", "North America"],
      blocked: false
    },
    {
      name: "Visa KSK/FDS 5230 3490 5107 9350",
      limits: {
        monthly: 10000,
        daily: 1500
      },
      regions: ["Europe", "North America", "Australia"],
      blocked: false
    },
    {
      name: "UBS CH88 0020 2829 Q080 8383 0",
      limits: {
        monthly: 2000,
        daily: 500
      },
      regions: ["Europe"],
      blocked: false
    },
    {
      name: "ZKB CH87 9483 8473 0000 7373 6",
      limits: {
        monthly: 5000,
        daily: 800
      },
      regions: ["Europe", "Russia", "Middle East"],
      blocked: false
    }
  ],

  // regions
  regions: [
    "Europe",
    "North America",
    "South America",
    "Australia",
    "Asia",
    "Russion",
    "Middle East",
    "Africa"
  ]
});

export const mutations = {
  setBPKey(state, newBPKey) {
    if (state.debug) {
      console.log("store::index.js::setBPKey::newBPKey=", newBPKey);
    }
    state.bpKey = newBPKey;
  },

  setCard(state, newCard) {
    if (state.debug) {
      console.log("store::index.js::setBPKey::newCard=", newCard);
    }
    state.card = newCard;
  }
};
