import VUploader from './components/VUploader';

export default {
  VUploader: {
    install(Vue) {
      Vue.component(VUploader.name, VUploader);
    },
  },
};
