# vuetify-uploader

> Upload component for Vuetify framework

## Installation

```bash
# npm
npm install @nsoft/vuetify-uploader
```

## Using

### Import

```javascript
import Vue from 'vue';
import { VUploader } from '@nsoft/vuetify-uploader';
import App from './App';

Vue.config.productionTip = false;
Vue.use(VUploader);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
```

### Import locally

```javascript
import { VUploader } from '@nsoft/vuetify-uploader';

export default {
  name: 'app',
  components: {
    VUploader,
  },
};
```

### Use in template

```html
<template>
  <div id="app">
    <VUploader/>
  </div>
</template>
```
