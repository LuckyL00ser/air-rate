const sensorType = {
  PM1: {
    name: 'PM1', unit: 'μg/m³', type: 'PM', commonName: 'Zapylenie', icon: '',
  },
  'PM2.5': {
    name: 'PM2.5', unit: 'μg/m³', type: 'PM', commonName: 'Zapylenie', icon: '',
  },
  PM10: {
    name: 'PM10', unit: 'μg/m³', type: 'PM', commonName: 'Zapylenie', icon: '',
  },
  Temperature: {
    name: 'Temperatura', unit: '°C', type: 'temperature', icon: 'fas fa-thermometer-half',
  },
  Humidity: {
    name: 'Wilgotność ', unit: '%', type: 'humidity', icon: 'fas fa-tint',
  },
  Pressure: {
    name: 'Ciśnienie', unit: 'hPa', type: 'pressure', icon: 'fas fa-chart-bar',
  },
};
function isPMSensor(sensor) {
  return sensor.name.match(/PM+/gi);
}

function measuresToString(sensors) {
  let string = '';
  sensors.forEach((sensor) => { // iterates through available measures
    if (sensor.measures.length) { // checks if sensor has ANY measures
      string += `<b> ${sensorType[sensor.name].name}: </b>`; // maps english names to polish
      if (isPMSensor(sensor)) { // for dust pollution return also color as norm indicator
        string += `<span class="${unifyValueAndGetColor(sensor.name, sensor.measures[sensor.measures.length - 1].value)}--text">  
                        ${sensor.measures[sensor.measures.length - 1].value}${sensorType[sensor.name].unit}</span><br>`;
      } else { // for ordinary measures like temperature, humidity, pressure
        string += `${sensor.measures[sensor.measures.length - 1].value}${sensorType[sensor.name].unit}<br>`;
      }
    }
  });
  return string;
}
/*
Generates html tags and content for map popup
 */
function localDate(date) {
  return new Date(date).toLocaleString('pl-PL');
}
function createMeasurePopup(device) {
  return `<div class="measure-popup">
              <b>Aktualny pomiar:</b> <br> ${device.sensors.length ? localDate(device.sensors[0].measures[device.sensors[0].measures.length - 1].created_at) : 'brak'}<br>
              <b>Miasto:</b> ${device.city}<br>
              <b>Czujnik: </b>${device.name}<br>
              ${measuresToString(device.sensors)}
          </div>`;
}
// groups device sensors by its Type
function groupByType(sensors) {
  const grouped = [];
  sensors.forEach((sensor) => {
    if (isPMSensor(sensor) && grouped.length) grouped[0].push(sensor);
    else grouped.push([sensor]);
  });
  return grouped;
}


// Normalization with different threshold for each pollution - poor AQI index
function getPM1level(pollution) {
  return pollution / 15.0;
}
function getPM10level(pollution) {
  return pollution / 50.0;
}
function getPM25level(pollution) {
  return pollution / 25.0;
}
/*
Function normalizes different types of pollution to range [0,inf] 0-100%...inf%  of pollution norm
 */
function unifyValue(type, value) {
  switch (type) {
    case 'PM1':
      value = getPM1level(value);
      break;
    case 'PM2.5':
      value = getPM25level(value);
      break;
    case 'PM10':
      value = getPM10level(value);
      break;
  }
  return value;
}
function unifyValueAndGetColor(type, value) {
  if (isPMSensor({ name: type })) return getColorFromPollution(unifyValue(type, value));
  return 'black';
}
/*
As function name says - for values in range [0,inf]
 */
function getColorFromPollution(value) {
  if (value < 0.5) { return 'green'; }
  if (value >= 0.5 && value <= 1) { return 'orange'; }
  if (value >= 1) { return 'red'; }
}

function getCircleColorFromPollution(device) {
  // picks  pollutions sensors only
  let pollutions = device.sensors.filter(element => isPMSensor(element) && element.measures.length, // regexp checks if its PM* sensor and if it has any measure
  );

  // device doesnt have pollution sensors
  if (pollutions.length === 0) { return 'white'; }

  // gets normalized value of pollutions
  pollutions = pollutions.map(element => unifyValue(element.name, element.measures[element.measures.length - 1].value));
  // return color of the highest pollition
  return getColorFromPollution(Math.max(...pollutions));
}

export {
  measuresToString, createMeasurePopup, isPMSensor, getColorFromPollution,
  unifyValueAndGetColor, getPM1level, getPM10level, getPM25level, getCircleColorFromPollution, sensorType, groupByType,
};
