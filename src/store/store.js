import Vue from 'vue';
import Vuex from 'vuex';

import {user} from './user.store.js';
import {alert} from './alert.store.js';
import {measures} from './measures.store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    user,
    measures
  }

});
