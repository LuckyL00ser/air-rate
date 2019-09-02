<template>
          <v-card class="fill-height " id="charts-wrapper">
            <slot name="header" v-bind:selectedDevice="currentDevice">
                  <!--Slot for displaying selected device info, by default there is only name and
                  city showed-->
              <v-card-title >
                <h1>{{currentDevice.city}} - </h1>
                <h1 class="secondary--text"> {{currentDevice.name}}</h1>
              </v-card-title>
            </slot>
            <div v-if="showCharts">
              <v-tabs
                primary
                v-model="tab"

                grow>
                <v-tabs-slider ></v-tabs-slider>
                <v-tab href="#tab-0">Godzinowe</v-tab>
                <v-tab href="#tab-1" >Dzienne</v-tab>

                  <v-tab-item  class="px-1 "   value="tab-0" >
                    <charts-display-container :sensors="dataHourly" chart-class="mx-2 my-5"/>
                  </v-tab-item>
                  <v-tab-item class="px-1 "  value="tab-1" >
                    <charts-display-container :sensors="dataDaily" :daily="true" chart-class="mx-2 my-5" />
                  </v-tab-item>


              </v-tabs>
            </div>
            <h3 v-else class="center-absolute text--secondary">Brak czujników w tym urządzeniu</h3>
            <loading-overlay :fetching="fetchingData"/>
          </v-card>

</template>

<script>
import ChartsDisplayContainer from './ChartsDisplayContainer';
import LoadingOverlay from './LoadingOverlay.vue';


export default {
  name: 'MapCharts',
  components: { LoadingOverlay, ChartsDisplayContainer },
  props: {
    fetchDaily: Function,
    fetchHourly: Function, // external fetch functions
    dataDaily: {
      type: Array,
      default: ()=>[],
    },
    dataHourly: {
      type: Array,
      default: ()=>[],
    },
  },
  data() {
    return {
      show: false,
      fetchingData: false,
      currentDevice: {
        city: '',
        name: '',
      },
      tab: 'tab-0',

    };
  },
  computed: {
    showCharts(){
      return this.dataDaily.length || this.dataHourly.length || this.fetchingData;
    }
    },
  methods: {
    async fetchAndShowData(device) {
      this.show = true;
      this.fetchingData = true;
      this.currentDevice = device;
      await Promise.all([this.fetchDaily(device.device_id), this.fetchHourly(device.device_id)]);
      this.fetchingData = false;
    },
  },

};
</script>

<style >
.semi-opaque-card{

  background-color: whitesmoke !important;
}
.opaque{
  background-color: rgba(0,0,0,0) !important;

}
#charts-wrapper{
  overflow-y: scroll;
  height: 100%;
}



</style>
