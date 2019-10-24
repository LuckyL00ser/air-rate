import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';


Vue.config.productionTip = false;
new Vue({
	router,
	store,
	vuetify,
	beforeCreate() {
		this.$store.dispatch('initStore');
	},
	render: h => h(App),
}).$mount('#app');
