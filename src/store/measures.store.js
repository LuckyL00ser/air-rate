import * as measuresService from '../services/measures.service.js';

const state = {

  current: null,
  hourly: null,
  daily: null,
  userHourly: null,
  userDaily: null,
  userDevices: null,
  userCurrent: null,

  fetchingMeasures: {
    hourly: false,
    daily: false,
    current: false,
    userDaily: false,
    userHourly: false,
    userDevices: false,
    userCurrent: false,
  },
};

const actions = {
  async getCurrentMeasures({ dispatch, commit }) {
    commit('startFetchingMeasure', 'current');
    try {
      const response = await measuresService.getCurrent();
      commit('setCurrentMeasures', response.data);
    } catch (e) {
      dispatch('alert/error', e, { root: true });
      commit('fetchingFailed', 'current');
    }
  },
  async getHourlyMeasures({ dispatch, commit },id) {
    commit('startFetchingMeasure', 'hourly');
    try {
      const response = await measuresService.getHourly(id);
      if(response.data.length==0)
        throw Error('Brak dziennych pomiarów dla tego czujnika')
      commit('setHourlyMeasures', response.data[0]);
    } catch (e) {
      dispatch('alert/error', e, { root: true });
      commit('fetchingFailed', 'hourly');
    }
  },
  async getDailyMeasures({ dispatch, commit },id) {
    commit('startFetchingMeasure', 'daily');
    try {
      const response = await measuresService.getDaily(id);
      if(response.data.length==0)
        throw Error('Brak dziennych pomiarów dla tego czujnika')
      commit('setDailyMeasures', response.data[0]);
    } catch (e) {
      dispatch('alert/error', e, { root: true });
      commit('fetchingFailed', 'daily');
    }
  },
  async getUserHourly({ dispatch, commit },id) {
    commit('startFetchingMeasure', 'userHourly');
    try {
      const response = await measuresService.getUserHourly(id);
      commit('setUserHourlyMeasures', response.data);
    } catch (e) {
      dispatch('alert/error', e, { root: true });
      commit('fetchingFailed', 'userHourly');
    }
  },
  async getUserDaily({ dispatch, commit },id) {
    commit('startFetchingMeasure', 'userDaily');
    try {
      const response = await measuresService.getUserDaily(id);
      commit('setUserDailyMeasures', response.data);
    } catch (e) {
      dispatch('alert/error', e, { root: true });
      commit('fetchingFailed', 'userDaily');
    }
  },
  async getUserDevices({ dispatch, commit,  rootState }) {
    commit('startFetchingMeasure', 'userDevices');
    try {
      //rootState.user.userData.slug
      const response = await measuresService.getUserDevices();
      commit('setUserDevices', response.data);
    } catch (e) {
      dispatch('alert/error', e, { root: true });
      commit('fetchingFailed', 'userDevices');
    }
  },
  async getUserCurrent({ dispatch, commit }) {
    commit('startFetchingMeasure', 'userCurrent');
    try {

      const response = await measuresService.getUserCurrent();
      commit('setUserCurrent', response.data);
    } catch (e) {
      dispatch('alert/error', e, { root: true });
      commit('fetchingFailed', 'userCurrent');
    }
  },

};

const mutations = {
  startFetchingMeasure(state, measure) {
    state.fetchingMeasures[measure] = true;
  },
  fetchingFailed(state, measure) {
    state.fetchingMeasures[measure] = false;
  },
  setCurrentMeasures(state, data) {
    state.current = data;
    if (state.fetchingMeasures.current) state.fetchingMeasures.current = false;
  },
  setHourlyMeasures(state, data) {
    state.hourly = data;
    if (state.fetchingMeasures.hourly) state.fetchingMeasures.hourly = false;
  },
  setDailyMeasures(state, data) {
    state.daily = data;
    if (state.fetchingMeasures.daily) state.fetchingMeasures.daily = false;
  },
  setUserHourlyMeasures(state, data) {
    state.userHourly = data;
    if (state.fetchingMeasures.userHourly) state.fetchingMeasures.userHourly = false;
  },
  setUserDailyMeasures(state, data) {
    state.userDaily = data;
    if (state.fetchingMeasures.userDaily) state.fetchingMeasures.userDaily = false;
  },
  setUserDevices(state, data) {
    state.userDevices = data;
    if (state.fetchingMeasures.userDevices) state.fetchingMeasures.userDevices = false;
  },
  setUserCurrent(state, data) {
    state.userCurrent = data;
    if (state.fetchingMeasures.userCurrent) state.fetchingMeasures.userCurrent = false;
  },

};

export const measures = {
  namespaced: true,
  state,
  actions,
  mutations,
};
