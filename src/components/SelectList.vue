<template>
  <v-menu bottom :offset-y="true">
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        dark
        outlined
        v-on="on"
        small>
        {{selectedOption.name}}
        <v-icon class="ml-2" size="18">
          fas fa-caret-down
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)">
        <v-list-item-title>{{ option.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
	name: 'SelectList',
	props: { options: Array },
	data() {
		return {
			selectedOption: {
				name: '',
				value: null,
			},
		};
	},
	mounted() {
		if (this.options) this.selectedOption = this.options[0];
	},
	methods: {
		selectOption(option) {
			this.selectedOption = option;
			this.$emit('selected', option);
		},
	},
};
</script>

<style scoped>

</style>
