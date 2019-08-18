<template>
    <div class="charts-container">
      <slot name="prepend">
      </slot>
      <chart v-for="(sensor, index) in groupedSensors"  :key="index" :sensors="sensor" :show-title="title" :daily="daily" :class="chartClass" />
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
    daily: {
      type: Boolean, default: false,
    },
    title: {
      type: Boolean,
      default: true,
    },
    chartClass:{
      type: String,
      default: '',
    }
  },
  data() {
    return {
     // : [],
    };
  },
  computed: {
    groupedSensors() {
     return helpers.groupByType(this.sensors);
    },
  },
};
</script>

<style scoped>

</style>
