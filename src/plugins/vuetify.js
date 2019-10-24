import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify);

export default new Vuetify({
	theme: {

		themes: {

			light: {

				primary: '#0a5796',
				secondary: '#2c3e50',
				accent: '#a00b4c',
				error: '#FF5252',
				info: '#2196F3',
				success: '#09bf32',
				warning: '#FFC107',

			},


		},
	},
	icons: {
		iconfont: 'fa',
	},
});
