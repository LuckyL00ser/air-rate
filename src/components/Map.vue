<template>
 <div class="container--fluid flex-grow-1" id="main"  >

   <transition name="fade">

     <div id="mobile-drag" v-if="mobileDragOverlay">
       <div>Użyj dwóch palców by przesunąć mapę</div>
       <div>
         <v-icon class="fas fa-hand-point-right white--text mx-2" />
         <v-icon class="fas fa-hand-point-left  white--text" />
       </div>
     </div>
   </transition>
   <div id="map-container" @dragstart="dragHandler"></div>


 </div>

</template>

<script>
import L from 'leaflet';
import * as helpers from '../services/helpers.js';
import 'leaflet/dist/leaflet.css';
import targetImage from '../assets/target.gif';

export default {
  name: 'Map',
  props: ['fetchDataFunction', 'devices'],
  data() {
    return {
      mapInstance: null,
      circlesLayer: null,
      selectedRegionIcon: null,
      focusMarkerLayer: null,
      mobileDragOverlay: false,
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
      this.mapInstance = L.map('map-container', { dragging: !L.Browser.mobile }).setView([50.0340021, 22.00450923], 13);
      this.mapInstance.on('locationfound', (e) => {
        this.$store.dispatch('alert/info', `Znajdujesz się w promieniu ${e.accuracy}m od tego miejsca`);
      });

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
    dragHandler(){
      console.log('dupaxd')
        this.mapInstance.on('dragstart', () => {
          setTimeout(() => this.mobileDragOverlay = false, 4000);
          this.mobileDragOverlay = true;
        });

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
      // circle.bindPopup(helpers.createMeasurePopup(device)); //disabled popup

      circle.on('click', () => this.deviceGainedFocus(device)); // centers map view on clicked point
    },
    deviceGainedFocus(device) {
      this.$emit('showDeviceCharts', device);
      this.centerOn(device.latitude, device.longitude);
      if (this.focusMarkerLayer) this.focusMarkerLayer.remove();
      const tmp = L.marker([device.latitude, device.longitude], { icon: this.selectedRegionIcon });
      tmp.on('click', () => this.deviceGainedFocus(device));
      this.focusMarkerLayer = tmp.addTo(this.mapInstance);
    },
    deviceLostFocus() {
      if (this.focusMarkerLayer) this.focusMarkerLayer.remove();
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
    this.selectedRegionIcon = new L.Icon({
      iconUrl: targetImage,
      shadowUrl: '',
      iconSize: [150, 150],
      shadowSize: [50, 50],
      iconAnchor: [75, 75],
      shadowAnchor: [0, 0],
      popupAnchor: [0, 0],

    });
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
  #mobile-drag{
    background: rgba(0, 0, 0, 0.67);
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color:white;
    width:100%;
    height: 100%;
    top:0;
    left:0;
    z-index: 200;
  }
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
