import { createApp } from "vue";
import { createPinia } from "pinia";
import VueDOMPurifyHTML from "vue-dompurify-html";
import { router } from "./routers";

import "@/shared/styles/base.scss";
import App from "./App.vue";

import i18n from "./i18n";

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);
app.use(VueDOMPurifyHTML); // 防止v-html进行xss注入
app.mount("#app");
