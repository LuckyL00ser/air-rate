import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pl from 'vuetify/es5/locale/pl';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0a5796',
        secondary: '#0a968f',
        accent: '#a00b4c',
        error: '#FF5252',
        info: '#2196F3',
        success: '#09bf32',
        warning: '#FFC107'
      },
    },
  },
    lang: {
      locales: { pl },
      current: 'pl',
    },
  icons: {
    iconfont: 'fa',
  },
});
