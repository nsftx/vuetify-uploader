import Vue from 'vue';
import {
  Vuetify,
  VAlert,
  VApp,
  VCard,
  VGrid,
  VBtn,
  VIcon,
  VImg,
  VDivider,
  VProgressCircular,
  VResponsive,
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
    VImg,
    VProgressCircular,
    VResponsive,
    VTooltip,
  },
});
