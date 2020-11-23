<template>
  <div class="content">
    <mx-overline>
      {{ $t("card-admin") }}
    </mx-overline>
    <v-card class="mx-4 mt-3 mb-6 py-0" elevation="2">
      <v-card-text>
        {{ $t("select-card") }}
        <v-select
          class="inp-select"
          v-model="card"
          :items="cards"
          item-text="name"
          item-value="id"
          return-object
          single-line
          :menu-props="{ offsetY: true }"
          attach=".inp-select"
          @change="cardChanged(card.id)"
        ></v-select>
      </v-card-text>
    </v-card>
    <v-btn
      color="primary"
      class="info--text btn"
      large
      rounded
      @click="adjustLimits()"
      elevation="6"
      :disabled="disabled || card.locked"
    >
      <v-icon left>
        mdi-format-list-checkbox
      </v-icon>
      {{ $t("adjust-limits") }}</v-btn
    >
    <v-btn
      color="primary"
      class="info--text btn"
      large
      rounded
      @click="regionSettings()"
      elevation="6"
      :disabled="disabled || card.locked"
    >
      <v-icon left> mdi-earth </v-icon>{{ $t("region-settings") }}</v-btn
    >
    <v-btn
      color="primary"
      outlined
      large
      rounded
      class="primary--text btn"
      @click="lockCard(!card.locked)"
      elevation="6"
      :disabled="disabled"
    >
      <v-icon v-if="card.locked" left> mdi-lock-open </v-icon>
      <v-icon v-else left> mdi-lock </v-icon>
      {{ $t(card.locked ? "unlock-card" : "lock-card") }}</v-btn
    >
    <v-btn
      color="primary"
      outlined
      large
      rounded
      class="primary--text btn"
      @click="requestNewPin()"
      elevation="6"
      :disabled="disabled || card.locked"
    >
      <v-icon left> mdi-pin </v-icon>{{ $t("new-pin") }}</v-btn
    >

    <!-- adjust-limits dialog -->
    <v-dialog
      v-model="adjustLimitsDialog"
      class="pt-4"
      persistent
      max-width="340"
    >
      <v-card width="340" class="">
        <v-card-text class="pt-4">
          <strong> {{ $t("card") }}: </strong>
          <br />
          {{ card.name }}
        </v-card-text>
        <v-card-text>
          <v-text-field
            v-model="monthlyLimit"
            :label="$t('monthly-limit')"
            type="number"
            required
            clearable
            prepend-icon="mdi-arrow-expand-vertical"
            :disabled="adjustLimitsDisabled"
          ></v-text-field>
          <v-text-field
            v-model="dailyLimit"
            :label="$t('daily-limit')"
            type="number"
            required
            clearable
            prepend-icon="mdi-arrow-collapse-vertical"
            :disabled="adjustLimitsDisabled"
          ></v-text-field>
        </v-card-text>
        <v-card-text class="btn-group mt-n6">
          <div class="cb">
            <v-btn
              id="btn-cancel"
              class="btn-cancel"
              text
              @click="adjustLimitsCancel()"
              :disabled="adjustLimitsDisabled"
              >{{ $t("cancel") }}</v-btn
            >
          </div>
          <div class="sb">
            <v-btn
              id="btn-save"
              color="primary"
              class="primary--text btn-save"
              text
              @click="adjustLimitsSave()"
              :disabled="adjustLimitsDisabled"
              >{{ $t("save") }}</v-btn
            >
          </div>
          <div class="rb">
            <v-btn
              id="btn-reset"
              class="btn-reset"
              text
              @click="adjustLimitsReset()"
              :disabled="adjustLimitsDisabled"
              >{{ $t("reset") }}</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- end adjust-limits dialog -->

    <!-- region-settings dialog -->
    <v-dialog
      v-model="regionSettingsDialog"
      class="pt-4"
      persistent
      max-width="340"
    >
      <v-card width="340" class="">
        <v-card-text class="pt-4">
          <strong> {{ $t("card") }}: </strong>
          <br />
          {{ card.name }}
        </v-card-text>
        <v-card-text class="pb-0 pt-2">
          <v-checkbox
            v-for="region in regions"
            :key="region"
            v-model="selected"
            :label="region"
            :value="region"
            class="ma-0 mt-n4 pa-0"
            :disabled="regionSettingsDisabled"
          ></v-checkbox>
          <v-menu
            ref="datePicker"
            v-model="datePicker"
            :close-on-content-click="false"
            :return-value.sync="dateRange"
            transition="scale-transition"
            offset-y
            min-width="290px"
            :disabled="regionSettingsDisabled"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-combobox
                v-model="dateRange"
                multiple
                chips
                :label="$t('valid-from-to')"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :disabled="regionSettingsDisabled"
              ></v-combobox>
            </template>
            <v-date-picker
              v-model="dateRange"
              range
              elevation="6"
              color="primary"
              first-day-of-week="1"
              :locale="locale"
              no-title
              scrollable
              :disabled="regionSettingsDisabled"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="$refs.datePicker.save([])"
                >{{ $t("clear") }}
              </v-btn>
              <v-btn text color="primary" @click="datePicker = false">
                {{ $t("cancel") }}
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.datePicker.save(dateRange)"
              >
                {{ $t("ok") }}
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-card-text>
        <v-card-text class="btn-group mt-0">
          <div class="cb">
            <v-btn
              id="btn-cancel"
              class="btn-cancel"
              text
              @click="regionSettingsCancel()"
              :disabled="regionSettingsDisabled"
              >{{ $t("cancel") }}</v-btn
            >
          </div>
          <div class="sb">
            <v-btn
              id="btn-save"
              color="primary"
              class="primary--text btn-save"
              text
              @click="regionSettingsSave()"
              :disabled="regionSettingsDisabled"
              >{{ $t("save") }}</v-btn
            >
          </div>
          <div class="rb">
            <v-btn
              id="btn-reset"
              class="btn-reset"
              text
              @click="regionSettingsReset()"
              :disabled="regionSettingsDisabled"
              >{{ $t("reset") }}</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- end region-settings dialog -->

    <!-- confirmation dialog -->
    <v-dialog v-model="confirmationDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          {{ $t("confirmation") }}
        </v-card-title>
        <v-card-text>
          {{ $t("confirm-cancel") }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="confirm('no')">
            {{ $t("no") }}
          </v-btn>
          <v-btn color="green darken-1" text @click="confirm('yes')">
            {{ $t("yes") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end confirmation dialog -->

    <!-- alert dialog -->
    <v-alert
      :value="alert"
      class="alert primary--text"
      elevation="10"
      :type="alertType"
      transition="scale-transition"
    >
      <v-icon slot="prepend" class="alert-icon primary--text">
        {{ alertIcon }}
      </v-icon>
      {{ alertText }}
    </v-alert>
    <!-- end alert dialog -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      card: this.$store.state.cards[this.$store.state.cardIndex],
      cards: this.$store.state.cards,
      disabled: false,
      // confirmation stuff...
      confirmationDialog: false,
      confirmationContext: "",
      // alert stuff...
      alert: false,
      alertType: "success",
      alertText: this.$t("changes-saved-success"),
      alertIcon: "mdi-information-outline",
      // adjust-limits stuff...
      adjustLimitsDialog: false,
      monthlyLimit: this.$store.state.cards[this.$store.state.cardIndex].limits
        .monthly,
      dailyLimit: this.$store.state.cards[this.$store.state.cardIndex].limits
        .daily,
      initMonthlyLimit: null,
      initDailyLimit: null,
      adjustLimitsDisabled: false,
      // region-settings stuff...
      regionSettingsDialog: false,
      datePicker: false,
      dateRange: this.$store.state.regionsDateRange,
      locale: this.$store.state.locale.abbr,
      regions: this.$store.state.regions,
      selected: null,
      initSelected: null,
      initDateRange: null,
      regionSettingsDisabled: false
    };
  },

  mounted() {
    // console.log("mounted");
    this.$store.commit("setCurrentPage", "card-admin");
    this.$store.commit("enableAllMenuItems");
    this.$store.commit("disableMenuItem", 2);
  },

  destroyed() {
    // console.log("destroyed");
    this.$store.commit("enableMenuItem", 2);
  },

  methods: {
    /*------------ general methods --------------------*/

    cardChanged(id) {
      // console.log("cardChanged::id=", id);
      this.$store.commit("setCardIndex", id);
      this.card = this.$store.state.cards[this.$store.state.cardIndex];
      // adjust-limits...
      this.monthlyLimit = this.$store.state.cards[
        this.$store.state.cardIndex
      ].limits.monthly;
      this.dailyLimit = this.$store.state.cards[
        this.$store.state.cardIndex
      ].limits.daily;
      this.initMonthlyLimit = this.monthlyLimit;
      this.initDailyLimit = this.dailyLimit;
      // region-settings...
      this.selected = this.selectedRegions();
      this.initSelected = this.selected;
      this.$store.commit("setRegionsDateRange", []);
      this.dateRange = this.$store.state.regionsDateRange;
      this.initDateRange = this.dateRange;
    },

    setAlertType(type) {
      switch (type) {
        case "lock":
          this.alertType = "success";
          this.alertIcon = "mdi-information-outline";
          this.alertText = this.$t("card-lock-success");
          break;
        case "unlock":
          this.alertType = "success";
          this.alertIcon = "mdi-information-outline";
          this.alertText = this.$t("card-unlock-success");
          break;
        case "newPin":
          this.alertType = "success";
          this.alertIcon = "mdi-information-outline";
          this.alertText = this.$t("new-pin-request-success");
          break;
        case "adjustLimitsSuccess":
          this.alertType = "success";
          this.alertIcon = "mdi-information-outline";
          this.alertText = this.$t("changes-saved-success");
          break;
        case "adjustLimitsWarning":
          this.alertType = "warning";
          this.alertIcon = "mdi-alert-outline";
          this.alertText = this.$t("no-changes-no-save");
          break;
        case "monthlyLimitRangeViolation":
          this.alertType = "error";
          this.alertIcon = "mdi-alert-outline";
          this.alertText = this.$t("monthly-limit-range-violation", {
            from: this.$store.state.monthlyLimitRange.from,
            to: this.$store.state.monthlyLimitRange.to
          });
          break;
        case "dailyLimitRangeViolation":
          this.alertType = "error";
          this.alertIcon = "mdi-alert-outline";
          this.alertText = this.$t("daily-limit-range-violation", {
            from: this.$store.state.dailyLimitRange.from,
            to: this.$store.state.dailyLimitRange.to
          });
          break;
        case "dailyGreaterThanMonthlyLimit":
          this.alertType = "error";
          this.alertIcon = "mdi-alert-outline";
          this.alertText = this.$t("daily-greater-than-monthly-limit");
          break;
        case "regionSettingsSuccess":
          this.alertType = "success";
          this.alertIcon = "mdi-information-outline";
          this.alertText = this.$t("changes-saved-success");
          break;
        case "regionSettingsWarning":
          this.alertType = "warning";
          this.alertIcon = "mdi-alert-outline";
          this.alertText = this.$t("no-changes-no-save");
          break;
        default:
          break;
      }
    },

    closeAlert() {
      this.alert = false;
      this.disabled = false;
    },

    confirm(yesNo) {
      // console.log("confirm::yesNo=", yesNo);
      this.confirmationDialog = false;
      if (yesNo === "yes") {
        switch (this.confirmationContext) {
          case "adjustLimits":
            this.monthlyLimit = this.initMonthlyLimit;
            this.dailyLimit = this.initDailyLimit;
            this.adjustLimitsDialog = false;
            break;
          case "regionSettings":
            this.selected = this.initSelected;
            this.dateRange = this.initDateRange;
            this.regionSettingsDialog = false;
            break;
          default:
            break;
        }
      }
    },

    /*------------ lock/unlock card methods --------------------*/

    lockCard(bool) {
      // console.log("lockCard::bool=", bool);
      // deep clone card
      const cardString = JSON.stringify(this.card);
      const newCard = JSON.parse(cardString);
      newCard.locked = bool;
      this.$store.commit("setCard", newCard);
      this.card = this.$store.state.cards[this.$store.state.cardIndex];
      if (this.$store.state.wantsNotifications) {
        if (bool) {
          this.setAlertType("lock");
        } else {
          this.setAlertType("unlock");
        }
        this.disabled = true;
        this.alert = true;
        setTimeout(this.closeAlert, 2000);
      }
    },

    /*------------ new pin methods --------------------*/

    requestNewPin() {
      if (this.$store.state.wantsNotifications) {
        this.setAlertType("newPin");
        this.disabled = true;
        this.alert = true;
        setTimeout(this.closeAlert, 2000);
      }
    },

    /*------------ adjust limits methods --------------------*/

    adjustLimits() {
      // console.log("adjustLimits");
      this.confirmationContext = "adjustLimits";
      this.initMonthlyLimit = this.monthlyLimit;
      this.initDailyLimit = this.dailyLimit;
      this.adjustLimitsDialog = true;
      this.adjustLimitsDisabled = false;
    },

    limitsPlausiChecks() {
      // console.log("limitsPlausiChecks");
      if (
        parseInt(this.monthlyLimit) <
          parseInt(this.$store.state.monthlyLimitRange.from) ||
        parseInt(this.monthlyLimit) >
          parseInt(this.$store.state.monthlyLimitRange.to)
      )
        return "monthlyLimitRangeViolation";

      if (
        parseInt(this.dailyLimit) <
          parseInt(this.$store.state.dailyLimitRange.from) ||
        parseInt(this.dailyLimit) >
          parseInt(this.$store.state.dailyLimitRange.to)
      )
        return "dailyLimitRangeViolation";

      if (parseInt(this.dailyLimit) > parseInt(this.monthlyLimit))
        return "dailyGreaterThanMonthlyLimit";

      return "pass";
    },

    haveLimitsChanged() {
      // console.log("haveLimitsChanged");
      if (this.initMonthlyLimit !== this.monthlyLimit) return true;
      if (this.initDailyLimit !== this.dailyLimit) return true;
      return false;
    },

    adjustLimitsCancel() {
      // console.log("adjustLimitsCancel");
      if (this.$store.state.wantsConfirmations && this.haveLimitsChanged()) {
        this.confirmationDialog = true;
      } else {
        this.monthlyLimit = this.initMonthlyLimit;
        this.dailyLimit = this.initDailyLimit;
        this.adjustLimitsDialog = false;
      }
    },

    adjustLimitsSave() {
      // console.log("adjustLimitsSave");
      const plausiResult = this.limitsPlausiChecks();
      if (this.haveLimitsChanged() && plausiResult === "pass") {
        this.adjustLimitsDisabled = true;
        const cardString = JSON.stringify(this.card);
        const newCard = JSON.parse(cardString);
        newCard.limits.monthly = this.monthlyLimit;
        newCard.limits.daily = this.dailyLimit;
        this.$store.commit("setCard", newCard);
        this.card = this.$store.state.cards[this.$store.state.cardIndex];
        if (this.$store.state.wantsNotifications) {
          this.setAlertType("adjustLimitsSuccess");
          this.alert = true;
          setTimeout(this.closeAlertAndAdjustLimitsDialog, 2000);
        } else {
          this.adjustLimitsDialog = false;
        }
      } else {
        if (plausiResult === "pass") {
          if (this.$store.state.wantsNotifications) {
            this.setAlertType("adjustLimitsWarning");
            this.alert = true;
            setTimeout(this.closeAlert, 2000);
          } else {
            this.adjustLimitsDialog = false;
          }
        } else {
          this.setAlertType(plausiResult);
          this.alert = true;
          setTimeout(this.closeAlert, 4000);
        }
      }
    },

    closeAlertAndAdjustLimitsDialog() {
      this.alert = false;
      this.adjustLimitsDialog = false;
    },

    adjustLimitsReset() {
      // console.log("reset");
      if (this.haveLimitsChanged()) {
        this.monthlyLimit = this.initMonthlyLimit;
        this.dailyLimit = this.initDailyLimit;
      }
    },

    /*------------ region settings methods --------------------*/

    regionSettings() {
      // console.log("regionSettings");
      this.confirmationContext = "regionSettings";
      this.selected = this.selectedRegions();
      this.initSelected = this.selected;
      this.initDateRange = this.dateRange;
      this.regionSettingsDialog = true;
      this.regionSettingsDisabled = false;
    },

    selectedRegions() {
      let sr = [];
      for (let i = 0; i < this.regions.length; i++) {
        if (this.isRegionCovered(i, this.card)) {
          sr.push(this.regions[i]);
        }
      }
      return sr;
    },

    isRegionCovered(regionIndex, card) {
      for (let i = 0; i < card.regions.length; i++) {
        if (card.regions[i] === regionIndex) {
          return true;
        }
      }
      return false;
    },

    haveRegionSettingsChanged() {
      // console.log("haveRegionSettingsChanged");
      if (!this.arraysEqual(this.initSelected, this.selected)) return true;
      if (!this.arraysEqual(this.initDateRange, this.dateRange)) return true;
      return false;
    },

    regionSettingsCancel() {
      // console.log("regionSettingsCancel");
      if (
        this.$store.state.wantsConfirmations &&
        this.haveRegionSettingsChanged()
      ) {
        this.confirmationDialog = true;
      } else {
        this.selected = this.initSelected;
        this.dateRange = this.initDateRange;
        this.regionSettingsDialog = false;
      }
    },

    regionSettingsSave() {
      // console.log("regionSettingsSave");
      if (this.haveRegionSettingsChanged()) {
        this.regionSettingsDisabled = true;
        const cardString = JSON.stringify(this.card);
        const newCard = JSON.parse(cardString);
        newCard.regions = [];
        let idx;
        for (let i = 0; i < this.selected.length; i++) {
          idx = this.indexOfRegion(this.selected[i]);
          if (idx >= 0) {
            newCard.regions.push(idx);
          }
        }
        this.$store.commit("setCard", newCard);
        this.card = this.$store.state.cards[this.$store.state.cardIndex];
        this.$store.commit("setRegionsDateRange", this.dateRange);
        if (this.$store.state.wantsNotifications) {
          this.setAlertType("regionSettingsSuccess");
          this.alert = true;
          setTimeout(this.closeAlertAndRegionSettingsDialog, 2000);
        } else {
          this.regionSettingsDialog = false;
        }
      } else {
        if (this.$store.state.wantsNotifications) {
          this.setAlertType("regionSettingsWarning");
          this.alert = true;
          setTimeout(this.closeAlert, 2000);
        } else {
          this.regionSettingsDialog = false;
        }
      }
    },

    closeAlertAndRegionSettingsDialog() {
      this.alert = false;
      this.regionSettingsDialog = false;
    },

    regionSettingsReset() {
      // console.log("regionSettingsReset");
      if (this.haveRegionSettingsChanged()) {
        this.selected = this.initSelected;
        this.dateRange = this.initDateRange;
      }
    },

    arraysEqual(a, b) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length !== b.length) return false;
      // If you don't care about the order of the elements inside
      // the array, you should sort both arrays here.
      // Please note that calling sort on an array will modify that array.
      // you might want to clone your array first.
      a.sort();
      b.sort();
      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    },

    // return index of region in array of regions, -1 if not in array
    indexOfRegion(region) {
      for (let i = 0; i < this.regions.length; i++) {
        if (region === this.regions[i]) return i;
      }
      return -1;
    }
  }
};
</script>

<style scoped>
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;
}
.alert {
  position: absolute;
  width: 290px;
  top: 40px;
  left: 50%;
  margin: 0 0 0 -145px;
  z-index: 1001;
}
.alert-icon {
  padding: 0 1rem 0 0;
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
#btn-cancel,
#btn-save,
#btn-reset {
  height: 30px;
}
.btn-cancel,
.btn-reset {
  color: #666666;
}
.btn-group {
  display: grid;
  grid-template:
    "cb sb" 50%
    "rb ee" 50%;
}
.cb {
  grid-area: cb;
}
.sb {
  grid-area: sb;
}
.rb {
  grid-area: rb;
}
</style>
