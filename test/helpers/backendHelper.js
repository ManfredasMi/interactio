const root = `https://panel.interactio.dev`;
const { default: axios } = require("axios");
const timeouts = require("../staticValues/constants.json");

const request = axios.create({
  timeout: timeouts.requestTimeout
});

module.exports = {
  request,
  root,

  getInfo() {
    return request.get(`${root}/v3/info`).catch(error => error.response);
  }
};