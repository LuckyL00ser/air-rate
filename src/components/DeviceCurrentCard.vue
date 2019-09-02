<template>
  <v-card  class="fill-height d-flex flex-column pa-0 flex-grow-2 weather-card">

      <v-card-title class="grey--text primary">
        <h3>{{selectedDevice.city}} / <span class="white--text ">{{selectedDevice.name}}</span></h3>
      </v-card-title>

      <v-card-text class="text-left pa-3 flex-grow-1">
        <span class="float-right">{{lastMeasure}}</span>
        <p>Aktualny odczyt</p>
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
        <v-divider class="my-5 mx-3 align-center"></v-divider>
        <div class="d-flex justify-space-around text-center flex-grow-1 pa-3 align-center">
          <div v-for="sensor in notPMSensors" :key="sensor.name" class="col-4 pa-0">
          <div v-if="sensor.measures.length">
            <div  class="display-1 font-weight-bold white--text">
              {{sensor.measures[sensor.measures.length-1].value}}{{sensorTypeInfo[sensor.name].unit}}
            </div>
            <div class="white--text">
              <v-icon class="white--text">{{sensorTypeInfo[sensor.name].icon}}</v-icon>
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
  props: { selectedDevice: Object },
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
