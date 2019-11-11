<template>
  <div class="uploader">
    <input ref="input"
           :multiple="multiple"
           class="uploader-input"
           type="file"
           @change="onInputChange">
    <v-card flat
            color="lighten-5"
            class="uploader-card">
      <v-card-text class="uploader-area pa-0"
                   @click="cardClicked">
        <v-container fluid>
          <v-row>
            <v-col v-if="isEmpty"
                   cols="12"
                   class="uploader-empty-placeholder blue-grey--text">
              <v-icon x-large
                      color="blue-grey"
                      class="upload-icon">cloud_upload</v-icon>
              <div>{{ message }}</div>
            </v-col>
            <v-col v-for="file in files"
                   :key="file.name"
                   cols="6"
                   sm="3"
                   xl="2">
              <VUploadItem :item="file"
                           :upload-url="config.uploadUrl"
                           :remove-param="config.removeParam"
                           :token="config.token"
                           @itemUploaded="onItemUpload"
                           @itemRemoved="onItemRemove" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-alert :value="isErrorVisible"
               color="error">
        {{ errorMessage }}
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
    isErrorVisible() {
      return Boolean(this.errorMessage);
    },
  },
  mounted() {
    api.configure(this.config);
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
      this.$refs.input.value = '';
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
};
</script>

<style lang="scss">
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
  }
}

.theme--dark {
  .uploader-area {
    background-color: #2d3038 !important;
    border-color: rgba(255,255,255,0.08) !important;
  }

  .uploader-empty-placeholder, .upload-icon {
    color: rgba(255, 255, 255, 0.85) !important;
  }
}
</style>
