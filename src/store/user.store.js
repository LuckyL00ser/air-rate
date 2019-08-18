import * as userService from '../services/user.service.js';
// import router from '../router';

//TODO: set promises in actions into await/async code
//TODO: fix error when token expires and user stays logged

let savedUser = JSON.parse(localStorage.getItem('user'));
userService.setAuthorizationToken(
  JSON.parse(localStorage.getItem('token')),
);
if(savedUser){
  userService.getUserData()
    .catch((response)=>{
      console.log('expired Token');
      userService.removeAuthorizationToken();
      userService.removeUserData();
      savedUser=null;
    })
}


const state = {
  status: {
    loggedIn: !!savedUser,
  },
  userData: savedUser,
};

const actions = {
  login({ dispatch, commit }, { username, password }) {
    commit('loggingIn');
    userService.login(username, password)
      .then(
        (data) => {
          commit('loggedIn', data);
          dispatch('alert/success','Zalogowano',{root: true});
        },
      )
      .catch(
        (error) => {
          dispatch('alert/error', error, { root: true });
          commit('loginFailed');
        },
      );
  },
  logout({ commit }) {
    userService.logout();
    commit('loggedOut');
  },
  register({ dispatch, commit }, user) {
    commit('registering');
    userService.register(user)
      .then(
        data => {
          commit('loggedIn',data)
          dispatch('alert/success','Konto użytkownika zostało pomyślnie utworzone - zostałeś automatycznie zalogowany');
        },
      )
      .catch(
        (error) => {
          commit('registrationFailed');
          dispatch('alert/error', error, { root: true });
        },
      );
  },
  getUserData({dispatch, commit }) {
    userService.getUserData()
      .then(
        data => {
          commit('setUserData',data);
        }
      )
      .catch(
        error=>dispatch('alert/error',error, {root: true})
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
  setUserData(state, user){
    state.userData=user.user;
  },
  registering(state){
    state.userData=null;
    state.status={
      processingRegistration: true
    }
  },
  registrationFailed(state) {
    state.userData = null;
    state.status = {
      loggedIn: false
    }
  },
};

export const user = {
  namespaced: true,
  state,
  actions,
  mutations,
};
