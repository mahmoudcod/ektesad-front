const axios = require('axios');

const api = axios.create({
  baseURL: `${process.env.API_BASE}`
});

module.exports = {
  getSettings: async () => {
    try {
      const { data: settings } = await api.post('graphql', {
        query: `
          query getSettings {
            Settings :settings {
              facebook
              googlePlus
              pinterest
              twitter
              email
              phone
              appLogo
            }
          }
        `
      });
      return settings;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
};
