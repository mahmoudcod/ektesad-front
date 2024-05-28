export const state = () => ({
  settings: null
});

export const getters = {
  GET_SETTINGS: state => state.settings
};

export const mutations = {
  SET_SETTINGS: (state, settings) => {
    state.settings = settings;
  }
};
