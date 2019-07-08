import axios from 'axios';

class Api {
  configure(config) {
    this.uploadUrl = config.uploadUrl || config.url;
    this.removeUrl = config.removeUrl || config.url;
    this.removeParam = config.removeParam || null;
    this.auth = config.auth || null;

    if (this.auth) {
      axios.defaults.headers.common.Authorization = this.auth;
    }
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return axios.post(this.uploadUrl, formData);
  }

  removeFile(file) {
    const url = this.removeUrl;
    const params = {};

    if (this.removeParam && file[this.removeParam]) {
      params.id = file[this.removeParam];
    }

    return axios.delete(url, {
      params,
    });
  }
}

export default new Api();
