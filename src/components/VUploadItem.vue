<template>
<div class="upload-item"
     @click.stop>
  <v-btn small
         dark
         depressed
         class="upload-item-remove ma-0"
         color="blue-grey lighten-4"
         @click="removeItem">
    <v-icon>close</v-icon>
  </v-btn>
  <v-card flat
          tile>
    <v-card-media class="upload-item-container pa-1"
                  height="150px">
      <v-icon x-large
              class="upload-item-icon">
        {{previewIcon}}
      </v-icon>
      <img class="upload-item-image"
           v-if="isImage"
           :src="preview">
    </v-card-media>
    <v-divider></v-divider>
    <v-card-text class="upload-item-details pa-2">
      <div>{{file.size}}</div>
      <div class="upload-item-name">{{file.name}}</div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-progress-circular v-if="uploading"
                           indeterminate
                           class="ma-0"
                           :width="2"
                           size="24">
    </v-progress-circular>
      <v-icon v-if="uploadSuccess"
              color="green darken-2">check_circle</v-icon>
      <v-icon v-if="uploadError"
              color="red darken-2">error</v-icon>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
const iconMapper = {
  image: 'image',
  audio: 'audiotrack',
  application: 'insert_drive_file',
  video: 'videocam',
};

export default {
  name: 'VUploadItem',
  props: {
    file: {
      type: File,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      uploading: false,
      uploadFinished: true,
      uploadPassed: false,
      uploadFailed: false,
      preview: null,
    };
  },
  computed: {
    type() {
      return this.file.type.split('/')[0];
    },
    isImage() {
      return this.type === 'image';
    },
    previewIcon() {
      return iconMapper[this.type];
    },
    uploadSuccess() {
      return this.uploadFinished && this.uploadPassed;
    },
    uploadError() {
      return this.uploadFinished && this.uploadFailed;
    },
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
    removeItem() {
      this.$emit('remove', this.file.name);
    },
  },
  mounted() {
    this.getPreview();
  },
};
</script>

<style lang="stylus">
.upload-item {
  position: relative;
  border: 1px solid rgba(black, 0.1);

  .upload-item-remove {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 3;
    min-width: 40px;
    border-radius: 0;
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
</style>
