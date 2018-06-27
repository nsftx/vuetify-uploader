import Vue from 'vue';
import {
  Vuetify,
  VAlert,
  VApp,
  VCard,
  VGrid,
  VBtn,
  VIcon,
  VDivider,
  VProgressCircular,
  VTooltip,
} from 'vuetify';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  components: {
    VAlert,
    VApp,
    VBtn,
    VCard,
    VDivider,
    VGrid,
    VIcon,
    VProgressCircular,
    VTooltip,
  },
});
