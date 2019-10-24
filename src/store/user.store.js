import * as userService from '../services/user.service.js';
import { setAuthorizationToken, setUserData } from '../services/user.service';

// TODO: set promises in actions into await/async code

const state = {
	status: {
		loggedIn: false,
	},
	userData: {},
};

const actions = {
	// TODO: change all actions into async/await instead of promises
	async login({ dispatch, commit }, { username, password }) {
		commit('loggingIn');
		try {
			const response = await userService.login(username, password);
			userService.setAuthorizationToken(response.data.token);
			userService.setUserData(response.data.user);
			commit('loggedIn', response.data);
			dispatch('alert/success', 'Zalogowano', { root: true });
			return response.data;
		} catch (error) {
			dispatch('alert/error', `Błąd logowania: ${error}`, { root: true });
			commit('loginFailed');
			throw error;
		}
	},
	async logout({ dispatch, commit }) {
		try {
			const response = await userService.logout();
			userService.removeAuthorizationToken();
			commit('loggedOut');
			dispatch('alert/info', 'Wylogowano', { root: true });
		} catch (e) {
			dispatch('alert/error', 'Podczas wylogowywania wystąpił błąd.', { root: true });
		}
	},
	async register({ dispatch, commit }, user) {
		commit('registering');
		try {
			const response = await userService.register(user);
			commit('loggedIn', response.data);
			dispatch('alert/success', 'Konto użytkownika zostało pomyślnie utworzone - zostałeś automatycznie zalogowany');
		} catch (e) {
			commit('registrationFailed');
		}
	},
	async getUserData({ commit }) {
		try {
			const response = await userService.getUserData();
			commit('setUserData', response.data);
		} catch (e) {
			commit('removeUserData');
		}
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
		state.status = {
			loggedIn: true,
		};
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
