export const actions = {
  async nuxtServerInit({ commit }, { req, app, route }) {
    let { data: settings } = await app.$axiosFront.post(
      "/settings/get-settings"
    );
    commit("settings/SET_SETTINGS", settings.data);
  }
};
