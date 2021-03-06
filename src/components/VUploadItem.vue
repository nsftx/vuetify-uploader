<template>
  <div class="upload-item"
       @click.stop>
    <v-btn small
           dark
           depressed
           class="upload-item-remove ma-0"
           color="blue-grey lighten-4"
           @click="removeFile">
      <v-icon>close</v-icon>
    </v-btn>
    <v-card flat
            tile
            class="upload-item-card">
      <v-img v-if="isImage"
             :src="preview"
             class="upload-item-image"
             height="120px"
             position="top" />
      <v-icon v-else
              x-large
              class="upload-item-icon">
        {{ previewIcon }}
      </v-icon>
      <v-divider />
      <v-card-text class="upload-item-details pa-2">
        <div>{{ sizePretty }}</div>
        <div class="upload-item-name">{{ file.name }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-progress-circular v-if="uploading"
                             :width="2"
                             indeterminate
                             class="ma-0"
                             size="24" />
        <v-icon v-if="uploadSuccess"
                color="green darken-2">check_circle</v-icon>
        <v-tooltip v-if="uploadError"
                   left>
          <template v-slot:activator="{ on }">
            <v-icon color="red darken-2"
                    v-on="on">error</v-icon>
          </template>
          <span>{{ errorMessage }}</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import prettyBytes from 'pretty-bytes';
import api from '../api';

const iconMapper = {
  image: 'image',
  audio: 'audiotrack',
  application: 'insert_drive_file',
  video: 'videocam',
};

export default {
  name: 'VUploadItem',
  props: {
    item: {
      type: File,
      default() {
        return {};
      },
    },
    uploadUrl: {
      type: String,
      default: '',
    },
    removeParam: {
      type: String,
      default: 'id',
    },
  },
  data() {
    return {
      uploading: false,
      uploadFinished: false,
      uploadPassed: false,
      uploadFailed: false,
      preview: {},
      errorMessage: null,
      file: this.item,
    };
  },
  computed: {
    type() {
      return this.item.type.split('/')[0];
    },
    isImage() {
      return this.type === 'image';
    },
    previewIcon() {
      return iconMapper[this.type];
    },
    sizePretty() {
      return prettyBytes(this.item.size);
    },
    uploadSuccess() {
      return this.uploadFinished && this.uploadPassed;
    },
    uploadError() {
      return this.uploadFinished && this.uploadFailed;
    },
  },
  mounted() {
    this.getPreview();
    this.uploadFile();
  },
  methods: {
    getPreview() {
      if (!this.isImage) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.preview = e.target.result;
      };

      reader.readAsDataURL(this.file);
    },
    uploadFile() {
      this.uploading = true;
      api.uploadFile(this.file).then((result) => {
        this.uploadPassed = true;
        this.file.id = result.data.id;
        this.$emit('itemUploaded', result.data);
      }).catch((err) => {
        this.uploadFailed = true;
        this.errorMessage = err.response.data.message;
      }).finally(() => {
        this.uploading = false;
        this.uploadFinished = true;
      });
    },
    removeFile() {
      if (this.uploadFailed) {
        this.$emit('itemRemoved', this.file);
        return;
      }

      this.uploading = true;
      this.uploadFinished = false;
      this.uploadPassed = false;
      this.uploadFailed = false;

      api.removeFile(this.file).then(() => {
        this.$emit('itemRemoved', this.file);
      }).catch((err) => {
        this.uploadFailed = true;
        this.uploading = false;
        this.uploadFinished = true;
        this.errorMessage = err.response.data.message;
      });
    },
  },
};
</script>

<style lang="scss">
  .upload-item {
    position: relative;
    border: 1px solid rgba(black, 0.1);
    cursor: default;

    .upload-item-remove {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 3;
      min-width: 40px;
      border-radius: 0;

      &:hover {
        position: absolute !important;
      }
    }

    .upload-item-icon {
      position: absolute;
      width: 100%;
      height: 100%;
      font-size: 64px !important;
    }

    .upload-item-image {
      z-index: 2;
    }

    .upload-item-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

.theme--dark {
  .upload-item-card {
    background: #2d3038 !important;
  }
}
</style>
