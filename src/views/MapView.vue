<template>
  <v-container fluid pa-0  id="container" fill-height>

    <v-layout class=" col-12 pa-0 relative overflow-hidden" >

      <map-sidebar ref="sidebar" class="pa-3 " @hide="hideDeviceCharts">
        <map-charts ref="charts"

                    :fetch-daily="getDailyMeasures"
                    :fetch-hourly="getHourlyMeasures"
                    :data-daily="daily? daily.sensors: []"
                    :data-hourly="hourly? hourly.sensors: []">
          <template v-slot:header="slotProps">
            <div class="flex">
              <device-current-card :selected-device="slotProps.selectedDevice" class="col-12 pa-0"/>
            </div>

          </template>
        </map-charts>
      </map-sidebar>
      <Map @showDeviceCharts="showDeviceCharts"
           ref="map"
           :fetchDataFunction="getCurrentMeasures"
           :devices="$store.state.measures.current"
           class="home-map"/>

    </v-layout>

  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from 'vuex';
import Map from '../components/Map.vue';
import MapCharts from '../components/MapCharts.vue';
import MapSidebar from '../components/MapSidebar.vue';
import DeviceCurrentCard from '../components/DeviceCurrentCard.vue';

export default {
  name: 'MapView',
  components: {
    DeviceCurrentCard,
    Map,
    MapCharts,
    MapSidebar,
  },
  data() {
    return {
      scrollTop: 0,

    };
  },
  computed: {
    ...mapState('measures', ['current', 'daily', 'hourly']),
    computedLeft() {
      return `${-this.scrollTop}px`;
    },
  },
  methods: {
    ...mapActions('measures', ['getCurrentMeasures', 'getDailyMeasures', 'getHourlyMeasures']),
    handleScroll() {
      this.scrollTop = 5 * window.innerWidth * window.scrollY / window.innerHeight;
    },
    showDeviceCharts(device) {
      this.$refs.sidebar.open();
      this.$refs.charts.fetchAndShowData(device);
    },
    hideDeviceCharts() {

      this.$refs.map.deviceLostFocus();
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },

};
</script>

<style scoped>

</style>
