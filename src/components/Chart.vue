<template>
  <div class="d-flex flex-column text-left">
      <div class="d-flex justify-space-between align-center pa-2">
        <h2 class="primary--text">{{name}}</h2>
        <select-list v-if="showSelect" :options="headerOptions" @selected="$emit('selected',$event)"/>
      </div>
      <v-divider class="mx-2" light></v-divider>
      <span class=" d-block text--secondary pa-2" v-if="!anyMeasures">
      Brak aktualnych danych
    </span>
    <div v-show="anyMeasures" class="chart-container flex-grow-1">
      <canvas class="chart" ref="chart" ></canvas>
    </div>
  </div>
</template>
<script>
import * as charts from '../services/chartHelper.js';
import * as helpers from '../services/helpers.js';
import SelectList from './SelectList';

export default {
	name: 'Chart',
	components: { SelectList },
	props: {
		sensors: Array, daily: Boolean, showSelect: Boolean, headerOptions: Array,
	}, // array with sensors objects
	data() {
		return {
			jsChart: null,
			anyMeasures: false,
			type: null,
			name: '',
		};
	},
	watch: {
		sensors(newData) {
			this.showData(newData);
		},
		daily(dailyChart) {
			if (this.jsChart) {
				this.jsChart.options.scales.xAxes = [{
					type: 'time',
					scaleLabel: {
						display: true,
						labelString: dailyChart ? 'Dzień' : 'Godzina',
					},
					stacked: true,
					time: {
						unit: dailyChart ? 'day' : 'minute',
						unitStepSize: dailyChart ? 1 : 60,
						displayFormats: {
							minute: dailyChart ? 'DD-MM' : 'hh:mm',
						},
						tooltipFormat: 'YYYY-MM-DD, kk:mm', // cosider adding 'ddd' at beggining - check moment.js lib localization options
					},
				}],
				this.jsChart.update();
			}
		},
	},
	beforeDestroy() {
		if (this.jsChart) this.jsChart.destroy();
	},
	mounted() {
		const matchedType = helpers.sensorType[this.sensors[0].name];
		this.type = matchedType.type;
		this.name = matchedType.commonName || matchedType.name;
		this.showData(this.sensors);
	},
	methods: {
		showData(data) {
			this.anyMeasures = data.reduce((a, b) => a || b.measures.length > 0, false);
			if (!this.anyMeasures) return;
			if (this.jsChart) { // chart already exists
				this.updateData(data);
				return;
			}

			switch (this.type) {
			case 'PM':
				this.jsChart = charts.drawPMsChart(data, this.$refs.chart, this.daily);
				break;
			case 'temperature':
				this.jsChart = charts.drawTempChart(data, this.$refs.chart, this.daily);
				break;
			case 'humidity':
				this.jsChart = charts.drawHumidityChart(data, this.$refs.chart, this.daily);
				break;
			case 'pressure':
				this.jsChart = charts.drawPressureChart(data, this.$refs.chart, this.daily);
				break;
			default:
				break;
			}
		},
		updateData(sensors) {
			this.jsChart.data.labels = charts.pick(sensors[0].measures, 'created_at');
			for (let i = 0; i < sensors.length; i++) // loop for grouped PM sensors
			{ this.jsChart.data.datasets[i].data = charts.pick(sensors[i].measures, 'value'); }
			this.jsChart.update();
		},


	},

};
</script>

<style scoped>

  .chart{
    height: 100%;

    width:100%;

  }
  .chart-container{
    position: relative;
    min-height: 25vh;


  }
</style>
