<template>
  <v-app id="app">
    <VUploader :multiple="true"
               :config="config"/>
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
      config: {
        url: 'http://localhost:8090/apps/c39fe7ef-5160-4266-92ab-4234048fde50/assets',
        removeParam: 'id',
        auth: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mjk5NDIwMDIsInN1YiI6ImFlZGU4OWIwLTU2ZDYtNDFhNi1iNzg5LWQ0NDhiYzI0ZGI2YSIsImVtYWlsIjoiZHppZGljLmxhbmFAbnNvZnQuY29tIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJyb2xlcyI6WyJhZG1pbiJdfSwidXNlcl9tZXRhZGF0YSI6eyJmdWxsX25hbWUiOiJMYW5hIETFvmlkacSHIn19.V5E-nabbn5MHKkaWLazgma2nOOlZ8ODosNdfEc4YbUg',
      },
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
