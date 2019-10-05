<template>
      <v-container fill-height >
            <v-layout fill-height>
              <v-flex class="my-10">
              <login />
              </v-flex>
            </v-layout>
      </v-container>
</template>

<script>
  import Login from "../components/Login.vue";
  export default {
    name: 'LoginView',
    components: {Login}
  };
</script>

<style scoped>

</style>
