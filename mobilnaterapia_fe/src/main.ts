import App from "./App.vue";
import { createApp } from "vue";
import { pinia } from "./stores";
import { router } from "./router/router";
import { vuetify } from "./plugins/vuetify";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.component("VueDatePicker", VueDatePicker);

app.mount("#app");
