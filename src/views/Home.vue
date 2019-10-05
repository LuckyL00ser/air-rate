<template>
  <v-container fluid pa-0 fill-height>
    <v-layout>

    </v-layout>
  </v-container>


</template>

<script>

export default {
  name: 'home',

};
</script>
<style>
  .h-100vh{
    height: 100vh;
  }
  .home-map{
    min-height: 90vh;
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
