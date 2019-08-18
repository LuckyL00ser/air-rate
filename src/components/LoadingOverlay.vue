<template>
  <v-overlay  :value="fetching" class="loading-overlay" :absolute="true">
    <div class="my-4">Pobieranie danych...</div>
    <v-progress-circular
      :size="50"
      color="secondary"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'LoadingOverlay',
  props: {
    fetching: Boolean,
  },
};
</script>

<style scoped>

</style>
