import Vue from "vue";
import VueI18n from "vue-i18n";

// locales...
import en from "~/locales/en.json";
import de from "~/locales/de.json";
import it from "~/locales/it.json";
import fr from "~/locales/fr.json";

Vue.use(VueI18n);

let i18nTmp;

export default ({ app, store }) => {
  // inject our i18n instance into the app root to be used in middleware
  // we assume a store/index.js file has been defined and the variable 'locale' defined on store, we'll go into this in detail in the next code snippet
  i18nTmp = new VueI18n({
    //construction a new VueI18n
    locale: store.state.locale,
    fallbackLocale: "de",
    silentTranslationWarn: true,
    messages: {
      //'locales' directory contains all the translations in the form of json files
      en,
      de,
      it,
      fr
    }
  });
  app.i18n = i18nTmp;
};

export const i18n = i18nTmp;
