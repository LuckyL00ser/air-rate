<template>
  <v-container fluid>
    <v-layout row justify-sm-center wrap>
      <v-flex col-12>
        <h1 class="display-2">Panel użytkownika - {{userData.username}}</h1>
      </v-flex>
      <v-flex col-lg-3 col-12 col-md-4 col-sm-6>
        <v-card  class="fill-height d-flex flex-column">
          <template name="append" >
            <v-card-title class="primary white--text">Twoje czujniki</v-card-title>
          </template>
          <v-card-text class="flex-grow-1">
            <v-list v-if="userDevices && userDevices.length">
              <v-list-item-group v-model="selectListIndex" class="text-medium" color="secondary">
                <v-list-item v-for="device in userDevices" :key="device.device_id" @click="pickDevice(device)">

                  <v-list-item-content>
                    {{device.name}}
                  </v-list-item-content>
                  <v-list-item-action >
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <div v-on="on">
                          <v-icon v-if="!device.visible_on_map">far fa-eye-slash</v-icon>
                          <v-icon v-else>far fa-eye</v-icon>
                        </div>
                      </template>
                      <span v-if="device.visible_on_map">Inni użytkownicy widzą pomiary z Twojego czujnika</span>
                      <span v-else>Tylko Ty widzisz pomiary z tego czujnika</span>
                    </v-tooltip>

                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <div class="center-absolute" v-else>
              Nie posiadasz własnych czujników
              <i class="far fa-2x fa-sad-cry"></i>
            </div>
          </v-card-text>
          <template name="prepend">
            <v-card-actions>
              <v-btn class="accent col-12">Zamów już dziś</v-btn>
            </v-card-actions>
          </template>
          <loading-overlay :fetching="fetchingMeasures.userDevices" />
        </v-card>

      </v-flex>
      <v-flex fill-heigth col-12 col-md>
        <v-card class="fill-height flex-grow-1">
          <!--          <map-sidebar :devices="mapFilteredDevices" dark/>-->
          <map-sidebar ref="sidebar"  @hide="hideMapSidebar">
            <device-current-card  :selected-device="selectedDevice" />
          </map-sidebar>
          <Map @showDeviceCharts="pickDeviceFromMap" :fetchDataFunction="getUserCurrent" :devices="mapDevices" ref="map" />
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex col-12 pt-0 v-if="selectedDevice">
        <div>
          <charts-display-container :daily="daily" :sensors="daily? userDailySensors : userHourlySensors" class="charts" chart-class="custom-chart elevation-9">
          </charts-display-container>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import MapCharts from '../components/MapCharts.vue';
import Map from '../components/Map.vue';
import LoadingOverlay from '../components/LoadingOverlay.vue';
import DeviceCurrentCard from '../components/DeviceCurrentCard';
import ChartsDisplayContainer from '../components/ChartsDisplayContainer';
import MapSidebar from '../components/MapSidebar';

export default {
  name: 'UserDashboard',
  components: {
    ChartsDisplayContainer, Map, LoadingOverlay, DeviceCurrentCard, MapSidebar,
  },
  data() {
    return {
      selectListIndex: null,
      mapDevices: [],
      selectedDevice: null,
      chartsSensors: [],
      daily: false,
    };
  },
  watch: {
    userCurrent(newData) {
      this.mapDevices = newData;
    },
  },
  async mounted() {
    this.getUserDevices();
  },
  computed: {
    ...mapState('user', ['status', 'userData']),
    ...mapState('measures', ['userDevices', 'fetchingMeasures', 'userCurrent', 'userHourly', 'userDaily']),
    userHourlySensors() {
      let tmp = [];
      if (this.userHourly && this.selectedDevice) tmp = this.userHourly.find(e => e.device_id == this.selectedDevice.device_id);
      return tmp ? tmp.sensors : [];
    },
    userDailySensors() {
      let tmp = [];
      if (this.userDaily && this.selectedDevice) tmp = this.userDaily.find(e => e.device_id == this.selectedDevice.device_id);
      return tmp ? tmp.sensors : [];
    },
  },
  methods: {
    ...mapActions('measures', ['getUserDevices', 'getUserDaily', 'getUserHourly', 'getUserCurrent']),
    async pickDeviceFromMap(device) {
      const mapDevice = this.userCurrent.find(e => e.device_id == device.device_id);
      if (mapDevice) {
        this.selectedDevice = mapDevice;
        this.$refs.sidebar.open();
        await this.getUserHourly(device.device_id);
        await this.getUserDaily(device.device_id);
      }
    },
    pickDevice(device) {
      const mapDevice = this.userCurrent.find(e => e.device_id == device.device_id);
      if (mapDevice) this.$refs.map.deviceGainedFocus(mapDevice);
    },
    hideMapSidebar() {
      this.$refs.map.deviceLostFocus();
      this.selectedDevice = null;
    },

  },
};
</script>

<style>
  .charts{
    display: flex;
   flex-wrap: wrap;
    justify-content: space-between;
    width:100%;
  }
  .charts>.custom-chart{
    min-height: 40vh;
  }


.text-medium{
  font-size: 1.25em;
}
</style>
