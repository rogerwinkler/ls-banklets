export const state = () => ({
  // output debug statements if "debug = true"
  debug: false,

  // the currently selected menu item, "" if none is selected
  bpKey: "musteralfred",

  // store for selected card
  cardIndex: 0,

  // available cards
  cards: [
    {
      name: "Mastercard Gold 1234-3456-2345-2341-99",
      limits: {
        monthly: 3000,
        daily: 600
      },
      regions: [0, 1],
      locked: false
    },
    {
      name: "Visa KSK/FDS 5230 3490 5107 9350",
      limits: {
        monthly: 10000,
        daily: 1500
      },
      regions: [0, 1, 3],
      locked: false
    },
    {
      name: "UBS CH88 0020 2829 Q080 8383 0",
      limits: {
        monthly: 2000,
        daily: 500
      },
      regions: [0],
      locked: false
    },
    {
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
    "Europe",         // 0
    "North America",  // 1
    "South America",  // 2
    "Australia",      // 3
    "Asia",           // 4
    "Russia",         // 5
    "Middle East",    // 6
    "Africa",         // 7
  ],

  // Accounts
  accounts: [
    "",
    "10.233.234.X2",
    "20.345.687.XX",
    "22.234.576.XY",
    "23.687.247.Z8",
    "43.142.234.24",
    "88.987.003.ZZ",
  ],

  // card types
  cardTypes: [
    "",
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
    "Amex Gold",
  ],

  // monthly / global limits
  limits: [
    "",
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
    50000,
  ]
});

export const mutations = {
  setBPKey(state, newBPKey) {
    if (state.debug) {
      console.log("store::index.js::setBPKey::newBPKey=", newBPKey);
    }
    state.bpKey = newBPKey;
  },

  setCardIndex(state, newIndex) {
    if (state.debug) {
      console.log("store::index.js::setCardIndex::newIndex=", newIndex);
    }
    state.cardIndex = newIndex;
  },

  setCardIndexByName(state, name) {
    if (state.debug) {
      console.log("store::index.js::setBPKey::name=", name);
    }
    for (let i=0; i<state.cards.length; i++) {
      if (state.cards[i].name === name) {
        state.cardIndex = i;
        return;
      }
    }
  },

  setCard(state, newCard) {
    if (state.debug) {
      console.log("store::index.js::setBPKey::newCard=", newCard);
    }
    for (let i=0; i<state.cards.length; i++) {
      if (state.cards[i].name === newCard.name) {
        state.cards[i]=newCard;
        return;
      }
    }
  }
};
