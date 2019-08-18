<template>
  <v-container fluid pa-0  id="container" fill-height>
<!--    <v-layout col-10 col-lg-6 class="h-100vh"  >-->
<!--        <v-card  class="font-weight-light" id="splash" v-bind:style="{left:computedLeft}">-->
<!--              <v-card-text class="text-left">-->
<!--                <div class="display-4 text&#45;&#45;secondary font-weight-medium">-->
<!--                  <span class="d-inline-block v-align-middle">AirRate</span>-->
<!--                </div>-->
<!--                <div id="greeting" class="py-4 ">-->
<!--                  <p>Nasza walka o czystsze jutro.</p>-->
<!--                  <p>Już dziś dołącz do naszego projektu i zamów bezprzewodowy czujnik jakości powietrza dla Twojej okolicy.</p>-->
<!--                  <v-btn large class="primary darken-1 pa-5 mt-5" to="/register">-->
<!--                    Dołącz do nas-->
<!--                  </v-btn>-->
<!--                </div>-->
<!--              </v-card-text>-->
<!--        </v-card>-->
<!--    </v-layout>-->
    <v-layout class=" col-12 pa-0 relative" >

          <map-sidebar ref="sidebar" class="pa-3 ">
            <map-charts ref="charts"
                        :fetch-daily="getDailyMeasures"
                        :fetch-hourly="getHourlyMeasures"
                        :data-daily="daily? daily.sensors: []"
                        :data-hourly="hourly? hourly.sensors: []">
              <template v-slot:header="slotProps">
                <v-card-title >
                  <h1>{{slotProps.selectedDevice.city}} - </h1>
                  <h1 class="secondary--text"> {{slotProps.selectedDevice.name}}</h1>
                  <v-btn fab small absolute  right color="primary" @click="$refs.sidebar.close()">
                    <v-icon> fas fa-times-circle</v-icon>
                  </v-btn>
                </v-card-title>

              </template>
            </map-charts>
          </map-sidebar>
        <Map @showDeviceCharts="showDeviceCharts" :fetchDataFunction="getCurrentMeasures"  :devices="$store.state.measures.current"/>
    </v-layout>

  </v-container>


</template>

<script>
// @ is an alias to /src
import Map from '../components/Map.vue';
import MapCharts from '../components/MapCharts.vue';
import MapSidebar from '../components/MapSidebar';
import {mapActions, mapState} from 'vuex';

export default {
  name: 'home',
  components: {
    Map,
    MapCharts,
    MapSidebar
  },
  data(){
    return{
      scrollTop: 0,

    }
  },
  computed:{
    ...mapState('measures',['current','daily','hourly']),
    computedLeft(){
      return -this.scrollTop+'px';
    }
  },
  methods:{
    ...mapActions('measures',['getCurrentMeasures','getDailyMeasures','getHourlyMeasures']),
    handleScroll(){
      this.scrollTop = 5*window.innerWidth*window.scrollY / window.innerHeight;
      },
    showDeviceCharts(device){

      this.$refs.sidebar.open();
      this.$refs.charts.fetchAndShowData(device);
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }

};
</script>
<style>
  .h-100vh{
    height: 100vh;
  }

  .fixed{
    position: fixed !important;
    top:0;
  }
  #splash{
    z-index: 3;
    position: absolute;

  }
  .align-items-end{
    align-items: end;
  }
  .v-align-middle{
    vertical-align: middle;
  }


  #list-wrapper ul{
    list-style-type: none;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
  }
  #list-wrapper li{
    flex: 1 0;
    white-space: nowrap;
    font-size: 1rem;
    padding: 1rem 0;

  }
  #list-wrapper  li a{
    color: white;

    transition: .5s ease color;

  }
  #greeting{
    font-size: 1.3rem;
    padding: 1rem;
    color: #2c3e50;
  }
  #list-wrapper li a:hover{
      color: #0a968f !important;
  }
  .relative{
    position: relative;
  }



</style>
