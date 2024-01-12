import { createI18n } from "vue-i18n";

import header from "./header";

const messages = {
  zh: {
    header: header.zh,
  },
  en: {
    header: header.en,
  },
};

const i18n = createI18n({
  globalInjection: true,
  locale: "zh",
  legacy: false,
  messages,
});

export default i18n;
