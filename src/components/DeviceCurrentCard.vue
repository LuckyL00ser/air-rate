<template>
  <v-card  class="fill-height d-flex flex-column pa-0 flex-grow-2">
    <v-card-title class="grey--text primary">
      <h3>{{selectedDevice.city}} / <span class="white--text ">{{selectedDevice.name}}</span></h3>
    </v-card-title>
    <v-divider mx-3></v-divider>
    <v-card-text class="text-left flex-grow-1 pa-5">
      <span class="float-right">{{lastMeasure}}</span>
      <p>Aktualny odczyt</p>
      <div v-for="sensor in selectedDevice.sensors" :key="sensor.name" class="mb-2" style="width:100%">
                      <span v-if="sensor.measures.length" class="mr-3" >
                        {{sensorTypeInfo[sensor.name].name}}:
                        <span :class="sensorColor(sensor.name, sensor.measures[sensor.measures.length-1].value)+'--text'">
                          {{sensor.measures[sensor.measures.length-1].value}} {{sensorTypeInfo[sensor.name].unit}}
                        </span>
                       </span>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
              <v-icon  class="float-right" v-on="on">far fa-question-circle</v-icon>
          </template>
          <span>TODO: dodać opis</span>

        </v-tooltip>
      </div>


    </v-card-text>
    <v-divider></v-divider>
    <template name="prepend">
      <router-link class="my-3 accent--text" to="/">zobacz dopuszczalne wartości</router-link>
    </template>
  </v-card>
</template>

<script>
  import * as helpers from '../services/helpers.js';
  //TODO: current measures show the oldest measures
  export default {
    name: 'DeviceCurrentCard',
    props: { selectedDevice: Object},
    computed: {
      sensorTypeInfo(){
        return helpers.sensorType
      },
      lastMeasure(){
        if(this.selectedDevice && this.selectedDevice.sensors && this.selectedDevice.sensors.length)
        {
          const tmp = new Date(this.selectedDevice.sensors[0].measures[this.selectedDevice.sensors[0].measures.length-1].created_at);
          return `${tmp.toLocaleTimeString('pl-PL')}/ ${tmp.toLocaleDateString('pl-PL')}`;
        }
        return 'brak';
      }
    },
    methods: {
      sensorColor(name,value){
        return helpers.unifyValueAndGetColor(name,value);
      },
    }
  };
</script>

<style scoped>

</style>
