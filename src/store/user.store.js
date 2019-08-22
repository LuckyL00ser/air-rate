import * as userService from '../services/user.service.js';

// TODO: set promises in actions into await/async code

const state = {
  status: {
    loggedIn: false,
  },
  userData: {},
};

const actions = {
  login({ dispatch, commit }, { username, password }) {
    commit('loggingIn');
    userService.login(username, password)
      .then(
        (data) => {
          commit('loggedIn', data);
          dispatch('alert/success', 'Zalogowano', { root: true });
        },
      )
      .catch(
        () => {
          commit('loginFailed');
        },
      );
  },
  logout({ commit }) {
    userService.logout()
      .then(() => commit('loggedOut'));
  },
  register({ dispatch, commit }, user) {
    commit('registering');
    userService.register(user)
      .then(
        (data) => {
          commit('loggedIn', data);
          dispatch('alert/success', 'Konto użytkownika zostało pomyślnie utworzone - zostałeś automatycznie zalogowany');
        },
      )
      .catch(
        () => {
          commit('registrationFailed');

        },
      );
  },
  getUserData({ commit }) {
    userService.getUserData()
      .then(
        (data) => {
          commit('setUserData', data);
        },
      )
      .catch(
        () => {
          commit('removeUserData');
        },
      );
  },
};

const mutations = {
  loggedIn(state, user) {
    state.userData = user.user;
    state.status = {
      loggedIn: true,
    };
  },
  loggedOut(state) {
    state.userData = null;
    state.status = {
      loggedIn: false,
    };
  },
  loggingIn(state) {
    state.userData = null;
    state.status = {
      processingLogin: true,
    };
  },
  loginFailed(state) {
    state.userData = null;
    state.status = {
      loggedIn: false,
    };
  },
  setUserData(state, user) {
    state.userData = user;
    state.status= {
      loggedIn: true
    }
  },
  removeUserData(state) {
    state.userData = null;
    state.status = {
      loggedIn: false,
    };
  },
  registering(state) {
    state.userData = null;
    state.status = {
      processingRegistration: true,
    };
  },
  registrationFailed(state) {
    state.userData = null;
    state.status = {
      loggedIn: false,
    };
  },
};

export const user = {
  namespaced: true,
  state,
  actions,
  mutations,
};
