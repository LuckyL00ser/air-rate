<template>
    <div class="charts-container">
      <slot name="prepend">
      </slot>
      <chart v-for="(sensor, index) in groupedSensors"
             :key="index" :sensors="sensor"
             :daily="daily"
             :class="chartClass"
             @selected="selectedOption"
      />
    </div>
</template>

<script>
import Chart from './Chart';
import * as helpers from '../services/helpers.js';

export default {
  name: 'ChartsDisplayContainer',
  components: { Chart },
  props: {
    sensors: {
      type: Array,
      default: ()=>[],
    },
    chartClass: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
     // : [],
      headerOptions: [
        {name: 'godzinowe', value: 0},
        {name: 'dzienne', value: 1},

      ],
      daily: false,
    };
  },
  computed: {
    groupedSensors() {
     return helpers.groupByType(this.sensors);
    },
  },
  methods: {
    selectedOption(option) {
      this.daily = !!option.value;
      //TODO: emit data change request
    },
  },
};
</script>

<style scoped>

</style>
