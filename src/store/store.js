import Vue from 'vue';
import Vuex from 'vuex';

import { user } from './user.store.js';
import { alert } from './alert.store.js';
import { measures } from './measures.store.js';
import axios from '../axios.config.js';
import * as userService from '../services/user.service';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    alert,
    user,
    measures,
  },
  actions: {
    initStore({ dispatch }) {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      userService.setAuthorizationToken(
        JSON.parse(localStorage.getItem('token')),
      );

      if (savedUser) {
        console.log(savedUser);
        dispatch('user/getUserData');
      }
    },
  },

});

axios.interceptors.response.use(response => response,
  (error) => {

    let errorMessage = error.message;
    if(error.response)
    switch (error.response.status) {
      case 404:
        errorMessage = 'Brak połączenia';
        break;
      case 401:
        errorMessage = 'Brak autoryzacji użytkownika';
        userService.removeUserData();
        userService.removeAuthorizationToken();
    }
    store.dispatch('alert/error', errorMessage);
    return error;
  });

export default store;
