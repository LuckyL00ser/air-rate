import axios from '../axios.config.js';




// local storage manipulations
function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
    localStorage.setItem('token', JSON.stringify(token));
  }
}
function removeAuthorizationToken() {
  axios.defaults.headers.common['Authorization']= null;
  localStorage.removeItem('token');
}
function setUserData(user){
  if(user)
    localStorage.setItem('user',JSON.stringify(user));
}
function removeUserData(){
  localStorage.removeItem('user');
}

/*
  REQUESTS
 */

// USER get
function getUserData() {
  return axios.get('/api/auth/user')
    .then(
      response=>{
        setUserData(response.data);
        return response.data;
      }
    )
}

// USER posts
function login(_username, _password) {
  return axios.post('/api/auth/login', {
    username: _username,
    password: _password,
  })
    .then((response) => {
      setAuthorizationToken(response.data.token);
      setUserData(response.data.user);
      return response.data;
    });
}
function logout() {
   return axios.post('/api/auth/logout')
    .then(() => {
      removeAuthorizationToken();
      removeUserData();
    });
}
function register(user) {
  return axios.post('/api/auth/register', user)
    .then(
      response=>{   //when registering user is automatically logged and gets its data and token in response
        setUserData(response.data.user);
        setAuthorizationToken(response.data.token)
        return response.data;
      }
    )
}
export {
  setAuthorizationToken,
  removeAuthorizationToken,
  getUserData,
  setUserData,
  removeUserData,
  login,
  logout,
  register,
};
