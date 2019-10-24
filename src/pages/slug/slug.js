import Vue from 'vue';
import router from './slugRouter';
import Slug from './Slug.vue';
import vuetify from '@/plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';


Vue.config.productionTip = false;
new Vue({
	router,
	vuetify,
	render: h => h(Slug),
}).$mount('#app');
