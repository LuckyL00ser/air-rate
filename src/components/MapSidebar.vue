<template>
  <div id="map-sidebar" :class="{'expanded':show}" :style="{'width': getResponsiveWidth}">
    <v-btn fab color="accent" class="mr-n3 mt-8" absolute top right @click="close">
      <v-icon>
        fas fa-times
      </v-icon>
    </v-btn>
    <slot>

    </slot>
  </div>
</template>

<script>
// TODO: hide sidebar
export default {
  name: 'MapSidebar',
  data() {
    return {
      show: false,
    };
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
      this.$emit('hide');
    },
  },
  computed: {
    getResponsiveWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '100%';
        case 'sm': return '100%';
        case 'md': return '60%';
        case 'lg': return '40%';
        case 'xl': return '40%';
      }
    },
  },
};
</script>

<style scoped>
#map-sidebar{
  z-index:4;
  transition: right 0.5s;
  position: absolute;
  top:0;
  right: -100%;


}
  #map-sidebar.expanded, #map-sidebar:focus{
    right:0 !important;
  }
</style>
