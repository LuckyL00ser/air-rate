<template>
 <div class="container--fluid flex-grow-1" id="main">
   <div id="map-container" ></div>
 </div>

</template>

<script>
import L from 'leaflet';
import * as helpers from '../services/helpers.js';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'Map',
  props: ['fetchDataFunction', 'devices'],
  data() {
    return {
      mapInstance: null,
      circlesLayer: null,

    };
  },
  watch: {
    devices() {
      this.showMeasures();
    },
  },
  beforeDestroy() {
    if (this.mapInstance) {
      this.mapInstance.off();
      this.mapInstance.remove();
    }
  },
  methods: {
    createMap() {
      console.log(L.Browser)
      this.mapInstance = L.map('map-container', { dragging: !L.Browser.mobile }).setView([50.0340021, 22.00450923], 13);
      L.tileLayer(process.env.VUE_APP_MAPS_TILES_URL,
        {
          attribution: 'Map data &copy;<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: process.env.VUE_APP_MAP_TOKEN,
        }).addTo(this.mapInstance);
      this.circlesLayer = L.layerGroup();
      this.circlesLayer.addTo(this.mapInstance);
    },
    centerOn(lat, lang) {
      this.mapInstance.setView([lat, lang], 13);
    },
    refreshMeasures() {
      if (this.fetchDataFunction) {
        this.fetchDataFunction();
      }
    },
    addRegion(device) {
      const circleColor = helpers.getCircleColorFromPollution(device);
      // creates circle on map
      const circle = L.circle([device.latitude, device.longitude], {
        color: 'gray',
        fillColor: circleColor,
        fillOpacity: 0.5,
        radius: 500,
      }).addTo(this.circlesLayer);
      //circle.bindPopup(helpers.createMeasurePopup(device)); //disabled popup
      circle.on('click', () => {
        this.$emit('showDeviceCharts', device);
        this.mapInstance.setView([device.latitude+0.015  , device.longitude ], 13);
      }); // centers map view on clicked point
    },
    showMeasures() {
      if (this.mapInstance) {
        this.mapInstance.removeLayer(this.circlesLayer);
        this.circlesLayer = L.layerGroup();
        this.circlesLayer.addTo(this.mapInstance);
      }
      if (this.devices) this.devices.forEach(device => this.addRegion(device));
    },

  },
  async mounted() {
    this.createMap();
    if (this.fetchDataFunction) {
      await this.fetchDataFunction();
    }
  },
};
</script>

<style >
#map-container{
  height: 100%;
  min-height: 50vh;
  z-index: 1;
}
#main{
  position: relative;
}
  .measure-popup{
    font-size:18px;
  }
  .leaflet-popup-content{
    white-space: nowrap;
    width: auto !important;
  }

</style>
