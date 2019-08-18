<template>
  <div id="map-sidebar" :class="{'expanded':show}" :style="{'width': getResponsiveWidth}">
    <slot>

    </slot>
  </div>
</template>

<script>
  //TODO: hide sidebar
  export default {
    name: 'MapSidebar',
    data(){
      return {
        show: false,
      }
    },
    methods: {
      open(){
        this.show=true;
      },
      close(){
        this.show=false;
      }
    },
    computed: {
      getResponsiveWidth() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '100%';
          case 'sm': return '100%';
          case 'md': return '98%';
          case 'lg': return '40%';
          case 'xl': return '40%';
        }
      },
    }
  };
</script>

<style scoped>
#map-sidebar{
  z-index:1000;
  transition: right 0.5s;
  position: absolute;
  top:0;
  right: -100%;
  height: 100%;

}
  #map-sidebar.expanded, #map-sidebar:focus{
    right:0 !important;
  }
</style>
