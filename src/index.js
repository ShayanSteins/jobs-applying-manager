import { createApp, h } from "vue";
import App from "./App.vue";

__VUE_OPTIONS_API__ = true;
__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

if (process.env.NODE_ENV !== "production") {
  __VUE_PROD_DEVTOOLS__ = true;
} else {
  __VUE_PROD_DEVTOOLS__ = false;
}

createApp({
  render: () => h(App),
}).mount("#app");
