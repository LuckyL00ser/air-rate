<template>
  <div>
    <div class="text-right mr-1">
      <v-btn color="accent" class="mr-2" @click="currentSlide--">
        <v-icon>
          fas fa-arrow-left
        </v-icon>
      </v-btn>
      <v-btn color="accent" @click="currentSlide++">
        <v-icon>
          fas fa-arrow-right
        </v-icon>
      </v-btn>
    </div>
    <v-carousel class="charts-container"
                hide-delimiters
                :show-arrows="false"
                height="auto"
                hide-delimiter-background
                light
                v-model="currentSlide"
    >

      <v-carousel-item v-for="(sensor, index) in groupedSensors" :key="index">

        <chart :sensors="sensor"  :daily="daily"
               :class="chartClass"
               :header-options="headerOptions"
               @selected="selectedOption"
               :show-select="true"/>

      </v-carousel-item>

    </v-carousel>
  </div>

</template>

<script>
import ChartsDisplayContainer from './ChartsDisplayContainer.vue';

export default {
  name: 'ChartsCarousel',
  mixins: [ChartsDisplayContainer],
  data(){
    return {
      currentSlide: 0,
    }
  },



};
</script>

<style scoped>

</style>
