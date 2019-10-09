<template>
    <v-container pa-0 ma-0 col-12>
      <v-row>
        <v-col v-for="(sensor, index) in groupedSensors" :key="index" :cols="$vuetify.breakpoint.mdAndUp? '6' : '12'">
         <chart  :sensors="sensor"
               :daily="daily"
               :class="chartClass"
               @selected="selectedOption"
        />
        </v-col>
      </v-row>

    </v-container>
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
      default: () => [],
    },
    chartClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // : [],
      headerOptions: [
        { name: 'godzinowe', value: 0 },
        { name: 'dzienne', value: 1 },

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
      // TODO: emit data change request
    },
  },
};
</script>

<style scoped>

</style>
