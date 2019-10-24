
const state = {
	show: false,
	message: null,
	type: null,
	timeout: 5000,
};

const actions = {
	success({ commit }, message) {
		commit('setState', { message, type: 'success' });
		setTimeout(() => {
			commit('removeAlert');
		}, state.timeout);
	},
	error({ commit }, message) {
		commit('setState', { message, type: 'error' });
		setTimeout(() => {
			commit('removeAlert');
		}, state.timeout);
	},
	warning({ commit }, message) {
		commit('setState', { message, type: 'warning' });
		setTimeout(() => {
			commit('removeAlert');
		}, state.timeout);
	},
	info({ commit }, message) {
		commit('setState', { message, type: 'info' });
		setTimeout(() => {
			commit('removeAlert');
		}, state.timeout);
	},
	removeAlert({ commit }) {
		commit('removeAlert');
	},
};

const mutations = {
	setState(state, { message, type }) {
		state.message = message;
		state.type = type;
		state.show = true;
	},
	removeAlert(state) {
		state.message = '';
		state.type = '';
		state.show = false;
	},
};

export const alert = {
	namespaced: true,
	state,
	actions,
	mutations,
};
