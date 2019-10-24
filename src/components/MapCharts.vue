<template>
          <div class="fill-height " id="charts-wrapper">
            <slot name="header" v-bind:selectedDevice="currentDevice">
                  <!--Slot for displaying selected device info, by default there is only name and
                  city showed-->
                <h1>{{currentDevice.city}} - </h1>
                <h1 class="secondary--text"> {{currentDevice.name}}</h1>

            </slot>

            <div v-if="showCharts">
              <div>
                      <charts-carousel  :sensors="dataType? dataDaily : dataHourly" @changedTimeBounds="setTimeBounds" chart-class="my-2 mx-1 v-card theme--light v-sheet pa-2" class="my-4"/>
              </div>
            </div>
            <v-card v-else color="error" class=" my-3 col-12 white--text ">Brak czujników w tym urządzeniu</v-card>
            <loading-overlay class=""  :fetching="fetchingData"/>
          </div>

</template>

<script>
import ChartsDisplayContainer from './ChartsDisplayContainer';
import LoadingOverlay from './LoadingOverlay.vue';
import ChartsCarousel from './ChartsCarousel';


export default {
	name: 'MapCharts',
	components: { ChartsCarousel, LoadingOverlay, ChartsDisplayContainer },
	props: {
		fetchDaily: Function,
		fetchHourly: Function, // external fetch functions
		dataDaily: {
			type: Array,
			default: () => [],
		},
		dataHourly: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			show: false,
			fetchingData: false,
			dataType: 0,
			currentDevice: {
				city: '',
				name: '',
				sensors: [],
			},


		};
	},
	computed: {
		showCharts() {
			return this.dataDaily.length || this.dataHourly.length || this.fetchingData;
		},
	},
	methods: {
		async fetchAndShowData(device) {
			this.show = true;
			this.fetchingData = true;
			this.currentDevice = device;
			await Promise.all([this.fetchDaily(device.device_id), this.fetchHourly(device.device_id)]);
			this.fetchingData = false;
		},
      setTimeBounds(option){
		  this.dataType = option.value;
      }
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
  position: relative;
  height: 100%;
}


</style>
