import Vue from 'vue';
import VueI18n from 'vue-i18n';

// language defined...
import en from '~/locales/en.json';
import de from '~/locales/de.json';
import it from '~/locales/it.json';
import fr from '~/locales/fr.json';

Vue.use(VueI18n);

export default ({ app, store }) => {
  // inject our i18n instance into the app root to be used in middleware
  // we assume a store/index.js file has been defined and the variable 'locale' defined on store, we'll go into this in detail in the next code snippet
  app.i18n = new VueI18n({ //construction a new VueI18n
    locale: store.state.locale,
    fallbackLocale: 'de',
    silentTranslationWarn: true,
    messages: {
      //'locales' directory contains all the translations in the form of json files
      en,
      de,
      it,
      fr
    }
  })
}