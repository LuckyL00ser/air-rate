<template>
  <div id="map-sidebar" :class="{'expanded':show, 'scrollable':enableScroll}" :style="{'width': getResponsiveWidth}">
    <v-btn fab color="accent" class="mr-n3 mt-8 z-index" absolute top right @click="close">
      <v-icon>
        fas fa-times
      </v-icon>
    </v-btn>
    <slot>

    </slot>
  </div>
</template>

<script>

export default {
	name: 'MapSidebar',
	props: { scrollable: Boolean },
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
		enableScroll() {
		  return this.$props.scrollable;
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
    height: 100%;
}
.scrollable{
    overflow-y: scroll;
}
  #map-sidebar.expanded, #map-sidebar:focus{
    right:0 !important;
  }
    .z-index{
        z-index: 6
    }
</style>
