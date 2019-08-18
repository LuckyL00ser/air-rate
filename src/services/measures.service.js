import axios from '../axios.config.js'; //TODO:: check if this dependecy is correct for further dev

function getDaily(id){
  return axios.get(`/api/daily/?device=${id}`);
}
function getHourly(id){
  return axios.get(`/api/hourly/?device=${id}`);
}
function getCurrent(){
  return axios.get('/api/current/');
}
function getUserHourly(id){
  return axios.get(`/api/user_hourly/?device=${id}`);
}
function getUserDaily(id){
  return axios.get(`/api/user_daily/?device=${id}`);
}
function getUserDevices(){
  return axios.get('/api/user_device/');
}
function getUserCurrent(){
  return axios.get('/api/user_current/');
}

export {
  getDaily,
  getHourly,
  getCurrent,
  getUserDevices,
  getUserDaily,
  getUserHourly,
  getUserCurrent,
};



