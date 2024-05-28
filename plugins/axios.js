import * as axios from 'axios';
import Vue from 'vue';

export default async ({ app }) => {
  const optionsApi = {
    baseURL: process.env.API_BASE
  };

  const optionsWebsiteFront = {
    baseURL: process.env.FRONTEND_BASE
  };

  const optionsDashboard = {
    baseURL: process.env.DASHBOARD_BASE
  };

  let axiosApi = axios.create(optionsApi);
  let axiosFront = axios.create(optionsWebsiteFront);
  let axiosBoard = axios.create(optionsDashboard);

  Vue.prototype.$axios = axios;
  app.$axios = axios;
  Vue.$axios = axios;

  Vue.prototype.$axiosApi = axiosApi;
  app.$axiosApi = axiosApi;
  Vue.$axiosApi = axiosApi;

  Vue.prototype.$axiosFront = axiosFront;
  app.$axiosFront = axiosFront;
  Vue.$axiosFront = axiosFront;

  Vue.prototype.$axiosBoard = axiosBoard;
  app.$axiosBoard = axiosBoard;
  Vue.$axiosBoard = axiosBoard;
};
