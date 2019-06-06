<template>
<div class="uploader">
  <input class="uploader-input"
         type="file"
         ref="input"
         :multiple="multiple"
         @change="onInputChange">
  <v-card flat
          color="blue-grey lighten-5">
    <v-card-text class="uploader-area pa-0"
                 @click="cardClicked">
      <v-container fluid
                   grid-list-md>
        <v-layout row
                  wrap>
          <v-flex xs12
                  v-if="isEmpty"
                  class="uploader-empty-placeholder blue-grey--text">
            <v-icon x-large
                    color="blue-grey">cloud_upload</v-icon>
            <div>{{message}}</div>
          </v-flex>
          <v-flex xs6
                  sm3
                  xl2
                  v-for="file in files"
                  :key="file.name">
            <VUploadItem :item="file"
                         :uploadUrl="config.uploadUrl"
                         :removeParam="config.removeParam"
                         :token="config.token"
                         @itemUploaded="onItemUpload"
                         @itemRemoved="onItemRemove">
            </VUploadItem>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-alert color="error" :value="errorMessage">
      {{errorMessage}}
    </v-alert>
  </v-card>
</div>
</template>

<script>
import api from '../api';
import VUploadItem from './VUploadItem';

export default {
  name: 'VUploader',
  components: {
    VUploadItem,
  },
  props: {
    config: {
      type: Object,
      default() {
        return {};
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      files: [],
      placeholderMessage: 'Add files for upload',
      errorMessage: null,
    };
  },
  computed: {
    isEmpty() {
      return this.files.length === 0;
    },
    message() {
      return this.config.emptyPlaceholderMessage || this.placeholderMessage;
    },
  },
  methods: {
    cardClicked() {
      this.errorMessage = null;
      this.$refs.input.click();
    },
    onInputChange(evt) {
      if (!evt.target.files) return;

      const files = Object.values(evt.target.files);
      const validFiles = this.validateInput(files);
      validFiles.forEach(file => this.files.push(file));
    },
    onItemRemove(item) {
      const idxToRemove = this.files.findIndex(file => file.name === item.name);
      this.files.splice(idxToRemove, 1);
      this.$emit('itemRemoved', item);
      this.$refs.input.value = '';
    },
    onItemUpload(item) {
      this.$emit('itemUploaded', item);
    },
    reset() {
      this.files = [];
    },
    validateInput(input) {
      const names = input.map(item => item.name);
      const duplicateItems = [];
      let errorMessage = '';

      names.forEach((name) => {
        const existing = this.files.find(file => file.name === name);
        if (existing) duplicateItems.push(name);
      });

      if (duplicateItems.length) errorMessage = 'Following files are already added: ';

      duplicateItems.forEach((item) => {
        const idxToRemove = input.findIndex(file => file.name === item);
        input.splice(idxToRemove, 1);
      });

      errorMessage += duplicateItems.join(', ');
      this.errorMessage = errorMessage;

      if (input.length > this.limit) {
        input.splice(this.limit);
        this.errorMessage += `${this.limit} files can be added at once`;
      }

      return input;
    },
  },
  mounted() {
    api.configure(this.config);
  },
};
</script>

<style lang="stylus">
.uploader {
  position: relative;

  .uploader-area {
    border: 2px dashed rgba(black, 0.1);
    cursor: pointer;
  }

  .uploader-input {
    position: absolute;
    display: none;
  }

  .uploader-empty-placeholder {
    text-align: center;
    font-size: 32px;
    color: $blue-grey;
  }
}
</style>
