//konieczne poniewaz store importowal axiosa przed cala aplikacja a wykonuje on request
//na samym starcie by pobrac dane uzytkownika z zapisana sesja

import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
export default axios;
