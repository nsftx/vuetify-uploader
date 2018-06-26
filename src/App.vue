<template>
  <v-app id="app">
    <VUploader :multiple="true"></VUploader>
  </v-app>
</template>

<script>
import VUploader from './components/VUploader';

export default {
  name: 'App',
  components: {
    VUploader,
  },
  data() {
    return {
    };
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
