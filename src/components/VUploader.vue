<template>
<div class="uploader">
  <input class="uploader-input"
         type="file"
         ref="input"
         :multiple="multiple"
         @change="onInputChange">
  <v-card flat color="blue-grey lighten-5">
    <v-card-text class="uploader-area"
                 @click="cardClicked">
      <v-container fluid
                   grid-list-md>
        <v-layout row
                  wrap>
          <v-flex xs6
                  sm3
                  lg2
                  xl1
                  v-for="file in files"
                  :key="file.name">
            <VUploadItem :file="file"
                         @remove="onItemRemove">
            </VUploadItem>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import { each, findIndex } from 'lodash';
import VUploadItem from './VUploadItem';

export default {
  name: 'VUploader',
  components: {
    VUploadItem,
  },
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      files: [],
    };
  },
  methods: {
    onInputChange(evt) {
      each(evt.target.files, file => this.files.push(file));
    },
    onItemRemove(fileName) {
      const idxToRemove = findIndex(this.files, file => file.name === fileName);
      this.files.splice(idxToRemove, 1);
    },
    cardClicked() {
      this.$refs.input.click();
    },
  },
};
</script>

<style lang="stylus">
.uploader {
  position: relative;

  .uploader-area {
    border: 2px dashed rgba(black, 0.1);
  }

  .uploader-input {
    position: absolute;
    display: none;
  }
}
</style>
