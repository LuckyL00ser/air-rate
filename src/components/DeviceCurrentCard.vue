<template>
  <v-card  class="fill-height d-flex flex-column pa-0 flex-grow-2 " v-if="selectedDevice">
      <v-card-text class="text-left pa-3 white--text flex-grow-1 weather-card">
        <div class="display-2"> {{selectedDevice.name}}</div>
        <v-divider  dark></v-divider>
        <div class="mb-3 text--primary">
          <span >{{selectedDevice.city}}</span>
          <span class="float-right">{{lastMeasure}}</span>
        </div>

        <h1 v-for="sensor in PMSensors" :key="sensor.name" class="mb-2" style="width:100%">
          <div  v-if="sensor.measures.length " >
             <span class="mr-3 font-weight-light" >
                        {{sensorTypeInfo[sensor.name].name}}:
                        <span :class="[sensorColor(sensor.name, sensor.measures[sensor.measures.length-1].value)+'--text','font-weight-bold']">
                          {{roundMeasure(sensor.measures[sensor.measures.length-1].value)}} {{sensorTypeInfo[sensor.name].unit}}
                        </span>
                       </span>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon  class="float-right" v-on="on">far fa-question-circle</v-icon>
              </template>
              <span>TODO: dodać opis</span>
            </v-tooltip>
          </div>
        </h1>
      </v-card-text>
        <div class="d-flex justify-space-around text-center flex-grow-1 pa-3 my-3 primary--text align-center">
          <div v-for="sensor in notPMSensors" :key="sensor.name" class="col pa-0">
          <div v-if="sensor.measures.length" >
            <h1  class=" font-weight-bold" >
                {{sensor.measures[sensor.measures.length-1].value}}{{sensorTypeInfo[sensor.name].unit}}
            </h1>
            <div class="subtitle-2 font-weight-light" >
              <v-icon class="primary--text  " small>{{sensorTypeInfo[sensor.name].icon}}</v-icon>
              {{sensorTypeInfo[sensor.name].name}}
            </div>
          </div>
        </div>
        </div>
     </v-card>
</template>

<script>
import * as helpers from '../services/helpers.js';
// TODO: current measures show the oldest measures
export default {
  name: 'DeviceCurrentCard',
  props: {
    selectedDevice: Object,
  },
  computed: {
    PMSensors() {
      return this.selectedDevice.sensors.filter(e => helpers.isPMSensor(e));
    },
    notPMSensors() {
      return this.selectedDevice.sensors.filter(e => !helpers.isPMSensor(e));
    },
    sensorTypeInfo() {
      return helpers.sensorType;
    },
    lastMeasure() {
      if (this.selectedDevice && this.selectedDevice.sensors && this.selectedDevice.sensors.length) {
        const tmp = new Date(this.selectedDevice.sensors[0].measures[this.selectedDevice.sensors[0].measures.length - 1].created_at);
        return `${tmp.toLocaleTimeString('pl-PL')}/ ${tmp.toLocaleDateString('pl-PL')}`;
      }
      return 'brak';
    },
  },
  methods: {
    sensorColor(name, value) {
      return helpers.unifyValueAndGetColor(name, value);
    },
    isPMSensor(sensor) {
      return helpers.isPMSensor(sensor);
    },
    roundMeasure(value) {
      return Math.round(value * 100) / 100;
    },
  },
};
</script>

<style scoped>
.weather-card{
  background-image: url("../assets/background2.jpg");
  background-position: center;

  background-size: cover;
}

</style>
