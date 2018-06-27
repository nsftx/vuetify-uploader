import Vue from 'vue';
import {
  Vuetify,
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
