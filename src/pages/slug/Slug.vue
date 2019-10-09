<template>
  <v-app id="app" >

       <v-card class="fill-height d-flex flex-column">
           <template name="prepend">
               <a class="primary--text air-rate-attr"
                            href="https://www.airrate.pl" target="_blank">
                   <v-img src="../../assets/logo.png" height="40" width="50" contain class="d-inline-block vertical-middle" />
                   <h3 class="font-weight-light d-inline-block vertical-middle">AirRate</h3>
               </a>
           </template>
           <div class="fill-height position-relative">
               <map-sidebar ref="sidebar" class="pa-3 " @hide="hideMapSidebar">
                   <device-current-card  :selected-device="selectedDevice" id="device-card"/>
               </map-sidebar>

               <v-overlay v-if="noDevices" class="display-1">
                   Brak urządzeń dla tego użytkownika
               </v-overlay>
               <Map @showDeviceCharts="pickDeviceFromMap"
                    :fetchDataFunction="getSlugDevices"
                    :devices="devices"
                    :locate-button="false"
                    ref="map"
                    class="fill-height"/>
               <loading-overlay :fetching="loading"/>
           </div>
       </v-card>


  </v-app>
</template>
<script>
import axios from '@/axios.config.js';
import DeviceCurrentCard from '@/components/DeviceCurrentCard.vue';
import LoadingOverlay from '../../components/LoadingOverlay';
import Map from '../../components/Map';
import MapSidebar from '../../components/MapSidebar';

export default {
  name: 'Slug',
  components: {
    DeviceCurrentCard, LoadingOverlay, Map, MapSidebar,
  },
  data() {
    return {
      devices: [],
      selectedDevice: null,
      loading: false,
      noDevices: false,

    };
  },
  mounted() {
    //setInterval(this.getSlugDevices, 1000 * 60 * 5);// measure refresh every 5 min
  },
  methods: {
    async getSlugDevices() {
      if (this.$route.params.slug) {
        this.loading = true;
        try {
          const response = await axios.get(`/api/current/?for=${this.$route.params.slug}`);
          this.devices = response.data;
          if(this.devices.length>0){
            this.$refs.map.centerMapInMiddleOfDevices(this.devices);
            this.noDevices=false;
          }
          else
            this.noDevices=true;
        } catch (e) {
          console.error(e); // TODO: pomyslec jak sygnalizowac bledy w slugu
        }
        this.loading = false;
      }
      else
      this.noDevices=true;
    },
    pickDeviceFromMap(device) {
      const mapDevice = this.devices.find(e => e.device_id == device.device_id);
      if (mapDevice) {
        this.selectedDevice = mapDevice;
        this.$refs.sidebar.open();
      }
    },
    hideMapSidebar() {
      this.$refs.map.deviceLostFocus();
      this.selectedDevice = null;
    },

  },
};
</script>

<style>

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    position: relative;
}

a{
  text-decoration: none;
}
.air-rate-attr{
    background-color: white;
    z-index: 5;
}
.vertical-middle{
    vertical-align: middle;
}
    .position-relative{
        position: relative;
    }


</style>
